import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import React, { cloneElement, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ArrowUp,
  MapPin,
  Instagram,
  Facebook,
  Mail,
  Sparkles,
  Gamepad2,
  ShieldCheck,
  Settings2,
  Users,
  BadgeDollarSign,
  HeartHandshake,
  Star,
  Cake,
  School,
  GraduationCap,
  Building2,
  ShoppingBag,
  Presentation,
  PartyPopper,
  Heart,
  ChevronDown,
  Clock,
  Tag,
  Send,
  Navigation,
} from "lucide-react";

import {
  heroImg,
  gHorror,
  gBeat,
  gCricket,
  gPlank,
  gBoxing,
  gPistol,
  gCoaster,
  gConjuring,
  gZombie,
} from "@/assets/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ultimate VR Experience — Premium Virtual Reality Gaming for Events" },
      {
        name: "description",
        content:
          "Book premium VR gaming experiences for schools, colleges, birthday parties, corporate events and exhibitions.",
      },
    ],
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
  }),
  component: LandingPage,
});

const PHONE = "917026487101";
const DISPLAY_PHONE = "+91 70264 87101";
const waLink = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
const BOOK_MSG = "Hi Ultimate VR Experience, I want to book a VR experience.";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Games", href: "#games" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const GAMES = [
  { title: "VR Horror Stories", img: gHorror, desc: "Terrifying tales that unfold around you in the dark.", genre: "Horror", duration: "10 min" },
  { title: "Beat Saber", img: gBeat, desc: "Slash neon blocks to the rhythm with dual sabers.", genre: "Rhythm", duration: "8 min" },
  { title: "VR Cricket", img: gCricket, desc: "Step onto the pitch, face the bowler, hit sixes.", genre: "Sports", duration: "12 min" },
  { title: "Richie's Plank Experience", img: gPlank, desc: "Walk a plank 80 stories above a bustling city.", genre: "Thriller", duration: "5 min" },
  { title: "Creed: Rise To Glory", img: gBoxing, desc: "Train and fight legendary boxers in the ring.", genre: "Sports", duration: "10 min" },
  { title: "Pistol Whip", img: gPistol, desc: "John Wick meets Beat Saber. Shoot to the beat.", genre: "Action", duration: "10 min" },
  { title: "Epic Roller Coasters", img: gCoaster, desc: "Ride the wildest coasters ever built. Buckle up.", genre: "Thrill", duration: "8 min" },
  { title: "Conjuring 360", img: gConjuring, desc: "A cinematic 360° horror ride you can't unsee.", genre: "Horror", duration: "6 min" },
  { title: "Drop Dead", img: gZombie, desc: "Survive the zombie apocalypse with dual pistols.", genre: "Shooter", duration: "12 min" },
];

const EVENTS = [
  { title: "School Events", icon: School },
  { title: "College Fests", icon: GraduationCap },
  { title: "Corporate Events", icon: Building2 },
  { title: "Birthday Parties", icon: Cake },
  { title: "Mall Promotions", icon: ShoppingBag },
  { title: "Exhibitions", icon: Presentation },
  { title: "Private Events", icon: PartyPopper },
  { title: "Wedding Entertainment", icon: Heart },
];

const FEATURES = [
  { title: "Latest VR Games", icon: Gamepad2, desc: "Constantly refreshed library of trending titles." },
  { title: "Professional Equipment", icon: Settings2, desc: "Top-tier headsets, sensors and haptics." },
  { title: "Safe Gaming Experience", icon: ShieldCheck, desc: "Sanitized gear and trained supervision." },
  { title: "Event Setup Available", icon: Sparkles, desc: "Full turnkey setup at your venue." },
  { title: "Experienced Team", icon: Users, desc: "500+ successful events across India." },
  { title: "Affordable Packages", icon: BadgeDollarSign, desc: "Tailored plans for any budget." },
  { title: "Friendly Support", icon: HeartHandshake, desc: "We handle everything, you enjoy." },
  { title: "Premium Experience", icon: Star, desc: "Cinematic quality from start to finish." },
];

