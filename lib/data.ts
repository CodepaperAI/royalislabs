import type { Category, CoaRecord, FaqGroup, Product } from "./types";

export const navItems = [
  { href: "/catalogue", label: "Products" },
  { href: "/coa-library", label: "Testing" },
  { href: "/faq", label: "FAQ" },
  { href: "/account", label: "Account" }
];

export const trustPillars = [
  "Ships within Canada",
  "3rd Party Tested",
  "Discreet Packaging",
  "Free Shipping Over $200"
];

export const categories: Array<{ name: Category; description: string }> = [
  {
    name: "GH axis research",
    description: "Peptides used in controlled growth-hormone-axis research workflows."
  },
  {
    name: "Tissue repair research",
    description: "Reference materials for in-vitro tissue response and repair-pathway studies."
  },
  {
    name: "Cognitive research",
    description: "Compounds selected for receptor, signalling, and neurochemical research."
  },
  {
    name: "Longevity research",
    description: "Research materials for cellular signalling and age-associated pathway studies."
  },
  {
    name: "Metabolic research",
    description: "Batch-tested peptides for metabolic pathway and receptor research."
  },
  {
    name: "Research supplies",
    description: "Supply items used alongside controlled Royalis research workflows."
  }
];

const unavailableReportNote =
  "A matching third-party lab result is not linked for this Royalis product yet.";

const handlingSpecs = [
  { label: "Appearance", value: "Lyophilized research vial" },
  { label: "Testing", value: "Third-party lab result when matched and published" },
  { label: "Fill format", value: "Royalis labeled crimp-top research vial" },
  { label: "Shipment window", value: "Ships from Canada via tracked Canada Post delivery" }
];

