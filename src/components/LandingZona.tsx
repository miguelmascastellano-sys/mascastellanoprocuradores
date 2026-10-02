import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Scale,
  FileText,
  Gavel,
  Home,
  Send,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  Cpu,
  Loader2,
  CheckCircle2,
  Gem,
  Clock,
  MessagesSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";
import { useToast } from "@/hooks/use-toast";
import { sendContactMessage } from "@/lib/contact.functions";
import { Link } from "@/lib/router-compat";
import heroBg from "@/assets/hero-bg.jpg";

// Datos geográficos por ciudad para JSON-LD enriquecido (LocalBusiness/LegalService)
const CITY_DATA: Record<string, { lat: number; lng: number; postalCode: string; region: string; streetAddress: string }> = {
  "Dénia": { lat: 38.8407, lng: 0.1056, postalCode: "03700", region: "Alicante", streetAddress: "Plaça Jaume I, 23" },
  "Alicante": { lat: 38.3452, lng: -0.4810, postalCode: "03007", region: "Alicante", streetAddress: "Ciudad de la Justicia de Benalúa" },
  "Benidorm": { lat: 38.5411, lng: -0.1225, postalCode: "03501", region: "Alicante", streetAddress: "Partido Judicial de Benidorm" },
  "Gandía": { lat: 38.9676, lng: -0.1819, postalCode: "46700", region: "Valencia", streetAddress: "Partido Judicial de Gandía" },
};

const OTRAS_ZONAS = [
  { ciudad: "Dénia", slug: "/procurador-denia", zona: "Marina Alta" },
  { ciudad: "Alicante", slug: "/procurador-alicante", zona: "Alicante capital" },
  { ciudad: "Benidorm", slug: "/procurador-benidorm", zona: "Marina Baixa" },
  { ciudad: "Gandía", slug: "/procurador-gandia", zona: "la Safor" },
];

export interface LandingZonaProps {
  ciudad: string;
  partidoJudicial: string;
  zonaCorta: string; // e.g. "Marina Alta"
  juzgadosLabel: string; // e.g. "Juzgados de Dénia"
  h1?: string; // custom H1 per landing
  heroSubtitulo: string;
  autoridadTexto: string;
  abogadosTexto: string;
  serviciosTitulo?: string;
  serviciosPriority?: string[]; // keys ordered first
  faqs: { q: string; a: string }[];
  direccion: string;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
}

const TELEFONO = "+34644206106";
const TELEFONO_DISPLAY = "+34 644 206 106";
const WHATSAPP = "https://wa.me/34644206106";
const EMAIL = "miguel.mas@icopal.org";
const COLEGIADO = "Nº Col. 660 — ICOPAL";

const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().trim().email("Email no válido").max(255),
  asunto: z.string().trim().max(200).optional(),
  mensaje: z.string().trim().min(10, "Mínimo 10 caracteres").max(2000),
  website: z.string().optional(),
});
type ContactFormData = z.infer<typeof contactSchema>;