const TESTIMONIALS = [
  { name: "Ananya R.", role: "College Fest Coordinator", text: "The VR zone was the hit of our fest. Queues never stopped, everyone was amazed." },
  { name: "Rohit M.", role: "Birthday Parent", text: "My son and his friends still talk about the horror ride. Absolutely worth it." },
  { name: "Karthik S.", role: "Corporate HR", text: "Professional team, seamless setup, and the games are next-level. Booking again." },
  { name: "Priya V.", role: "School Principal", text: "Safe, educational and pure fun. Students learned while enjoying immersive worlds." },
  { name: "Vikram J.", role: "Wedding Planner", text: "A wedding entertainment idea nobody expected. Guests loved every minute." },
];

const FAQ = [
  { q: "What VR games do you offer?", a: "We host 20+ top titles across horror, sports, rhythm, thrill and multiplayer. The library above is a snapshot — we constantly add new games." },
  { q: "Can you visit schools and colleges?", a: "Absolutely. We regularly set up at schools, colleges and university fests with dedicated staff and safety protocols." },
  { q: "Do you provide VR for birthday parties?", a: "Yes — birthday packages are one of our most-loved offerings, with kid-safe titles and full supervision." },
  { q: "How many people can play at once?", a: "We deploy multiple stations in parallel. For large events we can run 4–8+ simultaneous experiences." },
  { q: "Do you travel to different cities?", a: "Yes. We travel across India for events. Share your date and location on WhatsApp for a custom quote." },
];

// -------------------- BACKGROUND --------------------

function ParticleBackground() {
  const reduce = useReducedMotion();
  // Halve particles on smaller screens and skip animation entirely when reduced motion is preferred.
  const count = reduce ? 0 : 24;
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 12,
    color: ["#00d4ff", "#7b2eff", "#ff7a00"][i % 3],
  }));
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 bg-grid opacity-40 ${reduce ? "" : "animate-drift"}`} />
      <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#00d4ff]/20 blur-[160px]" />
      <div className="absolute -right-40 top-1/3 h-[600px] w-[600px] rounded-full bg-[#7b2eff]/20 blur-[160px]" />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#ff7a00]/15 blur-[160px]" />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// -------------------- LOADING --------------------

function LoadingScreen({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-6 h-16 w-16 rounded-full border-2 border-[#00d4ff]/20 border-t-[#00d4ff]"
            style={{ boxShadow: "0 0 40px rgba(0,212,255,0.6)" }}
          />
          <div className="font-display text-sm uppercase tracking-[0.4em] text-white/70">
            Loading Experience
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// -------------------- NAV --------------------

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all sm:px-6 ${
          scrolled ? "glass-strong" : "glass"
        }`}
        style={{ marginLeft: "1rem", marginRight: "1rem" }}
      >
        <a href="#home" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#7b2eff] shadow-[0_0_20px_rgba(0,212,255,0.6)]">
            <span className="font-display text-sm font-black text-black">V</span>
          </div>
          <div className="hidden font-display text-sm font-bold uppercase tracking-widest text-white sm:block">
            Ultimate <span className="text-gradient">VR</span>
          </div>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href={waLink(BOOK_MSG)} target="_blank" rel="noreferrer" className="btn-neon btn-neon-hover">
            Book Now
          </a>
        </div>
        <button
          onClick={() => setOpen((s) => !s)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-3 rounded-3xl glass-strong p-4 lg:hidden"
          >
            <div className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={waLink(BOOK_MSG)}
                target="_blank"
                rel="noreferrer"
                className="btn-neon btn-neon-hover mt-3"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// -------------------- SECTION WRAPPER --------------------

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-14 max-w-3xl"
      >
        {eyebrow && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00d4ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] animate-pulse-glow" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base text-white/60 sm:text-lg">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}

