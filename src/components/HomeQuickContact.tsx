import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { professional } from "@/data/professional";

export default function HomeQuickContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Hola, soy ${name.trim()} (${phone.trim()}). ${message.trim()}`;
    window.open(`https://wa.me/${professional.phoneLink.replace("+", "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  return <section className="py-20 bg-muted/30 border-t border-border" aria-labelledby="quick-contact-title">
    <div className="container mx-auto px-4 max-w-2xl">
      <h2 id="quick-contact-title" className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-4">Cuéntenos su asunto</h2>
      <p className="text-sm text-muted-foreground text-center mb-8">Contacte directamente con Miguel Mas Castellano.</p>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-sm font-medium text-foreground">Nombre<Input required maxLength={80} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" /></label>
          <label className="block text-sm font-medium text-foreground">Teléfono<Input required type="tel" maxLength={30} autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" /></label>
        </div>
        <label className="block text-sm font-medium text-foreground">Mensaje<Textarea required maxLength={800} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2" /></label>
        <Button type="submit" size="lg" className="w-full sm:w-auto gap-2"><MessageCircle className="h-4 w-4" />Enviar por WhatsApp</Button>
      </form>
    </div>
  </section>;
}
