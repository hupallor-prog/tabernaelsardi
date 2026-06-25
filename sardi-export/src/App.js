import { useEffect, useRef, useState } from "react";
import "@/App.css";
import {
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Star,
  Flame,
  Wheat,
  Heart,
  Users,
  Calendar,
  Wine,
  Award,
  Quote,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Utensils,
} from "lucide-react";

const PHONE = "+34683457631";
const PHONE_DISPLAY = "683 45 76 31";
const WHATSAPP = "34683457631";
const ADDRESS = "C/ Eduardo Dato 23, Zaragoza";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Taberna+El+Sardi+Calle+Eduardo+Dato+23+Zaragoza";

const NAV = [
  { id: "filosofia", label: "Filosofía" },
  { id: "carta", label: "Carta" },
  { id: "celiacos", label: "Sin gluten" },
  { id: "eventos", label: "Eventos" },
  { id: "visitanos", label: "Visítanos" },
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
  window.scrollTo({ top: y, behavior: "smooth" });
};

/* ===================== TOP BAR ===================== */
const TopBar = () => (
  <div
    data-testid="topbar"
    className="hidden md:block w-full text-[12px] tracking-wide"
    style={{
      background: "hsl(var(--carbon))",
      color: "hsl(var(--crema) / 0.85)",
    }}
  >
    <div className="container-narrow flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Clock size={13} />
        <span>Mar–Sáb · 13:00–16:00 y 20:00–23:30</span>
        <span className="opacity-40 mx-2">|</span>
        <span>Domingo · 13:00–16:00</span>
        <span className="opacity-40 mx-2">|</span>
        <span>Lunes cerrado</span>
      </div>
      <div className="flex items-center gap-5">
        <a
          data-testid="topbar-phone"
          href={`tel:${PHONE}`}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Phone size={13} /> {PHONE_DISPLAY}
        </a>
        <a
          data-testid="topbar-address"
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <MapPin size={13} /> {ADDRESS}
        </a>
      </div>
    </div>
  </div>
);

/* ===================== NAVBAR ===================== */
const Navbar = ({ onReservar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className="sticky top-0 z-50 transition-all"
      style={{
        background: scrolled
          ? "hsl(var(--crema) / 0.92)"
          : "hsl(var(--crema) / 0.6)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled
          ? "1px solid hsl(var(--border))"
          : "1px solid transparent",
      }}
    >
      <div className="container-narrow flex items-center justify-between py-3 md:py-4">
        <a
          href="#top"
          data-testid="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <span
            className="grid place-items-center w-9 h-9 rounded-full text-[13px] font-semibold"
            style={{
              background: "hsl(var(--granate))",
              color: "hsl(var(--crema))",
              fontFamily: "Fraunces, serif",
            }}
          >
            ES
          </span>
          <div className="leading-tight">
            <div
              className="text-[15px] font-semibold tracking-tight"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Taberna El Sardi
            </div>
            <div
              className="text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Cocina cántabra · Zaragoza
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <button
              key={n.id}
              data-testid={`nav-${n.id}`}
              onClick={() => scrollToId(n.id)}
              className="text-[14px] font-medium hover:opacity-70 transition-opacity"
              style={{ color: "hsl(var(--carbon))" }}
            >
              {n.label}
            </button>
          ))}
          <button
            data-testid="nav-reservar"
            onClick={onReservar}
            className="btn-granate text-[14px] py-2.5 px-5"
          >
            Reservar
          </button>
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-[2px] bg-current"></span>
            <span className="block w-6 h-[2px] bg-current"></span>
            <span className="block w-4 h-[2px] bg-current ml-auto"></span>
          </div>
        </button>
      </div>

      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="md:hidden border-t"
          style={{ background: "hsl(var(--crema))" }}
        >
          <div className="container-narrow py-4 flex flex-col gap-4">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setOpen(false);
                  scrollToId(n.id);
                }}
                className="text-left text-[15px] py-1"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onReservar();
              }}
              className="btn-granate w-full justify-center"
            >
              Reservar mesa
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

/* ===================== HERO ===================== */
const Hero = ({ onReservar }) => (
  <section id="top" className="relative overflow-hidden grain-overlay">
    <div className="absolute inset-0">
      <img
        src="/images/hero-taberna.jpg"
        alt="Interior cálido de Taberna El Sardi con jamones colgados, ladrillo visto y mesas con velas"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--carbon) / 0.55) 0%, hsl(var(--carbon) / 0.65) 60%, hsl(var(--carbon) / 0.85) 100%)",
        }}
      />
    </div>

    <div className="relative container-narrow pt-20 pb-24 md:pt-32 md:pb-36 min-h-[88vh] flex flex-col justify-center">
      <div className="max-w-3xl animate-float-in">
        <div
          className="flex items-center gap-3 mb-6 text-[12px] tracking-[0.22em] uppercase"
          style={{ color: "hsl(var(--dorado))" }}
        >
          <span className="w-8 h-px bg-current"></span>
          Cocina cántabra · Zaragoza · Desde 2015
        </div>

        <h1
          className="text-white text-[44px] md:text-[76px] leading-[1.02] mb-7"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 400 }}
        >
          Un rincón del{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "hsl(var(--dorado))",
              fontWeight: 500,
            }}
          >
            Sardinero
          </em>
          <br />
          en el corazón de Zaragoza
        </h1>

        <p
          className="text-[17px] md:text-[19px] leading-relaxed mb-10 max-w-2xl"
          style={{ color: "hsl(var(--crema) / 0.88)" }}
        >
          Producto, fuego lento y trato cercano. Anchoas de Santoña, pulpo a la
          brasa, cocido montañés y una carta con más del 90 % apta para
          celíacos.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button
            data-testid="hero-reservar-btn"
            onClick={onReservar}
            className="btn-granate text-[15px]"
          >
            Reservar mesa
            <ArrowRight size={16} />
          </button>
          <button
            data-testid="hero-carta-btn"
            onClick={() => scrollToId("carta")}
            className="btn-outline text-[15px]"
          >
            Ver la carta
          </button>
        </div>

        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]"
          style={{ color: "hsl(var(--crema) / 0.75)" }}
        >
          <div className="flex items-center gap-1.5">
            <Star size={14} fill="hsl(var(--dorado))" stroke="hsl(var(--dorado))" />
            <span>
              <strong className="text-white">4,6 / 5</strong> · +1.400 reseñas en
              Google
            </span>
          </div>
          <span className="opacity-40">·</span>
          <div className="flex items-center gap-1.5">
            <Award size={14} style={{ color: "hsl(var(--dorado))" }} />
            <span>Travelers&apos; Choice Tripadvisor</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToId("filosofia")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[11px] tracking-[0.22em] uppercase hover:opacity-80"
        style={{ color: "hsl(var(--crema) / 0.7)" }}
        data-testid="hero-scroll-down"
      >
        Bajar
        <ChevronDown size={16} className="animate-bounce" />
      </button>
    </div>
  </section>
);

