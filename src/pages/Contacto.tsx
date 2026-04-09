import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().trim().email("Email no válido").max(255),
  telefono: z.string().trim().max(20).optional(),
  asunto: z.string().trim().max(200).optional(),
  mensaje: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
  website: z.string().optional(), // honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;


const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+34 644 206 106" },
  { icon: Mail, label: "Email", value: "migel.mas@icopal.org" },
  { icon: Clock, label: "Horario", value: "Lunes a Viernes: 9:00 - 19:00" },
];

const Contacto = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nombre: "", email: "", telefono: "", asunto: "", mensaje: "", website: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("contact", {
        body: {
          name: data.nombre,
          email: data.email,
          phone: data.telefono || undefined,
          subject: data.asunto || undefined,
          message: data.mensaje,
          website: data.website || undefined,
          page_path: window.location.pathname,
        },
      });

      if (error) throw error;
      if (result?.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      toast({
        title: "Error al enviar",
        description: "Inténtelo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-px bg-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Contacto</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Estamos a su disposición. Contacte con nosotros sin compromiso.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Envíenos un mensaje</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2">¡Mensaje recibido!</h3>
                  <p className="text-muted-foreground mb-6">Nos pondremos en contacto con usted a la mayor brevedad.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Enviar otro mensaje</Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Honeypot - hidden from users */}
                    <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                      <input
                        {...form.register("website")}
                        tabIndex={-1}
                        autoComplete="off"
                        placeholder="Website"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo *</FormLabel>
                          <FormControl><Input placeholder="Su nombre" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl><Input type="email" placeholder="su@email.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl><Input type="tel" placeholder="+34 600 000 000" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="asunto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asunto</FormLabel>
                          <FormControl><Input placeholder="Motivo de su consulta" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mensaje"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje *</FormLabel>
                          <FormControl><Textarea placeholder="Describa su consulta..." rows={5} {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full font-semibold" disabled={sending}>
                      {sending ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Enviando...</> : "Enviar Mensaje"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Datos de Contacto</h2>
              <div className="space-y-6">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{c.label}</h3>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacto;
