import { NextResponse } from "next/server";
import { calculateShipping, normalizeCartItems } from "@/lib/cart";
import { getProduct, money } from "@/lib/data";
import { sendTransactionalEmail } from "@/lib/mail";

export const runtime = "nodejs";

type Address = {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

type OrderItem = {
  product: NonNullable<ReturnType<typeof getProduct>>;
  qty: number;
  lineTotal: number;
};

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getAddress(value: unknown): Address | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const address = {
    name: cleanString(record.name),
    address: cleanString(record.address),
    city: cleanString(record.city),
    province: cleanString(record.province),
    postalCode: cleanString(record.postalCode),
    country: cleanString(record.country) || "Canada"
  };

  return Object.values(address).every(Boolean) ? address : null;
}

function formatAddress(address: Address) {
  return [
    address.name,
    address.address,
    `${address.city}, ${address.province} ${address.postalCode}`,
    address.country
  ].join("\n");
}

function generateOrderNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

function getEtransferConfig() {
  return {
    payee: process.env.ETRANSFER_PAYEE || "Royalis Lab",
    email: process.env.ETRANSFER_EMAIL || "info@royalislabs.com"
  };
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
}

function getAbsoluteImage(src: string) {
  const siteUrl = getSiteUrl();
  if (!siteUrl || src.startsWith("http")) return src;
  return `${siteUrl}${src}`;
}

