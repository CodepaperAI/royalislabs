import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/14377759715?text=Hello%20Royalis%20Labs%2C%20I%20have%20a%20question.";

export function WhatsAppContact() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-lab border border-paper/20 bg-carbon px-3 py-2 text-sm font-medium text-paper shadow-product transition-colors duration-200 ease-lab hover:bg-arctic md:bottom-6 md:right-6"
      aria-label="Contact Royalis Labs on WhatsApp"
    >
      <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
