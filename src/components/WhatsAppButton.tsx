import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "34644206106";
  const message = encodeURIComponent("Hola, me gustaría solicitar información sobre sus servicios de procuraduría.");

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