export const products: Product[] = [
  {
    slug: "klow",
    name: "TESAMORELIN (10mg)",
    sku: "ROY-TESA-10",
    category: "GH axis research",
    format: "10mg lyophilized vial",
    price: 90,
    purity: "98.939%",
    assayedMass: "8.91mg",
    batch: "JAN-151603",
    lab: "Janoshik",
    coaId: "JAN-151603",
    testDate: "2026-05-19",
    image: "/products-original/klow.png",
    sourceUrl: "https://royalislabs.com/product/klow/",
    labReportUrl: "https://janoshik.com/tests/151603-Tesamorelin_10mg_ZE5FSKW5W17C",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result matched to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "Tesamorelin is a synthetic GHRH analog used in controlled research into growth-hormone-axis signaling, endocrine feedback, and metabolic pathway markers.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151603", purity: "98.939%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "ghk-cu-50mg",
    name: "GHK-cu (50mg)",
    sku: "ROY-GHKCU-50",
    category: "Tissue repair research",
    format: "50mg lyophilized vial",
    price: 40,
    purity: "Testing pending",
    assayedMass: "Testing pending",
    batch: "PENDING-GHKCU-50",
    lab: "Lab result pending",
    coaId: "COA-ROY-GHKCU50-PENDING",
    testDate: "Not published",
    image: "/products-original/ghk-cu-50mg.png",
    sourceUrl: "https://royalislabs.com/product/ghk-cu-50mg/",
    reportStatus: "pending",
    sourceNote: unavailableReportNote,
    concentration: "50mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Matching single-product Royalis lab result not published yet.",
    molecular: "Copper peptide, lyophilized research format",
    overview:
      "GHK-cu is a copper-bound tripeptide used in research on extracellular matrix signaling, collagen-related pathways, tissue repair models, and skin and hair biology.",
    specs: handlingSpecs,
    batchHistory: []
  },
  {
    slug: "bac-water",
    name: "BAC WATER",
    sku: "ROY-BAC-WATER",
    category: "Research supplies",
    format: "Bacteriostatic water vial",
    price: 10,
    purity: "Not applicable",
    assayedMass: "0.9% benzyl alcohol",
    batch: "SUP-BAC-WATER",
    lab: "Not applicable",
    coaId: "SUP-BAC-WATER",
    testDate: "Not applicable",
    image: "/products-original/bac-water.png",
    sourceUrl: "https://royalislabs.com/product/bac-water/",
    reportStatus: "not-applicable",
    sourceNote: "Bacteriostatic water is a research supply item, so a peptide-style lab result is not applicable.",
    concentration: "0.9% benzyl alcohol",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Research supply item; peptide lab-result matching is not applicable.",
    molecular: "Bacteriostatic water research supply",
    overview:
      "Bacteriostatic water with 0.9% benzyl alcohol is supplied as a research diluent companion item for lyophilized materials.",
    specs: [
      { label: "Appearance", value: "Clear bacteriostatic water supply vial" },
      { label: "Testing", value: "Peptide lab result not applicable" },
      { label: "Fill format", value: "Royalis labeled crimp-top supply vial" },
      { label: "Shipment window", value: "Ships from Canada via tracked Canada Post delivery" }
    ],
    batchHistory: []
  },
  {
    slug: "ipamorelin",
    name: "IPAMORELIN (10mg)",
    sku: "ROY-IPA-10",
    category: "GH axis research",
    format: "10mg lyophilized vial",
    price: 90,
    purity: "99.798%",
    assayedMass: "8.87mg",
    batch: "JAN-151610",
    lab: "Janoshik",
    coaId: "JAN-151610",
    testDate: "2026-05-19",
    image: "/products-original/ipamorelin.png",
    sourceUrl: "https://royalislabs.com/product/ipamorelin/",
    labReportUrl: "https://janoshik.com/tests/151610-Ipamorelin_10mg_RD5N1AA92LUD",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result matched to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "Ipamorelin is a selective ghrelin-receptor agonist studied in growth-hormone secretagogue research, including pulse-signaling and endocrine response models.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151610", purity: "99.798%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "cjc-1295-no-dac",
    name: "CJC-1295 NO DAC (10mg)",
    sku: "ROY-CJCND-10",
    category: "GH axis research",
    format: "10mg lyophilized vial",
    price: 90,
    purity: "99.754%",
    assayedMass: "9.77mg",
    batch: "JAN-151617",
    lab: "Janoshik",
    coaId: "JAN-151617",
    testDate: "2026-05-20",
    image: "/products-original/cjc-1295-no-dac.png",
    sourceUrl: "https://royalislabs.com/product/cjc-1295-no-dac/",
    labReportUrl: "https://janoshik.com/tests/151617-CJC1295_NO_DAC_10mg_WZ78TYBCQ4S6",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result matched to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "CJC-1295 no DAC is a short-acting GHRH analog used in research on pulsatile GH signaling and pituitary-axis feedback without the extended DAC carrier.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151617", purity: "99.754%", lab: "Janoshik", date: "2026-05-20" }]
  },
  {
    slug: "selank-10mg",
    name: "SELANK (10mg)",
    sku: "ROY-SEL-10",
    category: "Cognitive research",
    format: "10mg lyophilized vial",
    price: 60,
    purity: "99.957%",
    assayedMass: "10.22mg",
    batch: "JAN-151673",
    lab: "Janoshik",
    coaId: "JAN-151673",
    testDate: "2026-05-19",
    image: "/products-original/selank-10mg.png",
    sourceUrl: "https://royalislabs.com/product/selank-10mg/",
    labReportUrl: "https://janoshik.com/tests/151673-Selank_10mg_6KYYWE2M5FXM",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result linked to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "Selank is a synthetic tuftsin-analog peptide used in neuromodulation research, including models of stress response, mood regulation, and cognitive signaling.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151673", purity: "99.957%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "semax-10mg-2",
    name: "SEMAX (10mg)",
    sku: "ROY-SMX-10",
    category: "Cognitive research",
    format: "10mg lyophilized vial",
    price: 80,
    purity: "99.007%",
    assayedMass: "10.80mg",
    batch: "JAN-151666",
    lab: "Janoshik",
    coaId: "JAN-151666",
    testDate: "2026-05-19",
    image: "/products-original/semax-10mg-2.png",
    sourceUrl: "https://royalislabs.com/product/semax-10mg-2/",
    labReportUrl: "https://janoshik.com/tests/151666-Semax_10mg_9KS9ZHJ6IVQT",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result linked to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "Semax is an ACTH-fragment-derived peptide used in research on neuroplasticity, neuroprotection, cognitive signaling, and stress-response pathways.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151666", purity: "99.007%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "tb-500-10mg",
    name: "TB-500 (10mg)",
    sku: "ROY-TB500-10",
    category: "Tissue repair research",
    format: "10mg lyophilized vial",
    price: 70,
    purity: "98.251%",
    assayedMass: "10.69mg",
    batch: "JAN-151652",
    lab: "Janoshik",
    coaId: "JAN-151652",
    testDate: "2026-05-19",
    image: "/products-original/tb-500-10mg.png",
    sourceUrl: "https://royalislabs.com/product/tb-500-10mg/",
    labReportUrl: "https://janoshik.com/tests/151652-TB500_10mg_AFNGTA8LFUHE",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result linked to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "TB-500 is a thymosin-beta-4-related peptide used in research on cell migration, actin regulation, angiogenesis models, and tissue-repair signaling.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151652", purity: "98.251%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "epitalon-10mg",
    name: "EPITALON (10mg)",
    sku: "ROY-EPI-10",
    category: "Longevity research",
    format: "10mg lyophilized vial",
    price: 40,
    purity: "99.651%",
    assayedMass: "9.62mg",
    batch: "JAN-151680",
    lab: "Janoshik",
    coaId: "JAN-151680",
    testDate: "2026-05-19",
    image: "/products-original/epitalon-10mg.png",
    sourceUrl: "https://royalislabs.com/product/epitalon-10mg/",
    labReportUrl: "https://janoshik.com/tests/151680-Epithalon_10mg_62KH7VB5DGK5",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result linked to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "Epitalon is a synthetic tetrapeptide studied in longevity research, including telomere biology, pineal signaling, circadian rhythm models, and cellular stress pathways.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151680", purity: "99.651%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "nad-1000mg-copy",
    name: "BPC-157 (10 mg)",
    sku: "ROY-BPC157-10",
    category: "Tissue repair research",
    format: "10mg lyophilized vial",
    price: 70,
    purity: "98.767%",
    assayedMass: "10.23mg",
    batch: "JAN-151659",
    lab: "Janoshik",
    coaId: "JAN-151659",
    testDate: "2026-05-19",
    image: "/products-original/nad-1000mg-copy.png",
    sourceUrl: "https://royalislabs.com/product/nad-1000mg-copy/",
    labReportUrl: "https://janoshik.com/tests/151659-BPC_157_10mg_EZTGMJRRKXX3",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result matched to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "BPC-157 is a pentadecapeptide studied in tissue-repair research, including tendon, ligament, muscle, gastrointestinal, inflammatory, and growth-factor signaling models.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151659", purity: "98.767%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "mots-c-10mg",
    name: "MOTS-c (10mg)",
    sku: "ROY-MOTSC-10",
    category: "Metabolic research",
    format: "10mg lyophilized vial",
    price: 40,
    purity: "98.381%",
    assayedMass: "11.02mg",
    batch: "JAN-151687",
    lab: "Janoshik",
    coaId: "JAN-151687",
    testDate: "2026-05-19",
    image: "/products-original/mots-c-10mg.png",
    sourceUrl: "https://royalislabs.com/product/mots-c-10mg/",
    labReportUrl: "https://janoshik.com/tests/151687-MOTSc_10mg_FSRXXWCCDS36",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result matched to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "MOTS-c is a mitochondrial-derived peptide used in research on cellular energy regulation, glucose metabolism, mitochondrial stress response, and metabolic homeostasis.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151687", purity: "98.381%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "retatrutide-20mg",
    name: "Retatrutide (20mg)",
    sku: "ROY-RETA-20",
    category: "Metabolic research",
    format: "20mg lyophilized vial",
    price: 150,
    purity: "99.518%",
    assayedMass: "22.16mg",
    batch: "JAN-151624",
    lab: "Janoshik",
    coaId: "JAN-151624",
    testDate: "2026-05-19",
    image: "/products-original/retatrutide-20mg.png",
    sourceUrl: "https://royalislabs.com/product/retatrutide-20mg/",
    labReportUrl: "https://janoshik.com/tests/151624-Retatrutide_20mg_XB33T4KDIRY7",
    reportStatus: "available",
    concentration: "20mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result linked to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "Retatrutide is a multi-receptor incretin research compound studied across GLP-1, GIP, and glucagon receptor signaling in metabolic-pathway models.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151624", purity: "99.518%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "retatrutide-10mg",
    name: "Retatrutide (10mg)",
    sku: "ROY-RETA-10",
    category: "Metabolic research",
    format: "10mg lyophilized vial",
    price: 90,
    purity: "99.478%",
    assayedMass: "11.16mg",
    batch: "JAN-151631",
    lab: "Janoshik",
    coaId: "JAN-151631",
    testDate: "2026-05-19",
    image: "/products-original/retatrutide-10mg.png",
    sourceUrl: "https://royalislabs.com/product/retatrutide-10mg/",
    labReportUrl: "https://janoshik.com/tests/151631-Retatrutide_10mg_HPDFJCPVJW1H",
    reportStatus: "available",
    concentration: "10mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result linked to this product.",
    molecular: "Synthetic peptide, lyophilized research format",
    overview:
      "Retatrutide is a multi-receptor incretin research compound studied across GLP-1, GIP, and glucagon receptor signaling in metabolic-pathway models.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151631", purity: "99.478%", lab: "Janoshik", date: "2026-05-19" }]
  },
  {
    slug: "ghk-cu",
    name: "GHK-cu (100mg)",
    sku: "ROY-GHKCU-100",
    category: "Tissue repair research",
    format: "100mg lyophilized vial",
    price: 60,
    purity: "99.326%",
    assayedMass: "GHK 68.51mg / Cu 2.78mg",
    batch: "JAN-151645",
    lab: "Janoshik",
    coaId: "JAN-151645",
    testDate: "2026-05-20",
    image: "/products-original/ghk-cu.jpg",
    sourceUrl: "https://royalislabs.com/product/ghk-cu/",
    labReportUrl: "https://janoshik.com/tests/151645-GHKCU_100mg_LL2CCE75PHPE",
    reportStatus: "available",
    concentration: "100mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Royalis Janoshik lab result matched to this product.",
    molecular: "Copper peptide, lyophilized research format",
    overview:
      "GHK-cu is a copper-bound tripeptide used in research on extracellular matrix signaling, collagen-related pathways, tissue repair models, and skin and hair biology.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151645", purity: "99.326%", lab: "Janoshik", date: "2026-05-20" }]
  },
  {
    slug: "tirzepatide-60mg-2",
    name: "Nad+ (1000mg)",
    sku: "ROY-NAD-1000",
    category: "Longevity research",
    format: "1000mg lyophilized vial",
    price: 90,
    purity: "Not listed",
    assayedMass: "1116.35mg",
    batch: "JAN-151694",
    lab: "Janoshik",
    coaId: "JAN-151694",
    testDate: "2026-05-15",
    image: "/products-original/tirzepatide-60mg-2.png",
    sourceUrl: "https://royalislabs.com/product/tirzepatide-60mg-2/",
    labReportUrl: "https://janoshik.com/tests/151694-NAD_1000mg_VMAU281HEYJJ",
    reportStatus: "available",
    concentration: "1000mg",
    storage: "Store sealed and temperature controlled. Keep protected from light.",
    referenceStandard: "Janoshik lab result lists assayed mass; purity is not listed on the report.",
    molecular: "NAD+ research material, lyophilized format",
    overview:
      "NAD+ is a cellular coenzyme used in research on mitochondrial function, ATP generation, DNA-repair signaling, oxidative stress, and sirtuin-associated aging pathways.",
    specs: handlingSpecs,
    batchHistory: [{ batch: "JAN-151694", purity: "Not listed", lab: "Janoshik", date: "2026-05-15" }]
  }
];

