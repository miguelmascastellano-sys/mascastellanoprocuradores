import { Phone } from "lucide-react";

const MobileCallButton = () => (
  <a
    href="tel:+34644206106"
    className="fixed bottom-6 left-6 z-50 md:hidden bg-foreground hover:bg-foreground/90 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
    aria-label="Llamar ahora al procurador"
  >
    <Phone className="h-6 w-6" />
  </a>
);

export default MobileCallButton;