function orderRows(items: OrderItem[]) {
  return items
    .map(
      ({ product, qty, lineTotal }) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
            <div style="display:flex;align-items:center;gap:12px;">
              <img src="${escapeHtml(getAbsoluteImage(product.image))}" alt="" width="42" height="52" style="object-fit:contain;border:1px solid #e5eef7;background:#f8fbff;" />
              <span>${escapeHtml(product.name)}</span>
            </div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:center;">x${qty}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;">${money(lineTotal)}</td>
        </tr>
      `
    )
    .join("");
}

function totalsTable(subtotal: number, shipping: number, total: number) {
  return `
    <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:14px;">
      <tr>
        <td style="padding:4px 0;color:#52657c;">Subtotal:</td>
        <td style="padding:4px 0;text-align:right;">${money(subtotal)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#52657c;">Shipping: ${shipping === 0 ? "Free shipping" : "Flat rate"}</td>
        <td style="padding:4px 0;text-align:right;">${shipping === 0 ? "Free" : money(shipping)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-weight:700;">Total:</td>
        <td style="padding:8px 0;text-align:right;font-weight:700;font-size:18px;">${money(total)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#52657c;">Payment method:</td>
        <td style="padding:4px 0;text-align:right;">E-transfer</td>
      </tr>
    </table>
  `;
}

function buildCustomerEmail({
  customerName,
  customerEmail,
  orderNumber,
  items,
  subtotal,
  shipping,
  total,
  shippingAddress,
  billingAddress
}: {
  customerName: string;
  customerEmail: string;
  orderNumber: number;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
}): EmailPayload {
  const etransfer = getEtransferConfig();
  const summaryText = items
    .map(({ product, qty, lineTotal }) => `${product.name} x${qty} - ${money(lineTotal)}`)
    .join("\n");

  return {
    to: customerEmail,
    subject: "Your Royalis Lab order has been received!",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#222;line-height:1.55;">
        <p style="color:#5b21ff;">Royalis Lab</p>
        <h1 style="font-size:28px;margin:0 0 16px;">Thank you for your order</h1>
        <p>Hi ${escapeHtml(customerName)},</p>
        <p>We've received your order and it is currently on hold until your e-transfer payment has been processed.</p>
        <p><strong>IMPORTANT</strong><br />Please complete these steps so we can accept your payment and ship your order.</p>
        <ol>
          <li>Save us as a payee in your bank using the name: <strong>${escapeHtml(etransfer.payee)}</strong></li>
          <li>Send an e-transfer to: <a href="mailto:${escapeHtml(etransfer.email)}">${escapeHtml(etransfer.email)}</a></li>
        </ol>
        <div style="border:2px solid #028eda;background:#eef8ff;padding:18px;margin:22px 0;">
          <p style="margin:0;color:#028eda;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Required transfer comment</p>
          <p style="margin:8px 0 0;font-size:34px;font-weight:800;color:#08295f;letter-spacing:0.04em;">${orderNumber}</p>
          <p style="margin:10px 0 0;font-size:14px;color:#08295f;font-weight:700;">Enter only this order number in the Interac e-transfer message section. Do not add anything else, including product names, notes, or extra text.</p>
        </div>
        <p>Your order remains payment pending until Royalis Lab confirms the real deposit in our bank account and matches it to your order number. Payment confirmation is expected within 24 hours or less.</p>
        <p>Once payment is accepted, we will ship your product(s) by Canada Post in discreet packaging the next business day, and in some cases the same business day. Your order ships from within Ontario, Canada, and tracking will be provided.</p>
        <h2 style="font-size:20px;margin-top:28px;">Order summary</h2>
        <p>Order #${orderNumber}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr>
              <th style="text-align:left;padding:8px 0;">Product</th>
              <th style="text-align:center;padding:8px 0;">Quantity</th>
              <th style="text-align:right;padding:8px 0;">Price</th>
            </tr>
          </thead>
          <tbody>${orderRows(items)}</tbody>
        </table>
        ${totalsTable(subtotal, shipping, total)}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <table style="width:100%;font-size:14px;">
          <tr>
            <td style="vertical-align:top;width:50%;white-space:pre-line;"><strong>Billing address</strong><br />${escapeHtml(formatAddress(billingAddress))}</td>
            <td style="vertical-align:top;width:50%;white-space:pre-line;"><strong>Shipping address</strong><br />${escapeHtml(formatAddress(shippingAddress))}</td>
          </tr>
        </table>
        <p style="margin-top:28px;">If you have any questions, email us at <a href="mailto:${escapeHtml(etransfer.email)}">${escapeHtml(etransfer.email)}</a>.</p>
        <p style="color:#52657c;">Royalis Lab<br />AB, Canada</p>
      </div>
    `,
    text: `Royalis Lab\n\nThank you for your order, ${customerName}.\n\nYour order #${orderNumber} is currently on hold until your e-transfer payment has been processed.\n\nE-transfer instructions:\n1. Payee: ${etransfer.payee}\n2. Email: ${etransfer.email}\n\nRequired transfer comment:\n${orderNumber}\n\nEnter only this order number in the Interac e-transfer message section. Do not add anything else, including product names, notes, or extra text.\n\nYour order remains payment pending until Royalis Lab confirms the real deposit in our bank account and matches it to your order number.\n\nOrder summary:\n${summaryText}\nSubtotal: ${money(subtotal)}\nShipping: ${shipping === 0 ? "Free" : money(shipping)}\nTotal: ${money(total)}\nPayment method: E-transfer\n\nBilling address:\n${formatAddress(billingAddress)}\n\nShipping address:\n${formatAddress(shippingAddress)}\n\nPayment confirmation is expected within 24 hours or less. Orders ship by Canada Post after payment acceptance.`
  };
}

function buildBusinessEmail({
  customer,
  orderNumber,
  items,
  subtotal,
  shipping,
  total,
  shippingAddress,
  billingAddress,
  acceptedAt
}: {
  customer: { email: string; fullName: string; phone: string };
  orderNumber: number;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  acceptedAt: string;
}): EmailPayload {
  const businessEmail = process.env.ORDER_BUSINESS_EMAIL || "info@royalislabs.com";
  const summaryText = items
    .map(({ product, qty, lineTotal }) => `${product.name} x${qty} - ${money(lineTotal)}`)
    .join("\n");

  return {
    to: businessEmail,
    subject: `You've got a new order: #${orderNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#222;line-height:1.55;">
        <p style="color:#5b21ff;">Royalis Lab</p>
        <h1 style="font-size:28px;margin:0 0 16px;">New order: #${orderNumber}</h1>
        <p>You have received a new e-transfer order from ${escapeHtml(customer.fullName)}.</p>
        <p><strong>Status:</strong> Payment pending<br /><strong>Site access acknowledged:</strong> ${escapeHtml(acceptedAt)}</p>
        <h2 style="font-size:20px;margin-top:28px;">Order summary</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr>
              <th style="text-align:left;padding:8px 0;">Product</th>
              <th style="text-align:center;padding:8px 0;">Quantity</th>
              <th style="text-align:right;padding:8px 0;">Price</th>
            </tr>
          </thead>
          <tbody>${orderRows(items)}</tbody>
        </table>
        ${totalsTable(subtotal, shipping, total)}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <p><strong>Customer</strong><br />${escapeHtml(customer.fullName)}<br />${escapeHtml(customer.phone)}<br /><a href="mailto:${escapeHtml(customer.email)}">${escapeHtml(customer.email)}</a></p>
        <table style="width:100%;font-size:14px;">
          <tr>
            <td style="vertical-align:top;width:50%;white-space:pre-line;"><strong>Billing address</strong><br />${escapeHtml(formatAddress(billingAddress))}</td>
            <td style="vertical-align:top;width:50%;white-space:pre-line;"><strong>Shipping address</strong><br />${escapeHtml(formatAddress(shippingAddress))}</td>
          </tr>
        </table>
      </div>
    `,
    text: `Royalis Lab\n\nNew order: #${orderNumber}\nStatus: Payment pending\nSite access acknowledged: ${acceptedAt}\n\nCustomer:\n${customer.fullName}\n${customer.phone}\n${customer.email}\n\nOrder summary:\n${summaryText}\nSubtotal: ${money(subtotal)}\nShipping: ${shipping === 0 ? "Free" : money(shipping)}\nTotal: ${money(total)}\nPayment method: E-transfer\n\nBilling address:\n${formatAddress(billingAddress)}\n\nShipping address:\n${formatAddress(shippingAddress)}`
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    const customerRecord =
      record.customer && typeof record.customer === "object"
        ? (record.customer as Record<string, unknown>)
        : {};

    const customer = {
      email: cleanString(customerRecord.email),
      fullName: cleanString(customerRecord.fullName),
      phone: cleanString(customerRecord.phone)
    };

    if (!customer.fullName || !isEmail(customer.email) || !customer.phone) {
      return NextResponse.json({ error: "Customer name, email, and phone are required." }, { status: 400 });
    }

    if (record.paymentMethod !== "etransfer") {
      return NextResponse.json({ error: "E-transfer is the only available payment method." }, { status: 400 });
    }

    const billingAddress = getAddress(record.billingAddress);
    const shippingAddress = getAddress(record.shippingAddress);

    if (!billingAddress || !shippingAddress) {
      return NextResponse.json({ error: "Billing and shipping addresses are required." }, { status: 400 });
    }

    const cartItems = normalizeCartItems(record.items);

    if (!cartItems.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const orderItems: OrderItem[] = [];

    for (const item of cartItems) {
      const product = getProduct(item.slug);
      if (!product) {
        return NextResponse.json({ error: `Unknown product: ${item.slug}` }, { status: 400 });
      }
      const isOrderable = product.reportStatus === "available" || product.reportStatus === "not-applicable";
      if (!isOrderable) {
        return NextResponse.json(
          { error: `${product.name} is not available for checkout yet.` },
          { status: 400 }
        );
      }
      orderItems.push({
        product,
        qty: item.qty,
        lineTotal: product.price * item.qty
      });
    }

    const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const shipping = calculateShipping(subtotal);
    const total = subtotal + shipping;
    const orderNumber = generateOrderNumber();
    const acceptedAt = new Date().toISOString();

    const customerEmail = buildCustomerEmail({
      customerName: customer.fullName,
      customerEmail: customer.email,
      orderNumber,
      items: orderItems,
      subtotal,
      shipping,
      total,
      shippingAddress,
      billingAddress
    });
    const businessEmail = buildBusinessEmail({
      customer,
      orderNumber,
      items: orderItems,
      subtotal,
      shipping,
      total,
      shippingAddress,
      billingAddress,
      acceptedAt
    });

    await Promise.all([
      sendTransactionalEmail(customerEmail),
      sendTransactionalEmail(businessEmail)
    ]);

    return NextResponse.json({
      orderNumber,
      status: "Payment pending",
      totals: { subtotal, shipping, total },
      etransfer: getEtransferConfig()
    });
  } catch (error) {
    console.error("Order submission failed", error);
    return NextResponse.json({ error: "Unable to place order right now." }, { status: 500 });
  }
}
