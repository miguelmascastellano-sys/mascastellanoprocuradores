import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileCallButton = () => (
  <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex gap-2 max-w-sm mx-auto shadow-lg">
    <Button asChild className="flex-1 gap-2"><a href="tel:+34644206106"><Phone className="h-4 w-4" />Llamar</a></Button>
    <Button asChild variant="secondary" className="flex-1 gap-2"><a href="https://wa.me/34644206106" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
  </div>
);

export default MobileCallButton;
