import { useEffect, useRef, useState } from "react";

const portfolioData = {
  name: "Marcos Lopez Ortego",
  initials: "MLO",
  title: "Backend Developer | Java & Spring Boot | Business Applications & Data",
  tagline: "Building clear, useful, and maintainable business applications for real users.",
  summary: [
    "I am a backend developer with formal training in Multiplatform Application Development, focused on building business-oriented applications with Java and Spring Boot.",
    "I have delivered real projects that combine layered web architectures, data analysis dashboards, and practical integrations in environments with end users.",
    "I enjoy collaborating with non-technical stakeholders and iterating solutions through continuous feedback to maximize clarity, reliability, and long-term maintainability."
  ],
  philosophy: "Technology should make complex operations feel simple for the people who use them.",
  yearsActive: 3,
  stats: [
    { value: "3+", label: "Years Active" },
    { value: "4", label: "Core Roles" },
    { value: "12+", label: "Technologies Used" },
    { value: "2", label: "Languages" }
  ],
  experience: [
    {
      company: "Kanori",
      role: "Founder & Software Developer",
      dates: "Apr 2026 - Present",
      description: "Leading venture development while designing software solutions with a business-first approach and direct user value in mind.",
      type: "venture"
    },
    {
      company: "HISZPANIA DE LUXE",
      role: "Automation & Workflow Engineer (No-Code / Make)",
      dates: "Mar 2026 - Present",
      description: "Designed and optimized workflow automations across CRM, email marketing, payments, databases, and internal systems to reduce manual operations and improve end-user experience.",
      type: "work"
    },
    {
      company: "Universidad de Burgos",
      role: "Software / Data Developer Intern - Observatorio de Turismo",
      dates: "May 2025 - Jun 2025",
      description: "Built a data-analysis web application and integrated interactive Power BI dashboards, collaborating with non-technical profiles through iterative feedback cycles.",
      type: "work"
    },
    {
      company: "IP365",
      role: "IT / Systems Intern",
      dates: "Mar 2024 - Jun 2024",
      description: "Configured Windows servers and network systems, maintained security camera infrastructure, and resolved complex technical incidents across heterogeneous enterprise environments.",
      type: "work"
    }
  ],
  projects: [
    {
      name: "Tourism Intelligence Dashboard",
      description: "Decision-support web platform combining operational data with embedded Power BI dashboards for institutional users.",
      tech: ["Java", "Spring Boot", "JPA", "Power BI"],
      link: "https://marcoslopezortego.netlify.app/",
      type: "product"
    },
    {
      name: "Event Operations Automation System",
      description: "Automated participant workflows, segmented communications, and data synchronization to scale international event operations with fewer manual steps.",
      tech: ["Make", "CRM", "Databases", "Email"],
      link: "https://www.linkedin.com/in/marcos-l%C3%B3pez-ortego-537736218",
      type: "client"
    }
  ],
  stack: {
    frontend: [
      { name: "HTML5", slug: "html5" },
      { name: "CSS3", slug: "css3" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Power BI", slug: "powerbi" }
    ],
    backend: [
      { name: "Java", slug: "openjdk" },
      { name: "Spring Boot", slug: "springboot" },
      { name: "Hibernate", slug: "hibernate" },
      { name: "SAP", slug: "sap" }
    ],
    infrastructure: [
      { name: "Windows Server", slug: "windows" },
      { name: "MySQL", slug: "mysql" },
      { name: "PostgreSQL", slug: "postgresql" }
    ],
    tools: [
      { name: "Git", slug: "git" },
      { name: "LinkedIn", slug: "linkedin" },
      { name: "Make", slug: "make" },
      { name: "Visual Studio Code", slug: "visualstudiocode" }
    ]
  },
  contact: {
    email: "mailto:marcosloport@gmail.com",
    linkedin: "https://www.linkedin.com/in/marcos-l%C3%B3pez-ortego-537736218",
    github: "#"
  },
  availability: {
    status: "Open to junior backend opportunities",
    location: "Warsaw, Poland",
    response: "Replies within 24h"
  }
};

export default function PortfolioApp({ projects = [], blogPosts = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef(null);
  const [iconFallbacks, setIconFallbacks] = useState({});

  useEffect(() => {
    const fontHref =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,600&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap";
    if (!document.querySelector('link[data-fonts="portfolio-fonts"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = fontHref;
      link.setAttribute("data-fonts", "portfolio-fonts");
      document.head.appendChild(link);
    }

    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-style", "portfolio-style");
    styleTag.textContent = `
      :root { --bg: #F9F9F7; --bg-grid: rgba(0, 0, 0, 0.055); --ink: #0C0C0C; --ink-muted: #6B6B6B; --ink-ghost: rgba(12, 12, 12, 0.07); --border: #D8D8D4; --white: #FFFFFF; --accent: #7A6A48; --xs: 11px; --sm: 13px; --base: 15px; --md: 18px; --lg: 22px; --xl: 28px; --2xl: 36px; --3xl: 48px; --4xl: 64px; --hero: clamp(56px, 9vw, 96px); }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background-color: #F9F9F7; background-image: linear-gradient(rgba(0,0,0,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.055) 1px, transparent 1px); background-size: 28px 28px; background-attachment: fixed; color: var(--ink); overflow-x: hidden; }
      body.menu-locked { overflow: hidden; }
      a { color: inherit; text-decoration: none; }
      .portfolio-root { font-family: "DM Sans", "Sohne", sans-serif; letter-spacing: 0.01em; }
      .container { width: min(1200px, calc(100vw - 80px)); margin: 0 auto; }
      .label { font-family: "JetBrains Mono", monospace; font-size: var(--xs); letter-spacing: 0.12em; text-transform: uppercase; }
      .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1); }
      .nav { position: fixed; top: 0; left: 0; right: 0; height: 56px; border-bottom: 1px solid var(--border); backdrop-filter: blur(8px); background: rgba(249, 249, 247, 0.85); z-index: 40; }
      .nav-row { height: 100%; display: flex; justify-content: space-between; align-items: center; }
      .nav-initials { font-family: "JetBrains Mono", monospace; font-size: var(--sm); font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; }
      .nav-links { display: flex; gap: 28px; }
      .nav-link { position: relative; font-family: "JetBrains Mono", monospace; font-size: var(--xs); letter-spacing: 0.12em; text-transform: uppercase; padding-bottom: 4px; }
      .nav-link::after, .text-link::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px; background: var(--ink); transform: scaleX(0); transform-origin: left; transition: transform 0.2s ease; }
      .nav-link:hover::after, .text-link:hover::after { transform: scaleX(1); }
      .menu-toggle { display: none; border: 0; background: transparent; font-family: "JetBrains Mono", monospace; font-size: var(--xs); letter-spacing: 0.12em; text-transform: uppercase; padding: 0; cursor: pointer; min-height: 44px; }
      .menu-overlay { position: fixed; inset: 0; background: rgba(249, 249, 247, 0.98); z-index: 50; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 22px; transform: translateX(100%); transition: transform 0.3s ease; }
      .menu-overlay.open { transform: translateX(0); }
      .menu-overlay a { font-family: "JetBrains Mono", monospace; font-size: var(--md); text-transform: uppercase; letter-spacing: 0.12em; }
      section { position: relative; }
      .hero { min-height: 100vh; display: flex; align-items: center; padding-top: 56px; border-bottom: 1px solid var(--border); }
      .hero-inner { position: relative; width: 100%; max-width: 980px; margin: 0 auto; padding: 56px 0 70px; }
      .hero-name { margin: 0; max-width: 11ch; font-family: "Cormorant Garamond", serif; font-weight: 600; font-style: italic; letter-spacing: -0.02em; font-size: var(--hero); line-height: 0.92; }
      .hero-role { margin-top: 18px; font-family: "JetBrains Mono", monospace; font-size: var(--sm); text-transform: uppercase; letter-spacing: 0.12em; }
      .hero-status { margin-top: 22px; display: inline-flex; gap: 10px; align-items: center; border: 1px solid var(--border); background: #FFFFFF; padding: 8px 12px; font-family: "JetBrains Mono", monospace; font-size: var(--xs); text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink-muted); }
      .hero-status-dot { width: 6px; height: 6px; background: var(--accent); }
      .hero-tagline { max-width: 700px; margin-top: 20px; color: var(--ink-muted); font-size: var(--md); line-height: 1.65; }
      .button-row { margin-top: 34px; display: flex; gap: 14px; }
      .btn-primary, .btn-ghost, .arrow-btn { min-height: 44px; border-radius: 0; cursor: pointer; position: relative; transition: transform 0.18s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.18s cubic-bezier(0.34, 1.4, 0.64, 1), background 0.18s ease, color 0.18s ease; }
      .btn-primary, .btn-ghost { padding: 13px 32px; font-family: "JetBrains Mono", monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
      .btn-primary { background: #0C0C0C; color: #F9F9F7; border: 1.5px solid #0C0C0C; }
      .btn-primary:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0px #0C0C0C; }
      .btn-primary:active { transform: translate(-1px, -1px); box-shadow: 2px 2px 0px #0C0C0C; }
      .btn-ghost { background: transparent; color: #0C0C0C; border: 1.5px solid #0C0C0C; }
      .btn-ghost:hover { background: #0C0C0C; color: #F9F9F7; transform: translate(-3px, -3px); box-shadow: 5px 5px 0px rgba(0,0,0,0.25); }
      .btn-ghost:active { transform: translate(-1px, -1px); box-shadow: 2px 2px 0px rgba(0,0,0,0.2); }
      .hero-watermark { position: absolute; right: -2vw; bottom: 18px; font-family: "Cormorant Garamond", serif; font-size: 20vw; font-weight: 600; color: var(--ink-ghost); letter-spacing: -0.02em; pointer-events: none; user-select: none; }
      .hero-rule { margin-top: 56px; width: 100%; height: 1px; background: var(--border); position: relative; }
      .scroll-dot { position: absolute; right: 0; top: -2px; width: 28px; height: 5px; background: var(--ink); }
      .about, .experience, .projects, .blog, .contact { padding: 110px 0; }
      .trust-strip { margin-top: 28px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 10px 0; display: flex; flex-wrap: wrap; gap: 18px; font-family: "JetBrains Mono", monospace; font-size: var(--xs); letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); }
      .trust-strip span { position: relative; padding-left: 14px; }
      .trust-strip span::before { content: ""; position: absolute; left: 0; top: 6px; width: 6px; height: 6px; background: var(--accent); }
      .about-grid { display: grid; grid-template-columns: 55% 45%; gap: 48px; }
      .section-title { font-family: "Cormorant Garamond", serif; font-size: var(--3xl); letter-spacing: -0.02em; font-weight: 600; margin: 0 0 30px; }
      .section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px; margin-bottom: 12px; }
      .section-head .section-title { margin-bottom: 0; }
      .section-cta { font-family: "JetBrains Mono", monospace; font-size: var(--xs); text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink-muted); }
      .about-copy p { margin: 0 0 18px; font-size: var(--base); color: var(--ink-muted); line-height: 1.7; }
      .philosophy { margin-top: 24px; font-family: "Cormorant Garamond", serif; font-size: var(--lg); font-weight: 600; font-style: italic; letter-spacing: -0.02em; }
      .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px 20px; }
      .stat-value { font-family: "Cormorant Garamond", serif; font-size: var(--3xl); letter-spacing: -0.02em; line-height: 1; }
      .stat-label { margin-top: 7px; font-family: "JetBrains Mono", monospace; font-size: var(--xs); letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }
      .timeline { border-left: 1px solid var(--border); padding-left: 30px; }
      .exp-entry { position: relative; padding: 0 0 36px 16px; transition: transform 0.2s ease; }
      .exp-entry::before { content: ""; width: 4px; height: 4px; background: var(--ink); border-radius: 50%; position: absolute; left: -33px; top: 10px; }
      .exp-entry::after { content: ""; position: absolute; left: -31px; top: 0; width: 1px; height: 100%; background: transparent; transition: background 0.2s ease; }
      .exp-entry:hover { transform: translateX(4px); }
      .exp-entry:hover::after { background: #0C0C0C; }
      .exp-role { margin: 0; font-family: "Cormorant Garamond", serif; font-size: var(--lg); letter-spacing: -0.02em; }
      .exp-dates { margin-top: 6px; font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--ink-muted); }
      .exp-desc { margin-top: 10px; color: var(--ink-muted); line-height: 1.65; font-size: var(--base); }
      .projects-grid { margin-top: 20px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
      .project-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 0; padding: 32px; transition: transform 0.18s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.18s cubic-bezier(0.34, 1.4, 0.64, 1); }
      .project-card:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0px #D8D8D4; }
      .project-no { text-align: right; font-family: "JetBrains Mono", monospace; font-size: var(--xs); opacity: 0.3; color: var(--ink-ghost); }
      .project-title { margin: 8px 0 10px; font-family: "Cormorant Garamond", serif; font-size: 24px; letter-spacing: -0.02em; }
      .project-type { display: inline-block; margin-top: 4px; margin-bottom: 10px; border: 1px solid var(--border); padding: 3px 7px; font-family: "JetBrains Mono", monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); }
      .project-desc { color: var(--ink-muted); font-size: 14px; line-height: 1.6; min-height: 68px; }
      .tag-row { display: flex; gap: 8px; flex-wrap: wrap; margin: 18px 0 22px; }
      .tag { border: 1px solid var(--border); border-radius: 0; padding: 3px 8px; font-size: 10px; font-family: "JetBrains Mono", monospace; }
      .arrow-btn { width: 44px; height: 44px; border: 1.5px solid #0C0C0C; background: transparent; color: #0C0C0C; font-size: 22px; line-height: 1; }
      .arrow-btn:hover { background: #0C0C0C; color: #F9F9F7; transform: translate(-3px, -3px); box-shadow: 5px 5px 0px rgba(0,0,0,0.25); }
      .arrow-btn:active { transform: translate(-1px, -1px); box-shadow: 2px 2px 0px rgba(0,0,0,0.2); }
      .stack-panel { background: #FFFFFF; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 88px 0; }
      .stack-layout { margin-top: 24px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
      .stack-group { margin-top: 0; background: #FFFFFF; border: 1px solid var(--border); padding: 16px; min-height: 128px; }
      .stack-note { margin-top: 7px; font-size: 13px; color: var(--ink-muted); }
      .stack-icons { margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 20px; }
      .tech-item { position: relative; width: 28px; height: 28px; }
      .tech-item img { width: 28px; height: 28px; display: block; filter: grayscale(1); transition: transform 0.15s ease, filter 0.2s ease; }
      .tech-item:hover img { transform: scale(1.12); filter: grayscale(0); }
      .tech-tip { position: absolute; left: 50%; bottom: calc(100% + 8px); transform: translateX(-50%) translateY(4px); background: #0C0C0C; color: #F9F9F7; font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 7px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.15s ease, transform 0.15s ease; }
      .tech-item:hover .tech-tip { opacity: 1; transform: translateX(-50%) translateY(0); }
      .blog-grid { margin-top: 20px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
      .blog-item { background: #FFFFFF; border: 1px solid var(--border); padding: 24px; transition: transform 0.18s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.18s cubic-bezier(0.34, 1.4, 0.64, 1); }
      .blog-item:hover { transform: translate(-3px, -3px); box-shadow: 5px 5px 0px #D8D8D4; }
      .blog-meta { font-family: "JetBrains Mono", monospace; font-size: var(--xs); letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }
      .blog-meta strong { color: var(--accent); font-weight: 500; }
      .blog-title { margin: 10px 0 12px; font-family: "Cormorant Garamond", serif; font-size: var(--xl); letter-spacing: -0.02em; }
      .blog-excerpt { color: var(--ink-muted); font-size: 14px; line-height: 1.6; }
      .contact { text-align: center; }
      .contact-title { margin: 0; font-family: "Cormorant Garamond", serif; font-size: var(--3xl); font-style: italic; font-weight: 600; letter-spacing: -0.02em; }
      .contact-sub { margin-top: 12px; font-family: "JetBrains Mono", monospace; font-size: var(--sm); color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.12em; }
      .contact-socials { margin-top: 26px; display: flex; justify-content: center; gap: 18px; flex-wrap: wrap; }
      .text-link { position: relative; font-family: "JetBrains Mono", monospace; font-size: var(--sm); }
      .empty-state { border: 1px solid var(--border); background: #FFFFFF; padding: 20px; color: var(--ink-muted); font-size: var(--base); }
      @media (max-width: 1024px) { .container { width: min(100vw - 56px, 960px); } }
      @media (max-width: 767px) {
        html, body { background-size: 20px 20px; }
        .container { width: calc(100vw - 32px); }
        .nav-links { display: none; }
        .menu-toggle { display: block; }
        .hero-inner { max-width: 100%; padding: 38px 0 54px; }
        .hero-name { font-size: clamp(38px, 11vw, 64px); }
        .hero-tagline { font-size: 16px; max-width: 100%; }
        .hero-status { margin-top: 18px; }
        .hero-watermark { font-size: 28vw; right: -1vw; }
        .button-row { flex-direction: column; }
        .btn-primary, .btn-ghost { width: 100%; }
        .about, .experience, .projects, .blog, .contact { padding: 80px 0; }
        .about-grid { grid-template-columns: 1fr; gap: 34px; }
        .section-title { font-size: 40px; }
        .section-head { display: block; }
        .philosophy { font-size: 19px; }
        .stat-value { font-size: 38px; }
        .timeline { border-left: 0; padding-left: 0; }
        .exp-entry { border-left: 1px solid var(--border); padding: 10px 0 22px 16px; }
        .exp-entry::before, .exp-entry::after { display: none; }
        .projects-grid { grid-template-columns: 1fr; }
        .project-card { padding: 24px; }
        .stack-panel { padding: 72px 0; }
        .stack-layout { grid-template-columns: 1fr; gap: 16px; }
        .stack-icons { gap: 16px; }
        .tech-item, .tech-item img { width: 24px; height: 24px; }
        .blog-grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      const node = document.querySelector('style[data-style="portfolio-style"]');
      if (node) node.remove();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const targets = rootRef.current?.querySelectorAll("[data-reveal]");
    if (!targets) return;
    targets.forEach((el) => {
      const delay = el.getAttribute("data-delay") || "0";
      el.style.transitionDelay = `${delay}ms`;
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((el) => {
        if (el.isIntersecting) {
          el.target.style.opacity = "1";
          el.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "stack", label: "Stack" },
    { id: "contact", label: "Contact" }
  ];

  const stackNotes = {
    frontend: "Interfaces and client-facing delivery.",
    backend: "Core business logic and system architecture.",
    infrastructure: "Deployment context and data foundations.",
    tools: "Daily workflow and productivity stack."
  };

  const socialLinks = [
    { label: "LinkedIn", href: portfolioData.contact.linkedin },
    { label: "GitHub", href: portfolioData.contact.github },
    { label: "Email", href: portfolioData.contact.email }
  ].filter((item) => item.href && item.href !== "#");

  const getIconSrc = (tech) => {
    if (iconFallbacks[tech.slug]) {
      return "https://cdn.simpleicons.org/github/0C0C0C";
    }
    return `https://cdn.simpleicons.org/${tech.slug}/0C0C0C`;
  };

  return (
    <div className="portfolio-root" ref={rootRef}>
      <header className="nav">
        <div className="container nav-row">
          <div className="nav-initials">{portfolioData.initials}</div>
          <nav className="nav-links">
            {navItems.map((item) => (
              <button key={item.id} type="button" className="nav-link" style={{ border: 0, background: "transparent", cursor: "pointer" }} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen((v) => !v)}>
            Menu
          </button>
        </div>
      </header>

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}>
            {item.label}
          </a>
        ))}
      </div>

      <section className="hero" id="home">
        <div className="container hero-inner">
          <h1 className="hero-name reveal" data-reveal data-delay="0">{portfolioData.name}</h1>
          <div className="hero-role reveal" data-reveal data-delay="90">{portfolioData.title}</div>
          <div className="hero-status reveal" data-reveal data-delay="120">
            <span className="hero-status-dot" />
            {portfolioData.availability.status}
          </div>
          <p className="hero-tagline reveal" data-reveal data-delay="180">{portfolioData.tagline}<br />{portfolioData.summary[0]}</p>
          <div className="button-row reveal" data-reveal data-delay="270">
            <button type="button" className="btn-primary" onClick={() => scrollToSection("projects")}>View Work</button>
            <a className="btn-ghost" href={portfolioData.contact.email}>Get in Touch</a>
          </div>
          <div className="hero-watermark">{portfolioData.yearsActive}</div>
          <div className="hero-rule"><div className="scroll-dot" /></div>
          <div className="trust-strip reveal" data-reveal data-delay="360">
            <span>{portfolioData.availability.location}</span>
            <span>B2/C1 English</span>
            <span>{portfolioData.availability.response}</span>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container about-grid">
          <div className="about-copy">
            <h2 className="section-title reveal" data-reveal data-delay="0">About</h2>
            {portfolioData.summary.map((paragraph, idx) => (
              <p key={paragraph} className="reveal" data-reveal data-delay={(idx + 1) * 90}>{paragraph}</p>
            ))}
            <div className="philosophy reveal" data-reveal data-delay="360">"{portfolioData.philosophy}"</div>
          </div>
          <div className="stat-grid">
            {portfolioData.stats.map((stat, idx) => (
              <div key={stat.label} className="reveal" data-reveal data-delay={idx * 90}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="container">
          <h2 className="section-title reveal" data-reveal data-delay="0">Experience</h2>
          <div className="timeline">
            {portfolioData.experience.map((item, idx) => (
              <article key={`${item.company}-${item.role}`} className="exp-entry reveal" data-reveal data-delay={idx * 90}>
                <h3 className="exp-role">{item.role} - <em style={{ fontStyle: "italic" }}>{item.company}</em></h3>
                <div className="exp-dates">{item.dates}</div>
                <p className="exp-desc">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="container">
          <div className="section-head reveal" data-reveal data-delay="0">
            <h2 className="section-title">Projects & Ventures</h2>
            <a className="section-cta" href="/projects">View all projects</a>
          </div>
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <article key={project.name} className="project-card reveal" data-reveal data-delay={idx * 90}>
                <div className="project-no">{String(idx + 1).padStart(2, "0")}</div>
                <h3 className="project-title">{project.name}</h3>
                <div className="project-type">{project.type || "project"}</div>
                <p className="project-desc">{project.description}</p>
                <div className="tag-row">{project.tech.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
                <a href={project.link} target="_blank" rel="noreferrer"><button type="button" className="arrow-btn" aria-label={`Open ${project.name}`}>→</button></a>
              </article>
            ))}
            {projects.length === 0 && (
              <div className="empty-state reveal" data-reveal data-delay="0">
                Add a project in <code>src/content/projects</code> and it will appear automatically.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="blog" id="blog">
        <div className="container">
          <div className="section-head reveal" data-reveal data-delay="0">
            <h2 className="section-title">Blog</h2>
            <a className="section-cta" href="/blog">Read all notes</a>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post, idx) => (
              <a className="blog-item reveal" data-reveal data-delay={idx * 90} href={post.link} key={post.title}>
                <div className="blog-meta"><strong>Note</strong> · {post.date}</div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
              </a>
            ))}
            {blogPosts.length === 0 && (
              <div className="empty-state reveal" data-reveal data-delay="0">
                Add a post in <code>src/content/blog</code> and it will appear automatically.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="stack-panel" id="stack">
        <div className="container">
          <h2 className="section-title reveal" data-reveal data-delay="0">Tech Stack</h2>
          <div className="stack-layout">
            {Object.entries(portfolioData.stack).map(([group, items], groupIndex) => (
              <div className="stack-group reveal" data-reveal data-delay={groupIndex * 90} key={group}>
                <div className="label">{group}</div>
                <div className="stack-note">{stackNotes[group]}</div>
                <div className="stack-icons">
                  {items.map((tech) => (
                    <div className="tech-item" key={tech.name}>
                      <img
                        src={getIconSrc(tech)}
                        width="28"
                        height="28"
                        alt={tech.name}
                        loading="lazy"
                        onError={() => setIconFallbacks((prev) => ({ ...prev, [tech.slug]: true }))}
                      />
                      <span className="tech-tip">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <h2 className="contact-title reveal" data-reveal data-delay="0">Let's build something.</h2>
          <div className="contact-sub reveal" data-reveal data-delay="90">Available for junior backend and business-application opportunities</div>
          <div style={{ marginTop: "24px" }} className="reveal" data-reveal data-delay="180"><a className="btn-primary" href={portfolioData.contact.email}>Send a Message</a></div>
          <div className="contact-socials reveal" data-reveal data-delay="270">
            {socialLinks.map((social) => (
              <a key={social.label} className="text-link" href={social.href} target={social.label === "Email" ? undefined : "_blank"} rel={social.label === "Email" ? undefined : "noreferrer"}>
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