// -------------------- HERO --------------------

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden pt-32">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={heroImg}
          alt=""
          className="h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/70 to-[#050505]" />
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur"
          >
            <Sparkles size={12} className="text-[#00d4ff]" />
            Next-Gen VR Entertainment
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-black leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Experience the <br />
            <span className="text-gradient">Future of Virtual</span> <br />
            <span className="neon-text">Reality</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-base text-white/70 sm:text-lg"
          >
            Immersive VR games, thrilling horror adventures, sports simulations, multiplayer fun
            and unforgettable entertainment — brought straight to your event.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href={waLink(BOOK_MSG)} target="_blank" rel="noreferrer" className="btn-neon btn-neon-hover">
              Book Now
            </a>
            <a href="#games" className="btn-ghost-neon">
              Explore Games
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-4"
          >
            {[
              { k: "500+", v: "Events" },
              { k: "20+", v: "VR Games" },
              { k: "10k+", v: "Players" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl p-4 text-center">
                <div className="font-display text-2xl font-black text-gradient">{s.k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-white/60">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="animate-float">
            <div className="relative rounded-[2.5rem] glass-strong p-3 shadow-[0_0_60px_rgba(0,212,255,0.3)]">
              <img
                src={heroImg}
                alt="Gamer immersed in a neon-lit virtual reality session"
                className="rounded-[2rem] object-cover"
                width={1920}
                height={1080}
                decoding="async"
              />
              <div className="absolute -bottom-6 -left-6 rounded-2xl glass-strong px-4 py-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#00d4ff] animate-pulse-glow" aria-hidden="true" />
                  Live Session
                </div>
              </div>
              <div className="absolute -right-4 -top-4 rounded-2xl bg-gradient-to-br from-[#ff7a00] to-[#7b2eff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(255,122,0,0.5)]">
                4K · 120Hz
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 mt-4 overflow-hidden border-y border-white/5 bg-black/40 py-4 backdrop-blur" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 pr-12 font-display text-sm uppercase tracking-[0.3em] text-white/40">
              {["Horror", "Sports", "Multiplayer", "Rhythm", "Thrill", "Racing", "Shooter", "Adventure"].map((w, j) => (
                <span key={j} className="flex items-center gap-12">
                  <span className="text-[#00d4ff]">◆</span>
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------- ABOUT --------------------

function About() {
  return (
    <Section
      id="about"
      eyebrow="Who We Are"
      title={<>Bringing the <span className="text-gradient">Virtual</span> to Every Real Moment</>}
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-5 text-lg text-white/70"
        >
          <p>
            Ultimate VR Experience delivers premium Virtual Reality gaming experiences for schools,
            colleges, birthday parties, corporate events, exhibitions, shopping malls and private
            celebrations.
          </p>
          <p>
            We bring immersive VR entertainment to every event with professional equipment and
            exciting games — turnkey setup, trained crew, unforgettable memories.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Turnkey Setup", "Trained Crew", "Sanitized Gear", "Custom Packages"].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/70">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { k: "500+", v: "Events Delivered", c: "#00d4ff" },
            { k: "20+", v: "VR Titles", c: "#7b2eff" },
            { k: "10k+", v: "Happy Players", c: "#ff7a00" },
            { k: "4.9★", v: "Avg. Rating", c: "#00d4ff" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-3xl p-6">
              <div className="font-display text-4xl font-black" style={{ color: s.c, textShadow: `0 0 20px ${s.c}80` }}>
                {s.k}
              </div>
              <div className="mt-2 text-sm text-white/60">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// -------------------- GAMES --------------------

function Games() {
  return (
    <Section
      id="games"
      eyebrow="Featured Games"
      title={<>Level Up with <span className="text-gradient">Signature</span> Titles</>}
      subtitle="A hand-picked lineup that spans horror, sports, rhythm and pure adrenaline."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g, i) => (
          <motion.article
            key={g.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl glass"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={g.img}
                alt={g.title}
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                {g.genre}
              </div>
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#00d4ff]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#00d4ff] backdrop-blur">
                <Clock size={10} /> {g.duration}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-black text-white transition group-hover:text-[#00d4ff]">
                  {g.title}
                </h3>
                <p className="mt-1 text-sm text-white/60">{g.desc}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 0 1px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.35)" }} />
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

// -------------------- GALLERY --------------------

function Gallery() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const imgs: { src: string; alt: string }[] = [
    { src: gBeat, alt: "Player slicing neon cubes in Beat Saber VR" },
    { src: gCricket, alt: "VR cricket batsman playing in floodlit stadium" },
    { src: gPistol, alt: "First-person VR shooter in neon sci-fi corridor" },
    { src: gCoaster, alt: "Neon roller coaster ride in VR" },
    { src: gPlank, alt: "Walking a plank between skyscrapers in VR" },
    { src: gHorror, alt: "VR horror mansion poster with ghostly figure" },
    { src: gBoxing, alt: "VR boxer with red gloves in the ring" },
    { src: gConjuring, alt: "Dark hooded figure in Conjuring 360 VR experience" },
    { src: gZombie, alt: "Zombie chase scene in Drop Dead VR shooter" },
  ];

  // Trap Escape key while lightbox open
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <Section
      id="gallery"
      eyebrow="Gallery"
      title={<>Snapshots from the <span className="text-gradient">VR Arena</span></>}
      subtitle="Real players, real events, real reactions."
    >
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 list-none p-0">
        {imgs.map((item, i) => (
          <li key={i} className="mb-4 block">
            <motion.button
              type="button"
              onClick={() => setLightbox(item)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="block w-full overflow-hidden rounded-2xl glass group"
              aria-label={`Open image: ${item.alt}`}
            >
              <div className="overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged gallery image"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
              style={{ boxShadow: "0 0 80px rgba(0,212,255,0.4)" }}
            />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full glass-strong text-white"
              aria-label="Close image viewer"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// -------------------- EVENTS --------------------

function Events() {
  return (
    <Section
      id="events"
      eyebrow="Events"
      title={<>Perfect For <span className="text-gradient">Every Occasion</span></>}
      subtitle="One team, unlimited use cases. Wherever you gather people, we bring the immersion."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EVENTS.map((e, i) => {
          const Icon = e.icon;
          const msg = `Hi Ultimate VR Experience, I'd like to book VR for a ${e.title}.`;
          return (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass p-6"
            >
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7b2eff]/20 text-[#00d4ff] transition group-hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{e.title}</h3>
              <p className="mt-2 text-sm text-white/60">Custom package tailored to the audience, venue and vibe.</p>
              <a
                href={waLink(msg)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#00d4ff] transition hover:text-white"
              >
                Book Event <MessageCircle size={12} />
              </a>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// -------------------- WHY --------------------

function Why() {
  return (
    <Section
      id="why"
      eyebrow="Why Choose Us"
      title={<>Built for <span className="text-gradient">Unforgettable</span> Moments</>}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative rounded-3xl glass p-6"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#7b2eff]/30 to-[#ff7a00]/30 text-white">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-base font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/60">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// -------------------- BOOKING FORM --------------------

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    date: "",
    location: "",
    participants: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Hi Ultimate VR Experience,

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Event: ${form.eventType}
Date: ${form.date}
Location: ${form.location}
Participants: ${form.participants}

Message:
${form.message || "I would like to book a VR experience."}`;
    window.open(waLink(msg), "_blank");
  };

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#00d4ff] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.15)]";

  return (
    <Section
      id="book"
      eyebrow="Booking"
      title={<>Reserve Your <span className="text-gradient">VR Slot</span></>}
      subtitle="Fill in the details — we'll continue the conversation on WhatsApp instantly."
    >
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong grid gap-4 rounded-3xl p-6 sm:grid-cols-2 sm:p-10"
      >
        <Field label="Full Name" required>
          <input required maxLength={80} placeholder="Full Name" value={form.name} onChange={set("name")} className={input} autoComplete="name" />
        </Field>
        <Field label="Phone Number" required>
          <input required maxLength={20} placeholder="Phone Number" value={form.phone} onChange={set("phone")} className={input} type="tel" autoComplete="tel" />
        </Field>
        <Field label="Email">
          <input maxLength={120} placeholder="Email" value={form.email} onChange={set("email")} className={input} type="email" autoComplete="email" />
        </Field>
        <Field label="Event Type" required>
          <select required value={form.eventType} onChange={set("eventType")} className={input} aria-label="Event Type">
            <option value="" className="bg-black">Select event type…</option>
            {EVENTS.map((e) => (
              <option key={e.title} value={e.title} className="bg-black">{e.title}</option>
            ))}
          </select>
        </Field>
        <Field label="Event Date" required>
          <input required placeholder="Event Date" value={form.date} onChange={set("date")} className={input} type="date" />
        </Field>
        <Field label="Location" required>
          <input required maxLength={120} placeholder="Location" value={form.location} onChange={set("location")} className={input} autoComplete="address-level2" />
        </Field>
        <Field label="Number of Participants" className="sm:col-span-2">
          <input maxLength={10} placeholder="Number of Participants" value={form.participants} onChange={set("participants")} className={input} type="number" min={1} />
        </Field>
        <Field label="Message" className="sm:col-span-2">
          <textarea maxLength={800} placeholder="Tell us about your event" value={form.message} onChange={set("message")} className={`${input} min-h-[120px] resize-none`} />
        </Field>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-neon btn-neon-hover w-full sm:w-auto">
            <Send size={14} aria-hidden="true" /> Send on WhatsApp
          </button>
        </div>
      </motion.form>
    </Section>
  );
}

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const cloned = cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    id,
    "aria-required": required || undefined,
  });
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}{required ? " (required)" : ""}
      </label>
      {cloned}
    </div>
  );
}

// -------------------- TESTIMONIALS --------------------

function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [reduce, paused]);
  const t = TESTIMONIALS[i];
  return (
    <Section
      id="testimonials"
      eyebrow="Reviews"
      title={<>Loved by <span className="text-gradient">Players</span> & Organizers</>}
    >
      <div
        className="relative mx-auto max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-3xl p-8 sm:p-12 text-center"
            >
              <div className="mb-4 flex justify-center gap-1 text-[#ff7a00]" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} size={18} fill="#ff7a00" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-lg text-white/85 sm:text-xl">"{t.text}"</blockquote>
              <figcaption className="mt-6">
                <div className="font-display text-base font-bold text-white">{t.name}</div>
                <div className="text-xs uppercase tracking-widest text-white/60">{t.role}</div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              className={`min-h-[24px] rounded-full transition-all ${k === i ? "w-8 bg-[#00d4ff]" : "w-2 bg-white/30"} h-1.5`}
              aria-label={`Show testimonial ${k + 1} of ${TESTIMONIALS.length}`}
              aria-selected={k === i}
              role="tab"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

// -------------------- FAQ --------------------

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title={<>Everything You Want to <span className="text-gradient">Know</span></>}>
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const btnId = `faq-btn-${i}`;
          return (
            <div key={i} className="overflow-hidden rounded-2xl glass">
              <h3 className="m-0">
                <button
                  type="button"
                  id={btnId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-display text-base font-bold text-white">{item.q}</span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 text-[#00d4ff] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-sm text-white/70">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// -------------------- CONTACT --------------------

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title={<>Let's <span className="text-gradient">Build</span> Your Event</>}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-strong rounded-3xl p-8">
          <h3 className="font-display text-2xl font-black text-white">Reach Out</h3>
          <div className="mt-6 space-y-4 text-sm">
            <ContactRow icon={<Phone size={16} />} label="Phone" value={DISPLAY_PHONE} href={`tel:+${PHONE}`} />
            <ContactRow icon={<Instagram size={16} />} label="Instagram" value="ultimate_vr_experience" href="https://instagram.com/ultimate_vr_experience" />
            <ContactRow icon={<Facebook size={16} />} label="Facebook" value="Ultimate VR Experience" href="https://facebook.com" />
            <ContactRow icon={<Mail size={16} />} label="Email" value="Coming soon" />
            <ContactRow icon={<MapPin size={16} />} label="Location" value="Add Google Maps later" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:+${PHONE}`} className="btn-neon btn-neon-hover">
              <Phone size={14} /> Call Now
            </a>
            <a href={waLink(BOOK_MSG)} target="_blank" rel="noreferrer" className="btn-ghost-neon">
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a href="#" className="btn-ghost-neon">
              <Navigation size={14} /> Directions
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#7b2eff]/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#00d4ff]/30 blur-3xl" />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#ff7a00]/40 bg-[#ff7a00]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#ff7a00]">
              <Tag size={10} /> Custom Packages
            </div>
            <h3 className="font-display text-3xl font-black leading-tight text-white">
              Ready to bring VR to your event?
            </h3>
            <p className="mt-3 text-white/70">
              Tell us your date, city and audience size. We'll craft a package that fits your budget and blows minds.
            </p>
            <a href="#book" className="btn-neon btn-neon-hover mt-6 inline-flex">
              Start Booking
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-[#00d4ff]/40 hover:bg-white/[0.04]">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#00d4ff]/10 text-[#00d4ff]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
        <div className="truncate text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

// -------------------- FLOATING BUTTONS --------------------

function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-12 w-12 place-items-center rounded-full glass-strong text-white transition hover:text-[#00d4ff]"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={`tel:+${PHONE}`}
        className="grid h-12 w-12 place-items-center rounded-full bg-[#7b2eff] text-white shadow-[0_0_25px_rgba(123,46,255,0.6)] transition hover:scale-110"
        aria-label="Call"
      >
        <Phone size={18} />
      </a>
      <a
        href={waLink(BOOK_MSG)}
        target="_blank"
        rel="noreferrer"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_30px_rgba(37,211,102,0.6)] transition hover:scale-110 animate-pulse-glow"
        aria-label="WhatsApp"
        style={{ boxShadow: "0 0 30px rgba(37,211,102,0.6)" }}
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}

// -------------------- FOOTER --------------------

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#7b2eff] shadow-[0_0_20px_rgba(0,212,255,0.5)]">
                <span className="font-display text-sm font-black text-black">V</span>
              </div>
              <div className="font-display text-sm font-bold uppercase tracking-widest text-white">
                Ultimate <span className="text-gradient">VR</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Premium virtual reality entertainment brought straight to your event.
            </p>
          </div>
          <div>
            <div className="font-display text-xs font-bold uppercase tracking-[0.3em] text-white/80">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-[#00d4ff]">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-display text-xs font-bold uppercase tracking-[0.3em] text-white/80">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><a href={`tel:+${PHONE}`} className="hover:text-[#00d4ff]">{DISPLAY_PHONE}</a></li>
              <li><a href={waLink(BOOK_MSG)} target="_blank" rel="noreferrer" className="hover:text-[#00d4ff]">WhatsApp</a></li>
              <li>Email — coming soon</li>
            </ul>
          </div>
          <div>
            <div className="font-display text-xs font-bold uppercase tracking-[0.3em] text-white/80">Follow</div>
            <div className="mt-4 flex gap-3">
              <a href="https://instagram.com/ultimate_vr_experience" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:border-[#00d4ff] hover:text-[#00d4ff]"><Instagram size={16} aria-hidden="true" /></a>
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:border-[#00d4ff] hover:text-[#00d4ff]"><Facebook size={16} aria-hidden="true" /></a>
              <a href={waLink(BOOK_MSG)} target="_blank" rel="noreferrer" aria-label="WhatsApp us" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:border-[#00d4ff] hover:text-[#00d4ff]"><MessageCircle size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <div>© 2026 Ultimate VR Experience. All rights reserved.</div>
          <div>Designed & Developed by <span className="text-[#00d4ff]">Claudex Innovations</span></div>
        </div>
      </div>
    </footer>
  );
}

// -------------------- CURSOR --------------------

function AnimatedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    let raf = 0;
    let next = { x: 0, y: 0 };
    const move = (e: MouseEvent) => {
      next = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(() => { setPos(next); raf = 0; });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);
  if (!visible) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00d4ff] mix-blend-difference lg:block"
      style={{
        left: pos.x,
        top: pos.y,
        transition: "transform 0.1s ease-out",
        boxShadow: "0 0 20px rgba(0,212,255,0.6)",
      }}
    />
  );
}

// -------------------- PAGE --------------------

function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative min-h-dvh bg-[#050505] text-white">
      <a href="#main" className="skip-link">Skip to content</a>
      <LoadingScreen done={loaded} />
      <AnimatedCursor />
      <ParticleBackground />
      <Navbar />
      <main id="main">

        <Hero />
        <About />
        <Games />
        <Gallery />
        <Events />
        <Why />
        <BookingForm />
        <Testimonials />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