const LandingZona = ({
  ciudad,
  partidoJudicial,
  zonaCorta,
  juzgadosLabel,
  h1,
  heroSubtitulo,
  autoridadTexto,
  abogadosTexto,
  serviciosTitulo,
  serviciosPriority,
  faqs,
  direccion,
  seoTitle,
  seoDescription,
  canonical,
}: LandingZonaProps) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nombre: "", email: "", asunto: "", mensaje: "", website: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    try {
      const result = await sendContactMessage({
        data: {
          name: data.nombre,
          email: data.email,
          subject: data.asunto || `Consulta desde landing ${ciudad}`,
          message: data.mensaje,
          website: data.website || undefined,
          page_path: window.location.pathname,
        },
      });
      if ("error" in result) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
        return;
      }
      setSubmitted(true);
      form.reset();
    } catch (e) {
      toast({
        title: "Error",
        description: "No se pudo enviar. Inténtalo de nuevo o llámanos.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const todosServicios = [
    {
      key: "representacion",
      icon: Scale,
      title: "Representación Procesal",
      desc: `Comparecencia ante los ${juzgadosLabel} y Tribunales del partido judicial de ${partidoJudicial}.`,
    },
    {
      key: "lexnet",
      icon: FileText,
      title: "Notificaciones LexNET",
      desc: "Recepción y traslado inmediato de notificaciones judiciales por vía telemática.",
    },
    {
      key: "ejecuciones",
      icon: Gavel,
      title: "Ejecuciones y Embargos",
      desc: "Impulso procesal de ejecuciones, requerimientos de pago y diligencias de embargo.",
    },
    {
      key: "lanzamientos",
      icon: Home,
      title: "Lanzamientos y Desahucios",
      desc: "Asistencia y coordinación en diligencias de lanzamiento y entrega de la posesión.",
    },
    {
      key: "comunicacion",
      icon: Send,
      title: "Actos de Comunicación",
      desc: "Práctica de emplazamientos, citaciones y requerimientos con plenas garantías.",
    },
    {
      key: "subastas",
      icon: Gem,
      title: "Subastas Judiciales",
      desc: "Intervención y seguimiento del procedimiento de subasta electrónica del BOE.",
    },
    {
      key: "plazos",
      icon: ShieldCheck,
      title: "Control de Plazos",
      desc: "Vigilancia rigurosa de plazos procesales para evitar preclusiones e indefensión.",
    },
  ];

  const servicios = serviciosPriority
    ? [
        ...serviciosPriority
          .map((k) => todosServicios.find((s) => s.key === k))
          .filter(Boolean),
        ...todosServicios.filter((s) => !serviciosPriority.includes(s.key)),
      ].slice(0, 6) as typeof todosServicios
    : todosServicios.slice(0, 6);

  const porQue = [
    {
      icon: Cpu,
      title: "Gestión Digital (LexNET)",
      desc: "Tramitación 100% telemática del expediente, con notificaciones y escritos por vía electrónica desde el primer minuto.",
    },
    {
      icon: MessagesSquare,
      title: "Comunicación 24/7 con el abogado",
      desc: "Canal directo y permanente con el letrado director: traslado inmediato de toda novedad procesal del expediente.",
    },
    {
      icon: Clock,
      title: "Control de plazos riguroso",
      desc: "Sistema interno de vigilancia de términos y plazos para garantizar la presentación oportuna de cada actuación.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={`procurador ${ciudad.toLowerCase()}, procurador en ${ciudad.toLowerCase()}, procurador ${zonaCorta.toLowerCase()}, ${juzgadosLabel.toLowerCase()}, desahucios ${ciudad.toLowerCase()}, ejecuciones judiciales ${ciudad.toLowerCase()}, subastas judiciales ${ciudad.toLowerCase()}`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content={`ES-${CITY_DATA[ciudad]?.region === "Valencia" ? "V" : "A"}`} />
        <meta name="geo.placename" content={ciudad} />
        {CITY_DATA[ciudad] && (
          <meta name="geo.position" content={`${CITY_DATA[ciudad].lat};${CITY_DATA[ciudad].lng}`} />
        )}
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="Más Castellano Procurador" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://mascastellanoprocuradores.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="https://mascastellanoprocuradores.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LegalService",
              "@id": `${canonical}#legalservice`,
              name: `Miguel Más Castellano Procurador — ${ciudad}`,
              alternateName: `Procurador en ${ciudad}`,
              description: seoDescription,
              url: canonical,
              telephone: TELEFONO,
              email: EMAIL,
              image: "https://mascastellanoprocuradores.com/og-image.jpg",
              logo: "https://mascastellanoprocuradores.com/logo.png",
              priceRange: "€€",
              areaServed: [
                { "@type": "City", name: ciudad },
                { "@type": "AdministrativeArea", name: partidoJudicial },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: CITY_DATA[ciudad]?.streetAddress ?? direccion,
                addressLocality: ciudad,
                addressRegion: CITY_DATA[ciudad]?.region ?? "Alicante",
                postalCode: CITY_DATA[ciudad]?.postalCode,
                addressCountry: "ES",
              },
              geo: CITY_DATA[ciudad]
                ? { "@type": "GeoCoordinates", latitude: CITY_DATA[ciudad].lat, longitude: CITY_DATA[ciudad].lng }
                : undefined,
              provider: { "@id": "https://mascastellanoprocuradores.com/#organization" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mascastellanoprocuradores.com/" },
                { "@type": "ListItem", position: 2, name: "Zonas", item: "https://mascastellanoprocuradores.com/servicios" },
                { "@type": "ListItem", position: 3, name: `Procurador en ${ciudad}`, item: canonical },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/75 to-foreground/90" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <ScrollReveal>
            <span className="inline-block text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-8 border border-gold/30 px-5 py-2">
              {partidoJudicial}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-bold text-white mb-6 leading-[1.15] tracking-tight max-w-4xl mx-auto">
              {h1 ?? `Procurador de los Tribunales en ${ciudad} y ${zonaCorta}`}
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              {heroSubtitulo}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-gold text-foreground hover:bg-gold/90 rounded-none"
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Contactar por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-none"
              >
                <a href={`tel:${TELEFONO}`}>
                  <Phone className="h-4 w-4" />
                  Llamar ahora
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Beneficios / puntos de dolor */}
      <section className="py-14 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              { icon: Send, t: "Notificaciones procesadas en menos de 12 horas" },
              { icon: Clock, t: "Aviso preventivo de vencimientos 24 h antes" },
              { icon: MapPin, t: "Presencia diaria y directa en sedes judiciales" },
            ].map((b) => (
              <div key={b.t} className="bg-background p-7 flex items-start gap-4">
                <b.icon className="h-6 w-6 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-sm font-serif text-foreground leading-snug">{b.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">
                Servicios en {ciudad}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {serviciosTitulo ?? "Procura integral para su procedimiento"}
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {servicios.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.05}>
                <div className="p-8 md:p-10 bg-background hover:bg-muted/50 transition-all h-full">
                  <s.icon className="h-8 w-8 mb-6 text-foreground" strokeWidth={1.5} />
                  <h3 className="font-serif text-lg font-semibold mb-3 text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegir Más Castellano */}
      <section className="py-20 md:py-28 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-4 block">
                Compromiso profesional
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                ¿Por qué elegir a Más Castellano?
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {porQue.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.06}>
                <div className="bg-background p-10 h-full text-center">
                  <p.icon className="h-9 w-9 text-gold mx-auto mb-5" strokeWidth={1.5} />
                  <h3 className="font-serif text-lg font-semibold mb-3 text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              <div className="bg-background p-10">
                <MapPin className="h-7 w-7 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">
                  Presencia diaria en los {juzgadosLabel}
                </h3>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  {autoridadTexto}
                </p>
              </div>
              <div className="bg-background p-10">
                <Cpu className="h-7 w-7 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">
                  Gestión digital avanzada
                </h3>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  Tramitación íntegra por LexNET, expediente digital con acceso para el
                  letrado director y traslado inmediato de toda resolución mediante
                  notificación electrónica.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Para abogados */}
      <section className="py-20 md:py-28 bg-foreground">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-4 block">
              Para despachos y letrados
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Colaboración para despachos de fuera de la provincia
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <p className="text-white/70 font-light leading-relaxed mb-10">
              {abogadosTexto}
            </p>
            <Button
              asChild
              size="lg"
              className="text-sm font-semibold tracking-wide uppercase px-10 h-13 bg-white text-foreground hover:bg-white/90 rounded-none"
            >
              <a href={`mailto:${EMAIL}`}>
                <Mail className="h-4 w-4" />
                Solicitar colaboración
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Contacto */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">
                Contacto
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Cuéntenos su asunto
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
              <p className="mt-6 inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" /> {COLEGIADO}
              </p>
            </div>
            {submitted ? (
              <div className="text-center py-12 border border-border">
                <CheckCircle2 className="h-12 w-12 text-gold mx-auto mb-4" />
                <p className="font-serif text-xl text-foreground mb-2">
                  Mensaje enviado correctamente
                </p>
                <p className="text-sm text-muted-foreground font-light">
                  Le responderemos a la mayor brevedad.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <input
                    type="text"
                    {...form.register("website")}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} className="rounded-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} className="rounded-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="asunto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asunto</FormLabel>
                        <FormControl>
                          <Input {...field} className="rounded-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mensaje"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensaje</FormLabel>
                        <FormControl>
                          <Textarea rows={5} {...field} className="rounded-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={sending}
                    className="w-full text-sm font-semibold tracking-wide uppercase rounded-none h-13"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      "Enviar mensaje"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Enlazado interno SEO: otras zonas de actuación */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">
                Otras zonas de actuación
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                Procurador en la Comunidad Valenciana
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {OTRAS_ZONAS.filter((z) => z.ciudad !== ciudad).map((z) => (
                <Link
                  key={z.slug}
                  to={z.slug}
                  className="bg-background p-6 text-center hover:bg-muted/50 transition-colors group"
                >
                  <MapPin className="h-5 w-5 text-gold mx-auto mb-3" strokeWidth={1.5} />
                  <p className="font-serif text-base font-semibold text-foreground group-hover:text-gold transition-colors">
                    Procurador en {z.ciudad}
                  </p>
                  <p className="text-xs text-muted-foreground font-light mt-1">{z.zona}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
              <Link to="/procurador-ejecuciones-judiciales" className="font-serif font-semibold text-foreground hover:text-gold transition-colors">Procurador para ejecuciones judiciales</Link>
              <Link to="/procurador-derecho-bancario" className="font-serif font-semibold text-foreground hover:text-gold transition-colors">Procurador en derecho bancario</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">
                Preguntas frecuentes
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Resolvemos sus dudas
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
            <Accordion type="single" collapsible className="bg-background border border-border">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="px-6">
                  <AccordionTrigger className="text-left font-serif text-base text-foreground">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed font-light text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer informativo de zona */}
      <section className="py-14 bg-foreground text-white/70">
        <div className="container mx-auto px-4 max-w-5xl grid sm:grid-cols-3 gap-8 text-sm font-light">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">Dirección</p>
            <p>{direccion}</p>
            <p className="mt-1">{ciudad}, España</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">Contacto</p>
            <p>
              <a href={`tel:${TELEFONO}`} className="hover:text-white">
                {TELEFONO_DISPLAY}
              </a>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`} className="hover:text-white">
                {EMAIL}
              </a>
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">Colegiación</p>
            <p>{COLEGIADO}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingZona;