export const coas: CoaRecord[] = products.map((product) => ({
  id: product.coaId,
  productName: product.name,
  batch: product.batch,
  purity: product.purity,
  assayedMass: product.assayedMass,
  lab: product.lab,
  testDate: product.testDate,
  method:
    product.reportStatus === "available"
      ? "Janoshik direct lab result"
      : product.reportStatus === "not-applicable"
        ? "Lab result not applicable"
        : "Lab result pending",
  reportUrl: product.labReportUrl,
  reportStatus: product.reportStatus,
  sourceNote: product.sourceNote,
  productSlug: product.slug,
  productImage: product.image
}));

export const comparisonRows = [
  { label: "Ships from Canada", royal: "Canada Post domestic delivery", generic: "Cross-border uncertainty" },
  { label: "Batch visible before purchase", royal: "Shown on every product card", generic: "Often hidden until delivery" },
  { label: "Third-party testing named", royal: "Lab result link exposed where matched", generic: "Self-signed or unlabeled files" },
  { label: "Testing access", royal: "Testing preview plus direct lab result link", generic: "Download link, if available" },
  { label: "Issue resolution", royal: "Replacement policy tied to order record", generic: "Marketplace ticket or no recourse" }
];

export const operationalProof = [
  {
    source: "Verified order RI-2605-312",
    title: "Tracking issued before carrier pickup",
    detail:
      "Order record shows label creation, carrier scan, and delivery confirmation without exposing product names on exterior packaging.",
    signal: "Shipping confidence"
  },
  {
    source: "Batch verification request",
    title: "Testing details matched before reorder",
    detail:
      "Buyer supplied a batch number; support matched product, purity, assayed mass, lab result, and test date from the testing page.",
    signal: "Testing confidence"
  },
  {
    source: "Replacement review",
    title: "Issue tied to order evidence",
    detail:
      "Support request collected order number, product, batch, tracking status, and packaging photos before replacement review.",
    signal: "Recourse confidence"
  }
];

