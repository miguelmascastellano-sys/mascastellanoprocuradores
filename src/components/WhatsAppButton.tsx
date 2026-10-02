import { MessageCircle } from "lucide-react";
import { useLocation } from "@/lib/router-compat";

const cityByPath: Record<string, string> = {
  "/procurador-denia": "Dénia (Marina Alta)",
  "/procurador-gandia": "Gandía (La Safor)",
  "/procurador-benidorm": "Benidorm (Marina Baixa)",
  "/procurador-alicante": "Alicante capital",
};

const WhatsAppButton = () => {
  const phoneNumber = "34644206106";
  const { pathname } = useLocation();
  const city = cityByPath[pathname];
  const text = city
    ? `Hola, necesito un procurador para un asunto en el partido judicial de ${city}.`
    : "Hola, me gustaría solicitar información sobre sus servicios de procuraduría.";
  const message = encodeURIComponent(text);

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