/* ===================== STATS ===================== */
const Stats = () => {
  const items = [
    { v: "2015", l: "Año de apertura" },
    { v: "4,6★", l: "+1.400 reseñas Google" },
    { v: "90%", l: "Carta sin gluten" },
    { v: "800+", l: "Opiniones Tripadvisor" },
    { v: "TC", l: "Travelers' Choice" },
  ];
  return (
    <section
      data-testid="stats"
      className="py-10 md:py-12 border-b"
      style={{ background: "hsl(var(--crema))" }}
    >
      <div className="container-narrow grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
        {items.map((it) => (
          <div key={it.l} className="text-center md:text-left">
            <div
              className="text-[28px] md:text-[34px] leading-none mb-1.5"
              style={{
                fontFamily: "Fraunces, serif",
                color: "hsl(var(--granate))",
                fontWeight: 500,
              }}
            >
              {it.v}
            </div>
            <div
              className="text-[12px] uppercase tracking-[0.14em]"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {it.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ===================== FILOSOFÍA ===================== */
const Filosofia = () => (
  <section id="filosofia" className="section-pad">
    <div className="container-narrow grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div className="relative">
        <img
          src="/images/cantabria.jpg"
          alt="Costa cántabra"
          className="w-full h-[420px] md:h-[560px] object-cover rounded-sm shadow-xl"
        />
        <div
          className="hidden md:block absolute -bottom-8 -right-8 p-6 max-w-[220px] shadow-xl"
          style={{
            background: "hsl(var(--granate))",
            color: "hsl(var(--crema))",
          }}
        >
          <div
            className="text-[11px] tracking-[0.2em] uppercase opacity-70 mb-1"
            style={{ color: "hsl(var(--dorado))" }}
          >
            Desde 2015
          </div>
          <div
            style={{ fontFamily: "Fraunces, serif", fontSize: 22 }}
            className="leading-tight"
          >
            10 años cocinando el norte en Zaragoza
          </div>
        </div>
      </div>

      <div>
        <div className="eyebrow mb-4">Nuestra filosofía</div>
        <h2 className="text-[34px] md:text-[46px] mb-7 leading-[1.1]">
          <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
            “Cocinamos
          </em>{" "}
          lo que comeríamos en casa de nuestra abuela — con el mejor producto
          que encontramos.”
        </h2>
        <p
          className="text-[17px] leading-relaxed mb-8"
          style={{ color: "hsl(var(--carbon-soft))" }}
        >
          El Cantábrico nos marca el calendario: anchoas en primavera, bonito en
          verano, cocido cuando aprieta el frío. Compramos pequeño, cocinamos
          despacio y servimos sin artificio. Nada más.
        </p>

        <div className="space-y-5">
          {[
            {
              icon: <Heart size={18} />,
              t: "Producto del norte",
              d: "Pescados del Cantábrico, embutidos de Sotopalacios, quesos de pasiega.",
            },
            {
              icon: <Flame size={18} />,
              t: "Fuego paciente",
              d: "Estofados largos, brasa para el pulpo, plancha al punto para las morcillas.",
            },
            {
              icon: <Users size={18} />,
              t: "Trato de casa",
              d: "Sin protocolos imposibles. Te recibimos como recibimos a los nuestros.",
            },
          ].map((it) => (
            <div key={it.t} className="flex gap-4">
              <div
                className="grid place-items-center w-10 h-10 rounded-full flex-shrink-0 mt-0.5"
                style={{
                  background: "hsl(var(--granate) / 0.08)",
                  color: "hsl(var(--granate))",
                }}
              >
                {it.icon}
              </div>
              <div>
                <div
                  className="font-semibold mb-1"
                  style={{ fontSize: 16 }}
                >
                  {it.t}
                </div>
                <div
                  style={{ color: "hsl(var(--muted-foreground))" }}
                  className="text-[14.5px] leading-relaxed"
                >
                  {it.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ===================== HISTORIA ===================== */
const Historia = () => {
  const hitos = [
    { y: "2015", t: "Abrimos en Eduardo Dato", d: "Nace El Sardi con una idea: la cocina cántabra como pretexto para reunir gente." },
    { y: "2017", t: "Reconocidos en Tripadvisor", d: "Entramos en el top de restaurantes de Zaragoza por valoración de los comensales." },
    { y: "2019", t: "Carta sin gluten", d: "Adaptamos el 90 % de los platos para celíacos, controlando contaminaciones cruzadas." },
    { y: "2022", t: "Travelers' Choice", d: "Premio a los restaurantes mejor valorados del mundo según viajeros." },
    { y: "2025", t: "Diez años", d: "Una década sirviendo el norte en el centro de Aragón. Y los que vienen." },
  ];
  return (
    <section
      id="historia"
      className="section-pad"
      style={{ background: "hsl(var(--crema-dark) / 0.4)" }}
    >
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-14 items-end">
          <div>
            <div className="eyebrow mb-4">Nuestra historia</div>
            <h2 className="text-[34px] md:text-[46px] leading-[1.1]">
              De El Sardinero a{" "}
              <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
                Eduardo Dato
              </em>
            </h2>
          </div>
          <p
            className="text-[16.5px] leading-relaxed"
            style={{ color: "hsl(var(--carbon-soft))" }}
          >
            Taberna El Sardi nació con una idea sencilla: acercar la
            gastronomía cántabra a Aragón. Nuestro nombre rinde homenaje a El
            Sardinero, en Santander, y nuestra cocina mira al norte —al
            producto del Cantábrico, a las recetas de siempre y al fuego
            paciente.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: "hsl(var(--granate) / 0.25)" }}
          />
          <div className="space-y-10 md:space-y-16">
            {hitos.map((h, i) => (
              <div
                key={h.y}
                className={`relative grid md:grid-cols-2 gap-6 md:gap-16 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div
                  className={`pl-12 md:pl-0 ${
                    i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"
                  }`}
                >
                  <div
                    className="inline-flex items-center gap-2 mb-2"
                    style={{ color: "hsl(var(--granate))" }}
                  >
                    <span
                      className="text-[34px] md:text-[42px]"
                      style={{
                        fontFamily: "Fraunces, serif",
                        fontWeight: 500,
                      }}
                    >
                      {h.y}
                    </span>
                  </div>
                  <h3 className="text-[22px] md:text-[26px] mb-2">{h.t}</h3>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {h.d}
                  </p>
                </div>
                <div className="hidden md:block" />
                <span
                  className="absolute left-[9px] md:left-1/2 top-2 w-3.5 h-3.5 rounded-full md:-translate-x-1/2"
                  style={{
                    background: "hsl(var(--granate))",
                    boxShadow: "0 0 0 5px hsl(var(--crema))",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================== EQUIPO ===================== */
const Equipo = () => (
  <section id="equipo" className="section-pad">
    <div className="container-narrow grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div>
        <div className="eyebrow mb-4">El equipo</div>
        <h2 className="text-[34px] md:text-[46px] mb-7 leading-[1.1]">
          Una cocina pequeña,
          <br />
          <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
            un oficio enorme
          </em>
        </h2>
        <p
          className="text-[17px] leading-relaxed mb-8"
          style={{ color: "hsl(var(--carbon-soft))" }}
        >
          Detrás de cada plato hay un equipo que conoce a sus proveedores por
          el nombre. Trabajamos con pescadores del Cantábrico, embutidores de
          Sotopalacios y bodegueros de Ribera, Rioja y Somontano. Esa cercanía
          es nuestra única receta secreta.
        </p>
        <blockquote
          className="relative pl-7 border-l-2 italic text-[18px] leading-relaxed"
          style={{
            borderColor: "hsl(var(--granate))",
            color: "hsl(var(--carbon))",
            fontFamily: "Fraunces, serif",
          }}
        >
          <Quote
            size={22}
            className="absolute -top-1 -left-3"
            style={{ color: "hsl(var(--granate))" }}
          />
          No inventamos nada. Solo intentamos no estropear lo que ya es bueno
          antes de que llegue a la mesa.
        </blockquote>
      </div>
      <div>
        <img
          src="/images/chef.jpg"
          alt="Equipo de cocina emplatando en Taberna El Sardi"
          className="w-full h-[420px] md:h-[560px] object-cover rounded-sm shadow-xl"
        />
      </div>
    </div>
  </section>
);

/* ===================== CARTA ===================== */
const CARTA = [
  {
    titulo: "Curados ibéricos 100% bellota",
    nota: "Precios por 1/2 ración · ración",
    items: [
      { n: "Jamón ibérico de bellota", p: "16 € / 24 €" },
      { n: "Lomo ibérico de bellota", p: "16 € / 24 €" },
      { n: "Chorizo ibérico de bellota", p: "12 € / 18 €" },
      { n: "Chorizo ibérico picante de bellota", p: "12 € / 18 €" },
      { n: "Salchichón ibérico de bellota", p: "12 € / 18 €" },
      { n: "Quesos curados y viejos", p: "10 € / 18 €" },
    ],
  },
  {
    titulo: "Raciones frías",
    items: [
      { n: "Ensaladilla rusa casera", p: "8 €" },
      { n: "Salpicón de mariscos con salsa de mango", p: "16 €" },
      { n: 'Timbal de patata "Sardi"', p: "15 €" },
      { n: "Bacalao ahumado sobre fondo de salmorejo", p: "20 €" },
      { n: "Pudin casero de langostinos y puerros", p: "8 €" },
      { n: "Timbal de escalivada con ventresca de bonito y langostinos", p: "15 €" },
      { n: "Bonito del Cantábrico escabechado", d: "En temporada.", p: "22 €" },
      { n: "Cecina de León con virutas de queso curado", p: "18 €" },
      { n: "Pastrami con rúcula, queso curado y vinagreta de mostaza y miel", p: "20 €" },
      { n: "Octavillo de anchoas del Cantábrico", p: "11 €" },
    ],
  },
  {
    titulo: "Raciones calientes",
    items: [
      { n: 'Pulpo "Sardi"', p: "24 €" },
      { n: "Calamar fresco encebollado", p: "22 €" },
      { n: "Lomo de atún rojo a la parrilla", p: "20 €" },
      { n: "Guiso de pollo con langostinos y salsa de almendras", p: "14 €" },
      { n: 'Cachopo "Sardi"', p: "25 €" },
      { n: "Guiso de carrilleras al vermú rojo", p: "16 €" },
      { n: "Medallón de solomillo ibérico relleno de roquefort", p: "25 €" },
      { n: 'Hamburguesa "Sardi Fest"', d: "180 g de buey, velo de cecina, dúo de quesos y salsa kimchi.", p: "12 €" },
      { n: "Entrecot de buey cebón a la parrilla", d: "400 g.", p: "22 €" },
      { n: "Morcilla de Sotopalacios (Burgos)", p: "7 €" },
      { n: "Foie", p: "12 €" },
    ],
  },
  {
    titulo: "Postres",
    items: [
      { n: 'Postres caseros para "lamineros"', p: "7 €" },
    ],
  },
];

const Carta = () => (
  <section
    id="carta"
    className="section-pad"
    style={{ background: "hsl(var(--carbon))" }}
  >
    <div className="container-narrow">
      <div className="text-center mb-14">
        <div className="eyebrow-light mb-4">La carta</div>
        <h2
          className="text-[36px] md:text-[52px] leading-[1.1] mb-5"
          style={{ color: "hsl(var(--crema))" }}
        >
          Sabores del norte,{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "hsl(var(--dorado))",
            }}
          >
            servidos despacio
          </em>
        </h2>
        <p
          className="max-w-2xl mx-auto text-[16px] leading-relaxed"
          style={{ color: "hsl(var(--crema) / 0.7)" }}
        >
          Selección rotatoria según temporada y mercado. Pregunta a nuestro
          equipo por las sugerencias del día y las medias raciones.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-14 gap-y-14">
        {CARTA.map((sec) => (
          <div key={sec.titulo}>
            <div
              className="divider-ornament mb-3"
              style={{ color: "hsl(var(--dorado))" }}
            >
              <h3
                className="text-[20px] tracking-[0.12em] uppercase font-medium px-2"
                style={{
                  color: "hsl(var(--dorado))",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.22em",
                }}
              >
                {sec.titulo}
              </h3>
            </div>
            {sec.nota && (
              <p
                className="text-center text-[12px] italic mb-6"
                style={{ color: "hsl(var(--crema) / 0.5)" }}
              >
                {sec.nota}
              </p>
            )}
            {!sec.nota && <div className="mb-4" />}
            <ul className="space-y-6">
              {sec.items.map((it) => (
                <li
                  key={it.n}
                  className="flex items-baseline gap-3"
                  data-testid={`menu-item-${it.n.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="flex-1">
                    <div
                      className="flex items-baseline gap-3"
                      style={{ color: "hsl(var(--crema))" }}
                    >
                      <span
                        className="text-[17px]"
                        style={{
                          fontFamily: "Fraunces, serif",
                          fontWeight: 500,
                        }}
                      >
                        {it.n}
                      </span>
                      <span
                        className="flex-1 border-b border-dotted"
                        style={{ borderColor: "hsl(var(--crema) / 0.2)" }}
                      />
                      <span
                        className="whitespace-nowrap"
                        style={{
                          color: "hsl(var(--dorado))",
                          fontFamily: "Fraunces, serif",
                          fontSize: 17,
                        }}
                      >
                        {it.p}
                      </span>
                    </div>
                    {it.d && (
                      <p
                        className="text-[13.5px] mt-1.5 leading-relaxed"
                        style={{ color: "hsl(var(--crema) / 0.55)" }}
                      >
                        {it.d}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Menús cerrados */}
      <div className="grid md:grid-cols-3 gap-5 mt-20">
        {[
          { t: "Menú del día", d: "Disponible de martes a viernes a mediodía.", p: "18 €" },
          { t: "Menú degustación", d: "Selección del chef, 6 pases más postre.", p: "42 €" },
          { t: "Menú grupos", d: "Para mesas de 8 a 24 comensales, bajo reserva.", p: "Desde 35 €" },
        ].map((m) => (
          <div
            key={m.t}
            className="p-7 border"
            style={{
              borderColor: "hsl(var(--crema) / 0.15)",
              background: "hsl(var(--crema) / 0.03)",
            }}
          >
            <div
              className="text-[12px] tracking-[0.2em] uppercase mb-3"
              style={{ color: "hsl(var(--dorado))" }}
            >
              {m.t}
            </div>
            <div
              className="text-[15px] mb-5 leading-relaxed"
              style={{ color: "hsl(var(--crema) / 0.78)" }}
            >
              {m.d}
            </div>
            <div
              className="text-[28px]"
              style={{
                fontFamily: "Fraunces, serif",
                color: "hsl(var(--crema))",
              }}
            >
              {m.p}
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-center mt-12 text-[13.5px]"
        style={{ color: "hsl(var(--crema) / 0.5)" }}
      >
        Precio medio carta: 20–30 € por persona · IVA incluido
      </p>
    </div>
  </section>
);

/* ===================== VINOS ===================== */
const Vinos = () => {
  const refs = [
    { t: "Ribera del Duero", v: "12 referencias" },
    { t: "Rioja", v: "14 referencias" },
    { t: "Somontano", v: "6 referencias" },
    { t: "Bierzo & Galicia", v: "8 referencias" },
    { t: "Espumosos & cava", v: "5 referencias" },
    { t: "Vinos por copa", v: "Rotación semanal" },
  ];
  return (
    <section id="vinos" className="section-pad">
      <div className="container-narrow grid md:grid-cols-5 gap-12 md:gap-16 items-center">
        <div className="md:col-span-2">
          <img
            src="/images/wine.jpg"
            alt="Carta de vinos"
            className="w-full h-[420px] md:h-[520px] object-cover rounded-sm shadow-xl"
          />
        </div>
        <div className="md:col-span-3">
          <div className="eyebrow mb-4 flex items-center gap-2">
            <Wine size={14} /> Carta de vinos
          </div>
          <h2 className="text-[34px] md:text-[46px] mb-7 leading-[1.1]">
            Una bodega que mira al{" "}
            <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
              Duero y al Cantábrico
            </em>
          </h2>
          <p
            className="text-[16.5px] leading-relaxed mb-9"
            style={{ color: "hsl(var(--carbon-soft))" }}
          >
            Trabajamos con bodegueros pequeños y referencias clásicas. Pregunta
            a sala: nos gusta maridar a contracorriente y descubrir vinos junto
            a quien se sienta a la mesa.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {refs.map((r) => (
              <div
                key={r.t}
                className="flex items-baseline gap-3 pb-3 border-b"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <span
                  className="font-medium"
                  style={{ fontFamily: "Fraunces, serif", fontSize: 18 }}
                >
                  {r.t}
                </span>
                <span
                  className="flex-1 text-right text-[13px]"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {r.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================== CELÍACOS ===================== */
const Celiacos = () => (
  <section
    id="celiacos"
    className="section-pad relative overflow-hidden"
    style={{ background: "hsl(var(--granate))" }}
  >
    <div className="container-narrow grid md:grid-cols-2 gap-12 md:gap-16 items-center text-white relative">
      <div>
        <div
          className="text-[12px] tracking-[0.22em] uppercase mb-4 flex items-center gap-2"
          style={{ color: "hsl(var(--dorado))" }}
        >
          <Wheat size={14} /> Restaurante para celíacos en Zaragoza
        </div>
        <h2
          className="text-[34px] md:text-[48px] mb-6 leading-[1.1]"
          style={{ color: "hsl(var(--crema))" }}
        >
          Más del 90 % de la carta,{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "hsl(var(--dorado))",
            }}
          >
            sin gluten
          </em>
        </h2>
        <p
          className="text-[16.5px] leading-relaxed mb-9"
          style={{ color: "hsl(var(--crema) / 0.85)" }}
        >
          En El Sardi entendemos que comer fuera no debería ser un problema.
          Adaptamos nuestras recetas con la misma exigencia, controlando
          contaminaciones cruzadas para que toda la mesa disfrute por igual.
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {[
            { i: <Utensils size={18} />, t: "Carta amplia", d: "Decenas de platos sin gluten." },
            { i: <ShieldCheck size={18} />, t: "Cocina segura", d: "Protocolos contra cross-contact." },
            { i: <Users size={18} />, t: "Para toda la mesa", d: "Sin renunciar a nada." },
            { i: <Sparkles size={18} />, t: "Recetas adaptadas", d: "Cocido, cachopo, tartas…" },
          ].map((f) => (
            <div key={f.t}>
              <div
                className="grid place-items-center w-9 h-9 mb-3 rounded-full"
                style={{
                  background: "hsl(var(--crema) / 0.12)",
                  color: "hsl(var(--dorado))",
                }}
              >
                {f.i}
              </div>
              <div
                className="font-semibold mb-1"
                style={{ color: "hsl(var(--crema))" }}
              >
                {f.t}
              </div>
              <div
                className="text-[13.5px]"
                style={{ color: "hsl(var(--crema) / 0.7)" }}
              >
                {f.d}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-9 text-[14px] italic"
          style={{ color: "hsl(var(--crema) / 0.7)" }}
        >
          Indícanos tu intolerancia al reservar o al llegar y te guiaremos por
          la carta.
        </p>
      </div>

      <div>
        <img
          src="/images/dish-cocido.jpg"
          alt="Cocido montañés"
          className="w-full h-[420px] md:h-[560px] object-cover rounded-sm shadow-2xl"
        />
      </div>
    </div>
  </section>
);

/* ===================== EVENTOS ===================== */
const Eventos = () => (
  <section id="eventos" className="section-pad">
    <div className="container-narrow grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div>
        <img
          src="/images/eventos.jpg"
          alt="Sala privada preparada para una celebración"
          className="w-full h-[420px] md:h-[560px] object-cover rounded-sm shadow-xl"
        />
      </div>
      <div>
        <div className="eyebrow mb-4">Eventos y grupos</div>
        <h2 className="text-[34px] md:text-[46px] mb-6 leading-[1.1]">
          Comidas de empresa, familias y{" "}
          <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
            celebraciones
          </em>
        </h2>
        <p
          className="text-[16.5px] leading-relaxed mb-8"
          style={{ color: "hsl(var(--carbon-soft))" }}
        >
          Disponemos de espacio reservado para grupos de hasta 24 comensales,
          con menús cerrados a medida. Cenas de empresa, cumpleaños, bautizos,
          comuniones y reuniones de equipo: nos encargamos de todo para que tú
          solo te ocupes de disfrutar.
        </p>

        <ul className="space-y-3 mb-9">
          {[
            "Menús cerrados desde 35 € por persona",
            "Adaptación completa a celíacos, vegetarianos y alergias",
            "Sala con luz tenue y maridajes sugeridos",
            "Presupuesto personalizado en menos de 24 h",
          ].map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "hsl(var(--granate))" }}
              />
              <span className="text-[15.5px]">{b}</span>
            </li>
          ))}
        </ul>

        <a
          data-testid="eventos-cta"
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
            "Hola, me gustaría pedir presupuesto para un evento en Taberna El Sardi."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="btn-granate"
        >
          Pedir presupuesto · {PHONE_DISPLAY}
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  </section>
);

/* ===================== GALERÍA ===================== */
const Galeria = () => {
  const fotos = [
    { src: "/images/dish-pulpo.jpg", l: "Pulpo a la brasa" },
    { src: "/images/dish-anchoas.jpg", l: "Anchoas de Santoña" },
    { src: "/images/dish-cocido.jpg", l: "Cocido montañés" },
    { src: "/images/hero-taberna.jpg", l: "Nuestra sala" },
    { src: "/images/dish-tarta.jpg", l: "Tarta de chocolate" },
    { src: "/images/chef.jpg", l: "En la cocina" },
  ];
  return (
    <section
      id="galeria"
      className="section-pad"
      style={{ background: "hsl(var(--crema-dark) / 0.4)" }}
    >
      <div className="container-narrow">
        <div className="text-center mb-12">
          <div className="eyebrow mb-4">Galería</div>
          <h2 className="text-[34px] md:text-[46px] leading-[1.1]">
            Lo que sale de la{" "}
            <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
              cocina
            </em>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {fotos.map((f, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-sm aspect-[4/5] cursor-pointer"
            >
              <img
                src={f.src}
                alt={f.l}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption
                className="absolute inset-x-0 bottom-0 p-4 text-white text-[14px] tracking-wide"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, hsl(var(--carbon) / 0.8))",
                  fontFamily: "Fraunces, serif",
                  fontSize: 16,
                }}
              >
                {f.l}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===================== TESTIMONIOS ===================== */
const Testimonios = () => {
  const ts = [
    { c: "El pulpo es de los mejores que he comido fuera de Galicia. Y la atención, impecable.", a: "María L.", s: "Google · 5★" },
    { c: "Por fin un sitio en Zaragoza donde, siendo celíaca, puedo pedir prácticamente la carta entera.", a: "Cristina P.", s: "Tripadvisor · 5★" },
    { c: "El cocido montañés sabe a Cantabria. Las anchoas, una barbaridad. Volveremos seguro.", a: "Javier R.", s: "Google · 5★" },
    { c: "Cenamos 14 personas por un cumpleaños y todo salió perfecto. Trato cercanísimo.", a: "Sandra M.", s: "Google · 5★" },
  ];
  return (
    <section className="section-pad">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">Lo que dicen nuestros comensales</div>
          <h2 className="text-[34px] md:text-[46px] leading-[1.1]">
            <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
              4,6 / 5
            </em>{" "}
            con más de 2.200 opiniones
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {ts.map((t, i) => (
            <blockquote
              key={i}
              className="p-7 md:p-9 rounded-sm relative"
              style={{
                background: "hsl(var(--crema-dark) / 0.45)",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <Quote
                size={28}
                className="mb-4"
                style={{ color: "hsl(var(--granate))" }}
              />
              <p
                className="text-[17px] leading-relaxed mb-6"
                style={{
                  fontFamily: "Fraunces, serif",
                  color: "hsl(var(--carbon))",
                  fontStyle: "italic",
                }}
              >
                “{t.c}”
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-[14.5px]">{t.a}</div>
                <div
                  className="text-[12px] tracking-wider uppercase"
                  style={{ color: "hsl(var(--granate))" }}
                >
                  {t.s}
                </div>
              </div>
            </blockquote>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          <div
            className="text-center text-[11px] tracking-[0.22em] uppercase mb-5"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Hablan de nosotros
          </div>
          <div
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[14px]"
            style={{ color: "hsl(var(--carbon-soft))", fontFamily: "Fraunces, serif", fontSize: 18 }}
          >
            <span>Heraldo de Aragón</span>
            <span className="opacity-30">·</span>
            <span>El Periódico</span>
            <span className="opacity-30">·</span>
            <span>Tripadvisor</span>
            <span className="opacity-30">·</span>
            <span>Google</span>
            <span className="opacity-30">·</span>
            <span>Cocinatis</span>
            <span className="opacity-30">·</span>
            <span>Aragón Gourmet</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================== FAQ ===================== */
const FAQ = () => {
  const qs = [
    { q: "¿Es necesario reservar?", a: "Recomendado siempre, imprescindible los fines de semana. Puedes llamarnos al 683 45 76 31." },
    { q: "¿Tenéis carta sin gluten?", a: "Sí. Más del 90 % de los platos pueden servirse sin gluten, con protocolos contra contaminación cruzada." },
    { q: "¿Hay opciones vegetarianas?", a: "Sí, ofrecemos entrantes, ensaladas y platos principales vegetarianos. Avisa al reservar si todo el grupo lo necesita." },
    { q: "¿Aceptáis grupos grandes?", a: "Sí, hasta 24 comensales con menú cerrado a partir de 35 € por persona." },
    { q: "¿Hay terraza?", a: "Sí, disponemos de terraza exterior durante la temporada." },
    { q: "¿Sois accesibles?", a: "El local cuenta con acceso para personas con movilidad reducida." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section
      id="faq"
      className="section-pad"
      style={{ background: "hsl(var(--crema-dark) / 0.4)" }}
    >
      <div className="container-narrow max-w-3xl">
        <div className="text-center mb-12">
          <div className="eyebrow mb-4">Preguntas frecuentes</div>
          <h2 className="text-[34px] md:text-[46px] leading-[1.1]">
            Todo lo que sueles{" "}
            <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
              preguntarnos
            </em>
          </h2>
        </div>
        <div className="space-y-3">
          {qs.map((q, i) => (
            <div
              key={i}
              className="border-b"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <button
                data-testid={`faq-toggle-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full py-5 flex items-center justify-between text-left group"
              >
                <span
                  className="text-[17px] md:text-[19px] pr-6"
                  style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}
                >
                  {q.q}
                </span>
                <span
                  className="grid place-items-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{
                    background: open === i ? "hsl(var(--granate))" : "transparent",
                    color: open === i ? "hsl(var(--crema))" : "hsl(var(--granate))",
                    border:
                      open === i
                        ? "1px solid hsl(var(--granate))"
                        : "1px solid hsl(var(--granate) / 0.4)",
                    transition: "all 240ms",
                  }}
                >
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: open === i ? "200px" : "0",
                  opacity: open === i ? 1 : 0,
                }}
              >
                <p
                  className="pb-5 text-[15.5px] leading-relaxed pr-12"
                  style={{ color: "hsl(var(--carbon-soft))" }}
                >
                  {q.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===================== RESERVAS (FORM -> WHATSAPP) ===================== */
const Reservas = () => {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    personas: "2",
    fecha: "",
    hora: "",
    ocasion: "",
    notas: "",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.fecha || !form.hora) {
      alert("Por favor, rellena los campos obligatorios (*)");
      return;
    }
    const msg = `Hola, me gustaría reservar mesa en Taberna El Sardi:
• Nombre: ${form.nombre}
• Teléfono: ${form.telefono}
• Personas: ${form.personas}
• Fecha: ${form.fecha}
• Hora: ${form.hora}${form.ocasion ? `\n• Ocasión: ${form.ocasion}` : ""}${
      form.notas ? `\n• Notas: ${form.notas}` : ""
    }`;
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const personas = Array.from({ length: 24 }, (_, i) => i + 1);
  const horas = [];
  ["13", "14", "15", "20", "21", "22", "23"].forEach((h) => {
    horas.push(`${h}:00`);
    horas.push(`${h}:30`);
  });

  return (
    <section
      id="reservas"
      className="section-pad relative overflow-hidden"
      style={{ background: "hsl(var(--carbon))" }}
    >
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/hero-taberna.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "hsl(var(--carbon) / 0.7)" }}
        />
      </div>

      <div className="container-narrow relative grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="text-white">
          <div className="eyebrow-light mb-4">Reservas</div>
          <h2
            className="text-[36px] md:text-[52px] mb-7 leading-[1.05]"
            style={{ color: "hsl(var(--crema))" }}
          >
            Reserva tu mesa y ven a{" "}
            <em
              style={{ fontStyle: "italic", color: "hsl(var(--dorado))" }}
            >
              probar el norte
            </em>
          </h2>
          <p
            className="text-[16.5px] leading-relaxed mb-9"
            style={{ color: "hsl(var(--crema) / 0.78)" }}
          >
            Rellena el formulario y te confirmamos al instante por WhatsApp. O
            si lo prefieres, llámanos directamente.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              data-testid="reservas-llamar"
              href={`tel:${PHONE}`}
              className="btn-outline"
              style={{ borderColor: "hsl(var(--dorado))", color: "hsl(var(--dorado))" }}
            >
              <Phone size={15} /> Llamar · {PHONE_DISPLAY}
            </a>
            <a
              data-testid="reservas-whatsapp"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              WhatsApp directo
            </a>
          </div>

          <div className="space-y-4">
            {[
              { i: <MapPin size={16} />, t: "Calle Eduardo Dato, 23 · Zaragoza" },
              { i: <Clock size={16} />, t: "Cocina hasta las 23:30" },
              { i: <Users size={16} />, t: "Grupos de hasta 24 personas" },
            ].map((x) => (
              <div
                key={x.t}
                className="flex items-center gap-3"
                style={{ color: "hsl(var(--crema) / 0.85)" }}
              >
                <span
                  className="grid place-items-center w-9 h-9 rounded-full"
                  style={{
                    background: "hsl(var(--crema) / 0.08)",
                    color: "hsl(var(--dorado))",
                  }}
                >
                  {x.i}
                </span>
                <span className="text-[15px]">{x.t}</span>
              </div>
            ))}
          </div>
        </div>

        <form
          data-testid="reserva-form"
          onSubmit={onSubmit}
          className="p-7 md:p-9 rounded-sm space-y-5"
          style={{
            background: "hsl(var(--crema))",
            color: "hsl(var(--carbon))",
            boxShadow: "0 30px 80px hsl(var(--carbon) / 0.5)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nombre *">
              <input
                data-testid="form-nombre"
                required
                value={form.nombre}
                onChange={update("nombre")}
                placeholder="Tu nombre"
              />
            </Field>
            <Field label="Teléfono *">
              <input
                data-testid="form-telefono"
                required
                value={form.telefono}
                onChange={update("telefono")}
                placeholder="600 00 00 00"
                inputMode="tel"
              />
            </Field>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Personas *">
              <select
                data-testid="form-personas"
                value={form.personas}
                onChange={update("personas")}
              >
                {personas.map((n) => (
                  <option key={n} value={n}>
                    {n} persona{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Fecha *">
              <input
                data-testid="form-fecha"
                type="date"
                required
                value={form.fecha}
                onChange={update("fecha")}
                min={new Date().toISOString().split("T")[0]}
              />
            </Field>
            <Field label="Hora *">
              <select
                data-testid="form-hora"
                value={form.hora}
                onChange={update("hora")}
                required
              >
                <option value="">Elige</option>
                {horas.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Ocasión (opcional)">
            <select
              data-testid="form-ocasion"
              value={form.ocasion}
              onChange={update("ocasion")}
            >
              <option value="">Ninguna en particular</option>
              <option>Cumpleaños</option>
              <option>Aniversario</option>
              <option>Comida de empresa</option>
              <option>Celebración familiar</option>
              <option>Otra</option>
            </select>
          </Field>

          <Field label="Notas (alergias, preferencias…)">
            <textarea
              data-testid="form-notas"
              rows={3}
              value={form.notas}
              onChange={update("notas")}
              placeholder="Celíaco, alergia a frutos secos, mesa al fondo…"
            />
          </Field>

          <button
            type="submit"
            data-testid="form-submit"
            className="btn-granate w-full justify-center text-[15px]"
          >
            Reservar por WhatsApp
            <ArrowRight size={16} />
          </button>

          <p
            className="text-center text-[12.5px]"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Al enviar serás redirigido a WhatsApp con el mensaje pre-rellenado.
          </p>
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span
      className="block text-[12px] tracking-[0.12em] uppercase mb-1.5 font-medium"
      style={{ color: "hsl(var(--carbon-soft))" }}
    >
      {label}
    </span>
    <div
      className="
      [&_input]:w-full [&_input]:bg-transparent [&_input]:border [&_input]:border-[hsl(var(--border))] [&_input]:rounded-sm [&_input]:px-3.5 [&_input]:py-2.5 [&_input]:text-[15px] [&_input]:outline-none [&_input:focus]:border-[hsl(var(--granate))]
      [&_select]:w-full [&_select]:bg-transparent [&_select]:border [&_select]:border-[hsl(var(--border))] [&_select]:rounded-sm [&_select]:px-3.5 [&_select]:py-2.5 [&_select]:text-[15px] [&_select]:outline-none [&_select:focus]:border-[hsl(var(--granate))]
      [&_textarea]:w-full [&_textarea]:bg-transparent [&_textarea]:border [&_textarea]:border-[hsl(var(--border))] [&_textarea]:rounded-sm [&_textarea]:px-3.5 [&_textarea]:py-2.5 [&_textarea]:text-[15px] [&_textarea]:outline-none [&_textarea:focus]:border-[hsl(var(--granate))] [&_textarea]:resize-none
      "
    >
      {children}
    </div>
  </label>
);

/* ===================== VISITANOS ===================== */
const Visitanos = () => (
  <section id="visitanos" className="section-pad">
    <div className="container-narrow">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-12 items-end">
        <div>
          <div className="eyebrow mb-4">Visítanos</div>
          <h2 className="text-[34px] md:text-[46px] leading-[1.1]">
            Te esperamos en{" "}
            <em style={{ fontStyle: "italic", color: "hsl(var(--granate))" }}>
              Eduardo Dato
            </em>
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:gap-14">
        <div className="space-y-8">
          {[
            {
              t: "Dirección",
              c: (
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Calle Eduardo Dato, 23 · 50005 Zaragoza
                </a>
              ),
            },
            {
              t: "Teléfono",
              c: (
                <a href={`tel:${PHONE}`} className="hover:underline">
                  {PHONE_DISPLAY}
                </a>
              ),
            },
            {
              t: "Cómo llegar",
              c: "A 10 minutos a pie de la Plaza San Francisco.",
            },
            {
              t: "Servicios",
              c: "Terraza · Carta de vinos · Opciones vegetarianas y sin gluten · Accesible · Pago con tarjeta · Reservas",
            },
          ].map((b) => (
            <div key={b.t}>
              <div
                className="text-[11px] tracking-[0.22em] uppercase mb-2"
                style={{ color: "hsl(var(--granate))" }}
              >
                {b.t}
              </div>
              <div className="text-[15px] leading-relaxed">{b.c}</div>
            </div>
          ))}
        </div>

        <div>
          <div
            className="text-[11px] tracking-[0.22em] uppercase mb-5"
            style={{ color: "hsl(var(--granate))" }}
          >
            Horario
          </div>
          <ul className="space-y-3">
            {[
              ["Lunes", "Cerrado"],
              ["Martes", "13:00–16:00 · 20:00–23:30"],
              ["Miércoles", "13:00–16:00 · 20:00–23:30"],
              ["Jueves", "13:00–16:00 · 20:00–23:30"],
              ["Viernes", "13:00–16:00 · 20:00–23:30"],
              ["Sábado", "13:00–16:30 · 20:00–23:30"],
              ["Domingo", "13:00–16:00"],
            ].map(([d, h]) => (
              <li
                key={d}
                className="flex items-baseline gap-3 pb-2 border-b"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <span
                  className="font-medium"
                  style={{ fontFamily: "Fraunces, serif", fontSize: 16 }}
                >
                  {d}
                </span>
                <span
                  className="flex-1 text-right text-[13.5px]"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1 rounded-sm overflow-hidden shadow-lg">
          <iframe
            data-testid="map-iframe"
            title="Mapa Taberna El Sardi"
            src="https://www.google.com/maps?q=Calle+Eduardo+Dato+23+Zaragoza&output=embed"
            className="w-full h-full min-h-[360px]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
);

/* ===================== FOOTER ===================== */
const Footer = () => (
  <footer
    className="py-10"
    style={{ background: "hsl(var(--carbon))", color: "hsl(var(--crema) / 0.65)" }}
  >
    <div className="container-narrow grid md:grid-cols-3 gap-6 items-center text-center md:text-left">
      <div>
        <div
          className="text-[16px] mb-1"
          style={{ fontFamily: "Fraunces, serif", color: "hsl(var(--crema))" }}
        >
          Taberna El Sardi
        </div>
        <div className="text-[12px] tracking-[0.18em] uppercase">
          Cocina cántabra · Zaragoza
        </div>
      </div>
      <div className="text-[13px]">
        © {new Date().getFullYear()} Taberna El Sardi · Todos los derechos
        reservados
      </div>
      <div className="flex md:justify-end gap-5 justify-center text-[13px]">
        <a href={`tel:${PHONE}`} className="hover:text-white">
          {PHONE_DISPLAY}
        </a>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          Eduardo Dato 23
        </a>
      </div>
    </div>
  </footer>
);

/* ===================== APP ===================== */
function App() {
  const handleReservar = () => scrollToId("reservas");

  // Reveal on scroll for elements marked .fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="App">
      <TopBar />
      <Navbar onReservar={handleReservar} />
      <Hero onReservar={handleReservar} />
      <Stats />
      <Filosofia />
      <Historia />
      <Equipo />
      <Carta />
      <Vinos />
      <Celiacos />
      <Eventos />
      <Galeria />
      <Testimonios />
      <FAQ />
      <Reservas />
      <Visitanos />
      <Footer />
    </div>
  );
}

export default App;