export const reviewGuidelines = [
  "Allowed: tracking speed, packaging discretion, support response, testing-detail matching, batch verification.",
  "Not allowed: human-use outcomes, dosing, protocols, administration, or medical claims.",
  "Every published note should tie back to an order or batch record."
];

export const faqs: FaqGroup[] = [
  {
    title: "Testing",
    items: [
      {
        question: "How can I know your product is legit?",
        answer:
          "All HGH and peptide products sold on Royalislabs.com are lab tested by Janoshik to ensure maximum quality. If a product is not tested, the Royalis FAQ says it will not be sold."
      },
      {
        question: "Can I match a product to its report?",
        answer:
          "Products are paired with Janoshik reports that can be viewed and matched to the published batch information."
      },
      {
        question: "Is Bacteriostatic Water required?",
        answer:
          "Yes. The Royalis FAQ says all HGH and peptides ship in lyophilized form and must be reconstituted with Bacteriostatic Water, which is sold separately."
      }
    ]
  },
  {
    title: "Shipping",
    items: [
      {
        question: "Where do orders ship from?",
        answer:
          "Orders can only be shipped to addresses within Canada. The Royalis FAQ says orders ship domestically via Canada Post, including Flex Delivery and PO boxes."
      },
      {
        question: "How discreet is the packaging?",
        answer:
          "The Royalis FAQ describes Canada Post domestic delivery in discreet packaging."
      },
      {
        question: "How long does shipping take?",
        answer:
          "Most orders ship the same business day by Canada Post, with standard delivery ETAs averaging 1-2 business days. Remote areas or Canada Post delays may take longer."
      },
      {
        question: "Is tracking provided?",
        answer:
          "Tracking is available for all orders. The Royalis FAQ advises checking spam if tracking is not received within 1 business day of order confirmation."
      }
    ]
  },
  {
    title: "Returns",
    items: [
      {
        question: "What is the Refund and Return Policy?",
        answer:
          "The Royalis FAQ says all sales are final and returns are not accepted due to the nature of the products and inventory."
      },
      {
        question: "What if I have a quality concern?",
        answer:
          "The Royalis FAQ asks customers to consult by email so Royalis Labs can try to assist. It also states product quality is independently assessed by third-party laboratory testing."
      }
    ]
  },
  {
    title: "Research use",
    items: [
      {
        question: "Are these products for research purposes?",
        answer:
          "Royalis positions the catalogue as pharmaceutical-grade peptide products for research purposes, with published lab results for verification."
      }
    ]
  }
];

export const supportWindows = [
  { label: "Email", value: "info@royalislabs.com" },
  { label: "Phone", value: "0120232562" },
  { label: "Shipping", value: "Canada only" }
];

export const featuredOrder = ["retatrutide-10mg", "ghk-cu-50mg", "retatrutide-20mg"];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCoaByBatch(batch?: string) {
  if (!batch) return coas[0];
  return coas.find((coa) => coa.batch.toLowerCase() === batch.toLowerCase()) ?? coas[0];
}

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
