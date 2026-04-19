import { useState, useEffect, useRef } from "react";

// ─── FONTS (injected once) ───────────────────────────────────────────────────
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Syne:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── UNSPLASH IMAGE URLS ─────────────────────────────────────────────────────
const IMGS = {
  hero: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=90",
  hero2: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=90",
  epoxy1: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=85",
  epoxy2: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&q=85",
  epoxy3: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=900&q=85",
  epoxy4: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85",
  epoxy5: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85",
  epoxy6: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=900&q=85",
  epoxy7: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=85",
  epoxy8: "https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=900&q=85",
  epoxy9: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85",
  workshop1: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=85",
  workshop2: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&q=85",
  workshop3: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  texture: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1800&q=80",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --gold: #C9A96E;
      --gold-light: #E8D5A3;
      --gold-dark: #8B6914;
      --obsidian: #0A0A0A;
      --charcoal: #111111;
      --surface: #161616;
      --surface2: #1E1E1E;
      --muted: #888;
      --text: #F0EDE8;
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--obsidian);
      color: var(--text);
      font-family: 'Syne', sans-serif;
      overflow-x: hidden;
    }
    ::selection { background: var(--gold); color: var(--obsidian); }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--obsidian); }
    ::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 2px; }

    .font-display { font-family: 'Cormorant Garamond', serif; }
    .font-sans { font-family: 'Syne', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-12px); }
    }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2); opacity: 0; }
    }
    @keyframes lineGrow {
      from { width: 0; }
      to   { width: 100%; }
    }

    .animate-fadeUp    { animation: fadeUp 0.8s ease both; }
    .animate-fadeIn    { animation: fadeIn 0.6s ease both; }
    .animate-float     { animation: float 6s ease-in-out infinite; }
    .animate-shimmer   {
      background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light), var(--gold), var(--gold-dark));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
    .delay-700 { animation-delay: 0.7s; }
    .delay-800 { animation-delay: 0.8s; }

    .glass {
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(201,169,110,0.12);
    }
    .gold-gradient {
      background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light));
    }
    .gold-text {
      background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .noise-overlay::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.4;
    }
    .btn-gold {
      background: linear-gradient(135deg, var(--gold-dark), var(--gold));
      color: var(--obsidian);
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-size: 0.7rem;
      padding: 1rem 2.5rem;
      border: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .btn-gold::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .btn-gold:hover::after { opacity: 1; }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 20px 60px rgba(201,169,110,0.3); }
    .btn-gold span { position: relative; z-index: 1; }

    .btn-outline {
      background: transparent;
      color: var(--gold);
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-size: 0.7rem;
      padding: 0.95rem 2.5rem;
      border: 1px solid rgba(201,169,110,0.5);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-outline:hover {
      border-color: var(--gold);
      background: rgba(201,169,110,0.05);
      box-shadow: 0 0 30px rgba(201,169,110,0.1);
    }

    .img-hover-zoom {
      overflow: hidden;
    }
    .img-hover-zoom img {
      transition: transform 0.7s ease;
    }
    .img-hover-zoom:hover img { transform: scale(1.07); }

    .nav-link {
      font-family: 'Syne', sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(240,237,232,0.6);
      cursor: pointer;
      transition: color 0.3s ease;
      background: none;
      border: none;
      padding: 0;
    }
    .nav-link:hover, .nav-link.active { color: var(--gold); }

    .section-label {
      font-family: 'Syne', sans-serif;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
    }
    .divider {
      width: 48px;
      height: 1px;
      background: linear-gradient(90deg, var(--gold), transparent);
      display: inline-block;
    }

    .input-dark {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(201,169,110,0.15);
      color: var(--text);
      font-family: 'Syne', sans-serif;
      font-size: 0.875rem;
      padding: 1rem 1.25rem;
      width: 100%;
      outline: none;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .input-dark:focus {
      border-color: var(--gold);
      box-shadow: 0 0 20px rgba(201,169,110,0.08);
    }
    .input-dark::placeholder { color: var(--muted); }

    .parallax-text {
      white-space: nowrap;
      overflow: hidden;
    }
  `}</style>
);

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Galerie", "Lucru", "Experiență", "Solicită Ofertă", "Contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? "1rem 2.5rem" : "1.75rem 2.5rem",
          background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.1)" : "none",
          transition: "all 0.4s ease",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}
      >
        <button onClick={() => go("Home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.05em" }}>
              EPOXY LAB
            </span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.55rem", letterSpacing: "0.4em", color: "rgba(201,169,110,0.6)", textTransform: "uppercase" }}>
              FURNITURE SRL
            </span>
          </div>
        </button>

        {/* Desktop */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <button key={l} className={`nav-link ${page === l ? "active" : ""}`} onClick={() => go(l)}>{l}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "none" }}
          className="hamburger"
          aria-label="Menu"
        >
          <div style={{ width: 24, height: 2, background: menuOpen ? "var(--gold)" : "var(--text)", marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: menuOpen ? "var(--gold)" : "var(--text)", marginBottom: 6, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: menuOpen ? "var(--gold)" : "var(--text)", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(10,10,10,0.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "2.5rem"
        }}>
          {links.map(l => (
            <button key={l} className={`nav-link ${page === l ? "active" : ""}`}
              onClick={() => go(l)}
              style={{ fontSize: "1rem", letterSpacing: "0.3em" }}
            >{l}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);

  const stats = [
    { n: "2+", label: "Ani de Experiență" },
    { n: "20+", label: "Exemplare Create" },
    { n: "98%", label: "Statisfacția Clientelei" },
    { n: "∞", label: "Garanție pe Viață" },
  ];

  const reasons = [
    {
      icon: "◈",
      title: "Rășină de calitate artizanală",
      desc: "Folosim exclusiv rășină epoxidică de calitate marină, stabilă la UV, provenită din cele mai performante laboratoare chimice din lume — cu claritate cristalină pentru decenii."
    },
    {
      icon: "◉",
      title: "Selecție de lemn cu margine naturală",
      desc: "Fiecare placă este selectată manual din arbori seculari căzuți natural. Nu există două piese identice. Niciodată."
    },
    {
      icon: "◇",
      title: "Design personalizat",
      desc: "De la pigment la turnare, fiecare decizie îți aparține. Transformăm viziunea ta în sculptură funcțională."
    },
    {
      icon: "△",
      title: "Livrare premium cu servicii complete",
      desc: "Instalare profesionistă, transport cu control climatic și îngrijire post-livrare — perfecțiune la fiecare etapă."
    },
  ];

  const testimonials = [
    {
      quote: "Masa tip „râu” a devenit sufletul sufrageriei noastre. Oaspeții se opresc din vorbit doar ca să o privească.",
      name: "Marius L.",
      role: "Arhitect de interior, Ialomița"
    },
    {
      quote: "Am comandat lucrări de la artizani din toată Europa. Nimic nu se compară cu profunzimea și claritatea unei piese Epoxy Lab.",
      name: "Elena V.",
      role: "Colecționar de artă, Constanța"
    },
    {
      quote: "La trei luni după livrare, oamenii încă fotografiază masa de conferință înainte de începerea ședințelor.",
      name: "Daniel K.",
      role: "Fotograf, Timișoara"
    }
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img
          src={IMGS.hero}
          alt="Epoxy table hero"
          onLoad={() => setHeroLoaded(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.35) saturate(1.2)",
            transition: "opacity 1s ease",
            opacity: heroLoaded ? 1 : 0
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.7) 80%, rgba(10,10,10,1) 100%)"
        }} />

        {/* Floating badge */}
        <div className="animate-float" style={{
          position: "absolute", top: "20%", right: "8%",
          width: 120, height: 120,
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.3)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(201,169,110,0.05)"
        }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "var(--gold)", lineHeight: 1 }}>✦</span>
          <span style={{ fontSize: "0.45rem", letterSpacing: "0.2em", color: "var(--gold-light)", textTransform: "uppercase", marginTop: 4 }}>Premium</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: "0 6% 8%" }}>
          <div className="animate-fadeUp delay-100">
            <span className="section-label">Est. 2025 · Realizat de mână în ROMÂNIA</span>
          </div>
          <h1 className="font-display animate-fadeUp delay-200" style={{
            fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 600, lineHeight: 0.95,
            marginTop: "1rem", maxWidth: 900,
            color: "var(--text)"
          }}>
            Unde<br />
            <span className="gold-text">rășina întâlnește</span><br />
          tradiția.
          </h1>
          <p className="animate-fadeUp delay-400" style={{
            marginTop: "1.5rem", maxWidth: 480, fontSize: "1rem",
            color: "rgba(240,237,232,0.65)", lineHeight: 1.8, fontFamily: "'Syne', sans-serif"
          }}>
            Fiecare masă Epoxy Lab este o piesă unică, de familie. Forjată din lemn vechi și artă lichidă — construită să dăinuie peste generații.
          </p>
          <div className="animate-fadeUp delay-500" style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setPage("Solicită Ofertă")}>
              <span>Cere ofertă</span>
            </button>
            <button className="btn-outline" onClick={() => setPage("Galerie")}>
              Vezi Colecția
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem"
        }}>
          <span style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)", animation: "fadeUp 2s ease infinite" }} />
        </div>
      </section>

      {/* STATS BAND */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "3rem 6%",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem"
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="font-display" style={{ fontSize: "3.5rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.5rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

{/* FEATURED PIECE */}
<section style={{ maxWidth: 1400, margin: "0 auto", padding: "7rem 2%" }}>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

    <div className="img-hover-zoom" style={{ aspectRatio: "4/5", position: "relative" }}>
      <img src={IMGS.epoxy1} alt="Piesă principală" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{
        position: "absolute", bottom: "1.5rem", left: "1.5rem",
        padding: "1rem 1.5rem"
      }} className="glass">
        <div style={{
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)"
        }}>
          Colecția semnătură
        </div>
        <div className="font-display" style={{ fontSize: "1.4rem", marginTop: "0.25rem" }}>
          Masa Pacific River
        </div>
      </div>
    </div>

    <div>
      <span className="section-label">Lucrare recomandată</span>

      <div className="divider" style={{ display: "block", marginTop: "1rem", marginBottom: "2rem" }} />

      <h2 className="font-display" style={{
        fontSize: "clamp(2.5rem, 5vw, 4rem)",
        fontWeight: 600,
        lineHeight: 1.05,
        marginBottom: "1.5rem"
      }}>
        Mobilier care domină orice spațiu în care intră.
      </h2>

      <p style={{
        color: "rgba(240,237,232,0.6)",
        lineHeight: 1.9,
        marginBottom: "2rem"
      }}>
        Fiecare piesă începe ca lemn brut — căzut în urma furtunilor, selectat sustenabil, purtând decenii de poveste în fiecare fibră. Nu construim mobilier. Conservăm moșteniri în rășină și lemn, creând piese centrale care definesc spații pentru generații.
      </p>

      <p style={{
        color: "rgba(240,237,232,0.6)",
        lineHeight: 1.9,
        marginBottom: "2.5rem"
      }}>
        Acceptăm doar 12 comenzi personalizate pe trimestru. Când masa ta va fi finalizată, vei înțelege de ce oamenii așteaptă.
      </p>

      <button className="btn-gold" onClick={() => setPage("Lucru")}>
        <span>Explorează procesul</span>
      </button>
    </div>

  </div>
</section>

      {/* URGENCY BAND */}
      <section style={{
        background: "linear-gradient(135deg, rgba(139,105,20,0.2), rgba(201,169,110,0.08))",
        borderTop: "1px solid rgba(201,169,110,0.2)",
        borderBottom: "1px solid rgba(201,169,110,0.2)",
        padding: "2rem 6%",
        textAlign: "center"
      }}>
        <p className="font-display" style={{ fontSize: "1.4rem", fontStyle: "italic", color: "var(--gold-light)" }}>
          ⚠ Doar <strong style={{ fontStyle: "normal", color: "var(--gold)" }}>3 locuri de comandă</strong> disponibile pentru acest trimestru.
        </p>
      </section>

      {/* WHY US */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "7rem 6%" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label">De ce Epoxy Lab Furniture</span>
          <h2
            className="font-display gold-text"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              marginTop: "1rem"
            }}
          >
            Etalonul la care aspiră ceilalți.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2px" }}>
          {reasons.map((r, i) => (
            <div key={i} className="glass" style={{
              padding: "2.5rem 2rem",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 30px 80px rgba(0,0,0,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "1.5rem", color: "var(--gold)", marginBottom: "1.5rem" }}>{r.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "1rem" }}>{r.title}</h3>
              <p style={{ color: "rgba(240,237,232,0.55)", lineHeight: 1.8, fontSize: "0.875rem" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section style={{ padding: "0 0 7rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 6%", marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <span className="section-label">Evidențe din galerie</span>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, marginTop: "0.75rem" }}>
              Recent Masterpieces
            </h2>
          </div>
          <button className="btn-outline" onClick={() => setPage("Galerie")}>Vezi Toate</button>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "300px 300px",
          gap: 2,
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 6%"
        }}>
          {[
            { img: IMGS.epoxy2, span: "1 / 2 / 3 / 2" },
            { img: IMGS.epoxy3, span: "" },
            { img: IMGS.epoxy4, span: "" },
            { img: IMGS.epoxy5, span: "" },
            { img: IMGS.epoxy6, span: "" },
          ].map((item, i) => (
            <div key={i} className="img-hover-zoom" style={{
              gridArea: item.span || "auto",
              position: "relative",
              cursor: "pointer",
              overflow: "hidden"
            }}
              onClick={() => setPage("Galerie")}
            >
              <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(10,10,10,0)",
                transition: "background 0.3s ease",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(10,10,10,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(10,10,10,0)"; }}
              >
                <span style={{
                  fontFamily: "'Syne', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em",
                  textTransform: "uppercase", color: "var(--gold)", opacity: 0,
                  transition: "opacity 0.3s ease"
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}
                >View</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid rgba(201,169,110,0.08)", padding: "7rem 6%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-label">Vocea Clienților</span>
            <h2
              className="font-display gold-text"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                marginTop: "1rem"
              }}
            >
              Cuvinte care înseamnă totul.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="glass" style={{ padding: "2.5rem" }}>
                <div style={{ color: "var(--gold)", fontSize: "3rem", lineHeight: 1, marginBottom: "1.5rem", fontFamily: "serif" }}>"</div>
                <p className="font-display" style={{ fontSize: "1.15rem", lineHeight: 1.7, fontStyle: "italic", color: "rgba(240,237,232,0.85)", marginBottom: "2rem" }}>
                  {t.quote}
                </p>
                <div style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "1.25rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.25rem", letterSpacing: "0.1em" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ position: "relative", overflow: "hidden", padding: "8rem 2%", textAlign: "center" }}>
        <img src={IMGS.hero2} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", filter: "brightness(0.2) saturate(0.8)"
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--obsidian) 0%, transparent 30%, transparent 70%, var(--obsidian) 100%)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label">Disponibilitate limitată</span>

          <h2 className="font-display" style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            margin: "1.5rem auto 2rem",
            maxWidth: 700
          }}>
            <span className="gold-text">Moștenirea ta este</span><br ></br>
            <span className="gold-text">gata să prindă viață.</span>
          </h2>

          <p style={{
            color: "rgba(240,237,232,0.6)",
            maxWidth: 480,
            margin: "0 auto 3rem",
            lineHeight: 1.9
          }}>
            Alătură-te clienților care au luat decizia ce le-a transformat definitiv locuința. Începe comanda ta astăzi.
          </p>

          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button
              className="btn-gold"
              onClick={() => setPage("Solicită Ofertă")}
              style={{ fontSize: "0.8rem", padding: "1.25rem 3rem" }}
            >
              <span>Începe comanda mea</span>
            </button>

            <button
              className="btn-outline"
              onClick={() => setPage("Contact")}
            >
              Discută cu un meșter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
const GalleryPage = ({ setPage }) => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "River Tables", "Coffee Tables", "Desks", "Consoles"];

  const items = [
    { img: IMGS.epoxy1, title: "Pacific Current", cat: "River Tables", size: 'large' },
    { img: IMGS.epoxy2, title: "Deep Ocean Desk", cat: "Desks", size: 'normal' },
    { img: IMGS.epoxy3, title: "Obsidian Coffee", cat: "Coffee Tables", size: 'normal' },
    { img: IMGS.epoxy4, title: "Turquoise River", cat: "River Tables", size: 'tall' },
    { img: IMGS.epoxy5, title: "Void Console", cat: "Consoles", size: 'normal' },
    { img: IMGS.epoxy6, title: "Copper Veins", cat: "Coffee Tables", size: 'large' },
    { img: IMGS.epoxy7, title: "Glacier Slab", cat: "River Tables", size: 'normal' },
    { img: IMGS.epoxy8, title: "Eclipse Dining", cat: "River Tables", size: 'tall' },
    { img: IMGS.epoxy9, title: "Ember Console", cat: "Consoles", size: 'normal' },
    { img: IMGS.workshop1, title: "Studio Live Edge", cat: "Desks", size: 'normal' },
    { img: IMGS.workshop2, title: "The Artisan Desk", cat: "Desks", size: 'large' },
    { img: IMGS.workshop3, title: "Night Sky Table", cat: "Coffee Tables", size: 'normal' },
  ];

  const filtered = filter === "All" ? items : items.filter(i => i.cat === filter);

  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <span className="section-label">Portofoliul Nostru</span>
          <h1 className="font-display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 600, lineHeight: 0.95, marginTop: "1rem" }}>
            <span className="gold-text">Selecția.</span>
          </h1>
          <p style={{ maxWidth: 480, marginTop: "1.5rem", color: "rgba(240,237,232,0.6)", lineHeight: 1.8 }}>
            Fiecare fotografie reprezintă o comandă unică, imposibil de reprodus — a ta va fi la fel de singulară.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: "0.6rem 1.5rem",
                background: filter === c ? "linear-gradient(135deg, var(--gold-dark), var(--gold))" : "transparent",
                border: "1px solid",
                borderColor: filter === c ? "var(--gold)" : "rgba(201,169,110,0.2)",
                color: filter === c ? "var(--obsidian)" : "rgba(240,237,232,0.6)",
                fontFamily: "'Syne', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >{c}</button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div style={{
          columns: "3 300px",
          columnGap: "1rem",
          gap: "1rem"
        }}>
          {filtered.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="img-hover-zoom"
              style={{
                marginBottom: "1rem",
                breakInside: "avoid",
                position: "relative",
                cursor: "pointer",
                overflow: "hidden"
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  aspectRatio: item.size === 'large' ? '4/5' : item.size === 'tall' ? '3/4' : '4/3'
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.9) 100%)",
                opacity: 0,
                transition: "opacity 0.4s ease",
                display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem"
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}
              >
                <div className="font-display" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text)" }}>{item.title}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginTop: "0.25rem" }}>{item.cat}</div>
                <button className="btn-gold" onClick={() => setPage("Solicită Ofertă")} style={{ marginTop: "1rem", padding: "0.6rem 1.25rem", fontSize: "0.6rem" }}>
                  <span>Comandă o piesă similară</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "5rem", padding: "4rem 2rem", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
          <h2
            className="font-display gold-text"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              marginBottom: "1rem"
            }}
          >
            Inspirat? Piesa ta te așteaptă.
          </h2>
          <p style={{ color: "rgba(240,237,232,0.5)", marginBottom: "2rem" }}>Rămân doar 3 locuri de comandă disponibile pentru acest trimestru.</p>
          <button className="btn-gold" onClick={() => setPage("Solicită Ofertă")}>
            <span>Începe-ți comanda ta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── WORK PAGE ────────────────────────────────────────────────────────────────
const WorkPage = ({ setPage }) => {
  const projects = [
    {
      title: "The Pacific Current",
      subtitle: "Masă tip râu · 112\"x42\"",
      desc: "O placă de Douglas Fir veche de 250 de ani, divizată și umplută cu o rășină epoxidică albastru ocean profund, personalizată. Turnarea a durat 9 zile în 4 etape pentru a atinge o adâncime de 2\". Livrată într-un penthouse din San Francisco.",
      tags: ["Masă tip râu", "Pigment personalizat", "Live edge", "Construcție 8 săptămâni"],
      img: IMGS.epoxy1,
      before: IMGS.workshop1,
      stat1: "8 săptămâni", stat1l: "Timp de execuție",
      stat2: "112\"", stat2l: "Lungime",
    },
    {
      title: "The Void Console",
      subtitle: "Consolă intrare · Nuc & Obsidian",
      desc: "Inspirată de spațiul cosmic. Bază din nuc negru cu inserție de rășină neagră ca cărbune, infuzată cu sclipiri. Picioare metalice tip hairpin finisate mat negru. Acum piesa centrală a unui loft din Manhattan.",
      tags: ["Consolă", "Nuc", "Rășină neagră", "Infuzie cu sclipiri"],
      img: IMGS.epoxy5,
      before: IMGS.workshop2,
      stat1: "5 săptămâni", stat1l: "Timp de execuție",
      stat2: "72\"", stat2l: "Lungime",
    },
    {
      title: "Copper Veins Coffee Table",
      subtitle: "Măsuță cafea · Arțar & cupru",
      desc: "O combinație perfectă de arțar auriu și rășină epoxidică metalică cupru turnată manual. Modelul de vene a fost creat prin înclinarea matriței la unghiuri precise timp de 72 de ore. O piesă de colecție autentică.",
      tags: ["Măsuță cafea", "Arțar", "Cupru metalic", "Piesă de colecție"],
      img: IMGS.epoxy6,
      before: IMGS.workshop3,
      stat1: "6 săptămâni", stat1l: "Timp de execuție",
      stat2: "54\"", stat2l: "Lungime",
    },
  ];

  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 6%" }}>

        {/* Header */}
        <div style={{ marginBottom: "6rem" }}>
          <span className="section-label">Proiecte prezentate</span>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 600,
              lineHeight: 0.95,
              marginTop: "1rem"
            }}
          >
            <span className="gold-text">Lucrările</span><br />
            <span className="gold-text">vorbesc.</span>
          </h1>
        </div>

        {/* Projects */}
        {projects.map((p, i) => (
          <div
            key={i}
            style={{
              marginBottom: "8rem",
              paddingBottom: "8rem",
              borderBottom: i < projects.length - 1
                ? "1px solid rgba(201,169,110,0.1)"
                : "none"
            }}
          >
            {/* Project number */}
            <div style={{ marginBottom: "2rem" }}>
              <span
                className="font-display"
                style={{
                  fontSize: "6rem",
                  fontWeight: 700,
                  color: "rgba(255, 255, 255, 0.46)",
                  lineHeight: 1
                }}
              >
                0{i + 1}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
                alignItems: "start"
              }}
            >

              {/* Text side */}
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 600,
                    lineHeight: 1.05,
                    marginBottom: "0.5rem"
                  }}
                >
                  {p.title}
                </h2>

                <p style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "2rem"
                }}>
                  {p.subtitle}
                </p>

                <p style={{
                  color: "rgba(240,237,232,0.65)",
                  lineHeight: 1.9,
                  marginBottom: "2rem",
                  fontSize: "0.95rem"
                }}>
                  {p.desc}
                </p>

                {/* Tags */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2.5rem"
                }}>
                  {p.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        padding: "0.4rem 1rem",
                        border: "1px solid rgba(201,169,110,0.2)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(240,237,232,0.5)"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div style={{
                  display: "flex",
                  gap: "3rem",
                  marginBottom: "2.5rem"
                }}>
                  <div>
                    <div className="font-display" style={{
                      fontSize: "2.5rem",
                      color: "var(--gold)"
                    }}>
                      {p.stat1}
                    </div>
                    <div style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: "var(--muted)",
                      textTransform: "uppercase"
                    }}>
                      {p.stat1l}
                    </div>
                  </div>

                  <div>
                    <div className="font-display" style={{
                      fontSize: "2.5rem",
                      color: "var(--gold)"
                    }}>
                      {p.stat2}
                    </div>
                    <div style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: "var(--muted)",
                      textTransform: "uppercase"
                    }}>
                      {p.stat2l}
                    </div>
                  </div>
                </div>

                <button className="btn-gold" onClick={() => setPage("Solicită Ofertă")}>
                  <span>Comandă o variantă personalizată</span>
                </button>
              </div>

              {/* Images side */}
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <div className="img-hover-zoom" style={{ marginBottom: "0.5rem" }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      width: "100%",
                      aspectRatio: "4/3",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.5rem"
                }}>

                  <div className="img-hover-zoom">
                    <img
                      src={p.before}
                      alt="proces"
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        objectFit: "cover",
                        display: "block",
                        filter: "brightness(0.7) saturate(0.5)"
                      }}
                    />
                    <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                      <span style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.2em",
                        color: "var(--gold)",
                        textTransform: "uppercase"
                      }}>
                        
                      </span>
                    </div>
                  </div>

                  <div className="img-hover-zoom">
                    <img
                      src={p.img}
                      alt="după"
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
                    <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                      <span style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.2em",
                        color: "var(--gold)",
                        textTransform: "uppercase"
                      }}>
                        
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── EXPERIENCE PAGE ──────────────────────────────────────────────────────────
const ExperiencePage = ({ setPage }) => {
  const timeline = [
    {
      year: "2025",
      title: "Fundația",
      desc: "Epoxy Lab Furniture este înființat oficial ca studio dedicat mobilierului artizanal din rășină epoxidică și lemn cu margine naturală. Primul atelier este amenajat în România, axat pe producție în serii mici și detalii de înaltă precizie."
    },
    {
      year: "2025",
      title: "Primele piese semnătură",
      desc: "Sunt finalizate primele colecții de mese tip râu și console din lemn masiv. Primele comenzi stabilesc rapid reputația brandului pentru precizie, claritate și finisaje premium."
    },
    {
      year: "2025",
      title: "Cerere în creștere",
      desc: "Recomandările și expunerea online duc la o creștere a comenzilor internaționale. Producția rămâne intenționat limitată pentru a menține standardul de calitate."
    },
    {
      year: "2026",
      title: "Sistem de lucru rafinat",
      desc: "Studioul formalizează procesul de design și turnare, introducând tehnici multi-etapă pentru rășină și selecție mai strictă a materialelor pentru consistență premium."
    },
    {
      year: "2026",
      title: "Comenzi internaționale",
      desc: "Epoxy Lab începe livrări de piese personalizate în Europa și America de Nord, introducând servicii de transport premium și instalare profesională."
    },
    {
      year: "2026",
      title: "Extinderea echipei de artizani",
      desc: "O echipă mică de meșteri specializați se alătură studioului, combinând expertiza în lemn, finisaje și rășini pentru a crește capacitatea fără a compromite calitatea."
    },
    {
      year: "2026",
      title: "Standardul este stabilit",
      desc: "Epoxy Lab își definește identitatea: comenzi limitate pe trimestru, atenție obsesivă la detalii și piese de mobilier personalizate, construite ca moșteniri."
    }
  ];

const skills = [
  { name: "Chimie epoxidică", pct: 89 },
  { name: "Prelucrare lemn live edge", pct: 86 },
  { name: "Pigmentare personalizată", pct: 84 },
  { name: "Metalurgie și sudură", pct: 81 },
  { name: "Finisare de suprafață", pct: 91 },
];

  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <span className="section-label">Povestea Noastră</span>
          <h1 className="font-display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 600, lineHeight: 0.95, marginTop: "1rem" }}>
            <span className="gold-text">Măiestrie Creată</span><br /><span className="gold-text">Peste Decenii.</span>
          </h1>
          <p style={{ maxWidth: 560, marginTop: "2rem", color: "rgba(240,237,232,0.6)", lineHeight: 1.9, fontSize: "1rem" }}>
            Măiestria nu se revendică. Se câștigă — pas cu pas, noapte albă cu noapte albă, eșec cu descoperire. Asta suntem noi.
          </p>
        </div>

        {/* Portrait + intro */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "center", marginBottom: "6rem", paddingBottom: "6rem", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
          <div>
            <div className="img-hover-zoom" style={{ aspectRatio: "3/4" }}>
              <img src={IMGS.portrait} alt="Founder" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }} />
            </div>
          </div>
          <div>
            <span className="section-label">Fondatorul</span>
            <h2 className="font-display gold-text" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 600, margin: "1rem 0 1.5rem" }}>Iosif Ștefan</h2>
            <p style={{ color: "rgba(240,237,232,0.65)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
Crescut într-o familie în care lemnul nu era doar material, ci mod de viață, am învățat de mic ce înseamnă răbdarea, precizia și respectul pentru lucru bine făcut.             </p>
            <p style={{ color: "rgba(240,237,232,0.65)", lineHeight: 1.9, marginBottom: "2rem" }}>
În timp, am dus mai departe această moștenire, dar am căutat și o direcție proprie. Descoperirea rășinii epoxidice a fost momentul în care am înțeles că pot îmbina tradiția cu inovația, transformând lemnul masiv în piese cu identitate, nu doar în produse funcționale.
            </p>
            <p style={{ color: "rgba(240,237,232,0.65)", lineHeight: 1.9 }}>
"Nu creez doar mobilier. Creez obiecte care spun o poveste, care rămân în timp și care pot deveni, la rândul lor, parte din istoria unei familii."
            </p>
            <p style={{ marginTop: "1rem", fontStyle: "italic", color: "var(--gold)" }} className="font-display">
              — Iosif Ștefan, Fondator
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: "6rem" }}>
          <div style={{ marginBottom: "3rem" }}>
            <span className="section-label">Evoluție</span>
            <h2 className="font-display gold-text" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, marginTop: "0.75rem" }}>Ani de expertiză</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: 90, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, transparent, var(--gold-dark), var(--gold), var(--gold-dark), transparent)"
            }} />
            {timeline.map((t, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "90px 40px 1fr",
                gap: "0 1.5rem", marginBottom: "3rem", alignItems: "start"
              }}>
                <div style={{ textAlign: "right", paddingTop: "0.25rem" }}>
                  <span className="font-display" style={{ fontSize: "1.8rem", color: "var(--gold-dark)", fontWeight: 700 }}>{t.year}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "0.4rem" }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: "var(--gold)", border: "2px solid var(--gold-light)",
                    boxShadow: "0 0 20px rgba(201,169,110,0.4)"
                  }} />
                </div>
                <div className="glass" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{t.title}</h3>
                  <p style={{ color: "rgba(240,237,232,0.6)", fontSize: "0.875rem", lineHeight: 1.8 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: "5rem", paddingTop: "2rem", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
          <div style={{ marginBottom: "3rem" }}>
            <span className="section-label">Expertiza</span>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, marginTop: "0.75rem" }}>Mastery in Every Medium</h2>
          </div>
          <div style={{ maxWidth: 700 }}>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{s.name}</span>
                  <span style={{ color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>{s.pct}%</span>
                </div>
                <div style={{ height: 2, background: "rgba(255,255,255,0.05)", position: "relative" }}>
                  <div style={{
                    height: "100%", width: `${s.pct}%`,
                    background: "linear-gradient(90deg, var(--gold-dark), var(--gold))",
                    boxShadow: "0 0 10px rgba(201,169,110,0.4)"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "4rem", background: "var(--surface)", border: "1px solid rgba(201,169,110,0.1)" }}>
          <h2 className="font-display gold-text" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>
            Devino parte din poveste
          </h2>
          <p style={{ color: "rgba(240,237,232,0.5)", marginBottom: "2rem" }}>Comanda ta devine parte dintr-o moștenire a excelenței.</p>
          <button className="btn-gold" onClick={() => setPage("Solicită Ofertă")}>
            <span>Creează o piesă unică</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── QUOTE PAGE ─────────────────────────────────────────────────────
const QuotePage = () => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    type: "", 
    dimensions: "", 
    wood: "", 
    color: "", 
    budget: "", 
    timeline: "", 
    notes: "" 
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ paddingTop: "8rem", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 500, padding: "0 2rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "2rem" }}>✦</div>
          <h2 className="font-display" style={{ fontSize: "3rem", fontWeight: 600, marginBottom: "1rem" }}>
            <span className="gold-text">Cererea a fost primită.</span>
          </h2>
          <p style={{ color: "rgba(240,237,232,0.6)", lineHeight: 1.9, marginBottom: "2rem" }}>
            Revizuim personal fiecare cerere de comandă. Veți primi un răspuns de la Luca sau de la un meșter senior în maxim 24 de ore.
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
            Referință: EL-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <span className="section-label">Cerere de Comandă</span>
          <h1 className="font-display" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 600, lineHeight: 0.95, marginTop: "1rem" }}>
            Proiectează-ți<br /><span className="gold-text">Piesa.</span>
          </h1>
          <p style={{ maxWidth: 500, marginTop: "1.5rem", color: "rgba(240,237,232,0.6)", lineHeight: 1.8 }}>
            Completează cât mai multe detalii. Cu cât știm mai multe, cu atât vom putea reda mai precis viziunea ta.
          </p>
        </div>

        {/* Availability notice */}
        <div style={{
          marginBottom: "3rem", padding: "1.25rem 1.5rem",
          borderLeft: "2px solid var(--gold)",
          background: "rgba(201,169,110,0.05)"
        }}>
          <p style={{ fontSize: "0.8rem", color: "var(--gold-light)" }}>
            ⚡ <strong>3 locuri disponibile</strong> în acest trimestru. Timp estimativ de execuție: 6-10 săptămâni.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Nume complet *</label>
              <input className="input-dark" type="text" value={form.name} onChange={set("name")} required placeholder="Numele tău complet" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Email *</label>
              <input className="input-dark" type="email" value={form.email} onChange={set("email")} required placeholder="tu@exemplu.ro" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Telefon</label>
              <input className="input-dark" type="tel" value={form.phone} onChange={set("phone")} placeholder="+40 730 336 655" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Tipul piesei *</label>
              <select 
                className="input-dark" 
                value={form.type} 
                onChange={set("type")} 
                required 
                style={{ 
                  appearance: "none", 
                  background: "rgba(255,255,255,0.03)", 
                  cursor: "pointer" 
                }}
              >
                <option value="" disabled>Alege tipul...</option>
                <option value="river">Masă River / Dining</option>
                <option value="coffee">Masă de cafea</option>
                <option value="desk">Birou / Masă de lucru</option>
                <option value="console">Console / Masă de entry</option>
                <option value="other">Altul / Custom</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Dimensiuni (Lungime x Lățime x Înălțime)</label>
            <input className="input-dark" type="text" value={form.dimensions} onChange={set("dimensions")} placeholder='ex: 2540 mm x 1420 mm x 860 mm' />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Preferință lemn</label>
              <select 
                className="input-dark" 
                value={form.wood} 
                onChange={set("wood")} 
                style={{ 
                  appearance: "none", 
                  background: "rgba(255,255,255,0.03)", 
                  cursor: "pointer" 
                }}
              >
                <option value="">Fără preferință / sugerează-mi</option>
                <option value="walnut">Nuc negru (Black Walnut)</option>
                <option value="maple">Arțar tare (Hard Maple)</option>
                <option value="oak">Stejar alb (White Oak)</option>
                <option value="fir">Brad Douglas (Douglas Fir)</option>
                <option value="cherry">Cireș (Cherry)</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Culoare epoxid / Vibe</label>
              <input className="input-dark" type="text" value={form.color} onChange={set("color")} placeholder="ex: Ocean blue, Negru adânc, Cupru..." />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Buget aproximativ *</label>
              <select 
                className="input-dark" 
                value={form.budget} 
                onChange={set("budget")} 
                required 
                style={{ 
                  appearance: "none", 
                  background: "rgba(255,255,255,0.03)", 
                  cursor: "pointer" 
                }}
              >
                <option value="" disabled>Alege intervalul...</option>
                <option value="3-6k">3.000 - 6.000 €</option>
                <option value="6-12k">6.000 - 12.000 €</option>
                <option value="12-20k">12.000 - 20.000 €</option>
                <option value="20k+">20.000 € +</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Termen dorit</label>
              <select 
                className="input-dark" 
                value={form.timeline} 
                onChange={set("timeline")} 
                style={{ 
                  appearance: "none", 
                  background: "rgba(255,255,255,0.03)", 
                  cursor: "pointer" 
                }}
              >
                <option value="">Flexibil</option>
                <option value="6-8">6-8 săptămâni</option>
                <option value="8-12">8-12 săptămâni</option>
                <option value="12+">12+ săptămâni</option>
                <option value="asap">Cât mai repede posibil</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "3rem" }}>
            <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Note suplimentare / Viziune</label>
            <textarea
              className="input-dark"
              value={form.notes}
              onChange={set("notes")}
              rows={5}
              placeholder="Spune-ne despre spațiul tău, inspirație, stiluri preferate, orice detaliu care ne ajută să înțelegem viziunea ta..."
              style={{ resize: "vertical" }}
            />
          </div>

          <button type="submit" className="btn-gold" style={{ width: "100%", padding: "1.25rem", fontSize: "0.8rem" }}>
            <span>Trimite cererea de comandă →</span>
          </button>
          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--muted)" }}>
            Fără obligație. Vei primi o ofertă detaliată în maxim 24 de ore.
          </p>
        </form>
      </div>
    </div>
  );
};

// ─── CONTACT PAGE ───────────────────────────────────────────────────────────
const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const info = [
    { icon: "✉", label: "Email", value: "hello@epoxylab.com" },
    { icon: "☏", label: "Telefon", value: "+40 730 336 655" },
    { icon: "◎", label: "Locație", value: "87D1 STR. Humorului\nSuceava, RO 727377" },
    { icon: "◷", label: "Program", value: "Luni-Vineri 9:00 - 18:00\nSâmbătă, doar cu programare" },
  ];

  if (sent) {
    return (
      <div style={{ paddingTop: "8rem", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 500, padding: "0 2rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "2rem" }}>✦</div>
          <h2 className="font-display" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            <span className="gold-text">Mesajul a fost trimis.</span>
          </h2>
          <p style={{ color: "rgba(240,237,232,0.6)", lineHeight: 1.9 }}>
            Vă vom contacta în curând. Până atunci, puteți explora colecția noastră.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6%" }}>
        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <span className="section-label">Contactează-ne</span>
          <h1 className="font-display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 600, lineHeight: 0.95, marginTop: "1rem" }}>
            <span className="gold-text">Hai să vorbim</span><br />
            <span className="gold-text">despre meșteșug.</span>
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
          {/* Info */}
          <div>
            <p style={{ color: "rgba(240,237,232,0.65)", lineHeight: 1.9, marginBottom: "3rem", fontSize: "1rem" }}>
              Indiferent dacă ai o viziune completă sau doar o senzație — suntem aici să te ghidăm. 
              Fiecare comandă specială începe cu o conversație.
            </p>

            <div style={{ display: "grid", gap: "2.5rem" }}>
              {info.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "start" }}>
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    border: "1px solid rgba(201,169,110,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.2rem", color: "var(--gold)"
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>{item.label}</div>
                    <div style={{ fontSize: "0.9rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Studio image */}
            <div className="img-hover-zoom" style={{ marginTop: "3rem", aspectRatio: "16/9", position: "relative" }}>
              <img 
                src={IMGS.workshop1} 
                alt="Studio" 
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8)" }} 
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.4), transparent)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>Studio Suceava</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Nume *</label>
                <input className="input-dark" type="text" value={form.name} onChange={set("name")} required placeholder="Numele tău complet" />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Email *</label>
                <input className="input-dark" type="email" value={form.email} onChange={set("email")} required placeholder="tu@exemplu.ro" />
              </div>
              <div style={{ marginBottom: "2.5rem" }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Mesaj *</label>
                <textarea
                  className="input-dark"
                  value={form.message}
                  onChange={set("message")}
                  required
                  rows={7}
                  placeholder="Spune-ne ce ai pe suflet, ce viziune ai sau cum te putem ajuta..."
                  style={{ resize: "vertical" }}
                />
              </div>
              <button type="submit" className="btn-gold" style={{ width: "100%", padding: "1.25rem", fontSize: "0.8rem" }}>
                <span>Trimite mesajul →</span>
              </button>
            </form>

            {/* Social */}
            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>Urmărește meșteșugul</div>
              <div style={{ display: "flex", gap: "1rem" }}>
                {["Instagram", "Pinterest", "Houzz"].map(s => (
                  <div key={s} style={{
                    padding: "0.5rem 1.25rem",
                    border: "1px solid rgba(201,169,110,0.15)",
                    fontSize: "0.65rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", color: "rgba(240,237,232,0.5)",
                    cursor: "pointer", transition: "all 0.3s"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)"; e.currentTarget.style.color = "rgba(240,237,232,0.5)"; }}
                  >{s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{
    background: "var(--charcoal)",
    borderTop: "1px solid rgba(201,169,110,0.1)",
    padding: "4rem 6% 2.5rem"
  }}>
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
            EPOXY LAB
          </div>
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.4em", color: "rgba(201,169,110,0.5)", textTransform: "uppercase", marginBottom: "1.5rem" }}>FURNITURE SRL</div>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: 280 }}>
            Mobilier premium din rășină epoxidică și lemn cu margine naturală, realizat manual în Suceava. Peste 2 ani de măiestrie. Peste 20 de piese livrate.
          </p>
        </div>
        {[
          { title: "Navigate", links: ["Home", "Galerie", "Lucru", "Experiență", "Solicită Ofertă", "Contact"] },
          { title: "Company", links: ["Despre Noi", "Process", "Îngrijire și mentenanță"] },
          { title: "Connect", links: ["Instagram", "Pinterest", "Houzz", "hello@epoxylab.com"] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem", fontWeight: 700 }}>{col.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {col.links.map(l => (
                <span key={l} onClick={() => ["Home", "Galerie", "Lucru", "Experiență", "Solicită Ofertă", "Contact"].includes(l) && setPage(l)}
                  style={{ fontSize: "0.8rem", color: "var(--muted)", cursor: "pointer", transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                >{l}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>
          © 2026 Epoxy Lab Furniture SRL. Toate drepturile rezervate. Suceava, RO.
        </p>
        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>
          Realizat manual cu ✦ în Pacific Northwest  
        </p>
      </div>
    </div>
  </footer>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");

  const pages = {
    Home: <HomePage setPage={setPage} />,
    Galerie: <GalleryPage setPage={setPage} />,
    Lucru: <WorkPage setPage={setPage} />,
    Experiență: <ExperiencePage setPage={setPage} />,
    "Solicită Ofertă": <QuotePage />,
    Contact: <ContactPage />,
  };

  return (
    <div className="noise-overlay">
      <FontInjector />
      <GlobalStyles />
      <Nav page={page} setPage={setPage} />
      <main>{pages[page]}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
