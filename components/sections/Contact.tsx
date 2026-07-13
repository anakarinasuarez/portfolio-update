"use client";

import { useLang, type Lang } from "@/components/i18n/lang";
import { useReveal } from "@/lib/motion";
import { Arrow } from "@/components/ui/Arrow";
import { siteConfig } from "@/lib/site";

type IconType = "linkedin" | "github" | "email" | "link" | "phone";

type Social = [label: string, href: string, icon: IconType];

type ContactCopy = {
  eyebrow: string;
  title: React.ReactNode;
  start: string;
  cvLabel: string;
  socials: Social[];
  loc: string;
};

const EMAIL = "karinasuarezdos@gmail.com";

const CONTACT_COPY: Record<Lang, ContactCopy> = {
  en: {
    eyebrow: "Open to roles · freelance · collaborations",
    title: <>Let&apos;s ship work that<br /><span className="serif-em">moves the number.</span></>,
    start: "Start a conversation",
    cvLabel: "Download CV",
    socials: [["LinkedIn", "https://www.linkedin.com/in/connect-ana-karina-su%C3%A1rez-gonz%C3%A1lez/", "linkedin"], ["GitHub", "https://github.com/anakarinasuarez", "github"], ["Email", "mailto:" + EMAIL, "email"], ["Phone", "tel:" + siteConfig.phone, "phone"]],
    loc: "Seville, Spain — available remote, worldwide · ES (native) · EN (intermediate)",
  },
  es: {
    eyebrow: "Disponible · freelance · colaboraciones",
    title: <>Lancemos algo que<br /><span className="serif-em">mueva el número.</span></>,
    start: "Empecemos a hablar",
    cvLabel: "Descargar CV",
    socials: [["LinkedIn", "https://www.linkedin.com/in/connect-ana-karina-su%C3%A1rez-gonz%C3%A1lez/", "linkedin"], ["GitHub", "https://github.com/anakarinasuarez", "github"], ["Email", "mailto:" + EMAIL, "email"], ["Teléfono", "tel:" + siteConfig.phone, "phone"]],
    loc: "Sevilla, España — disponible en remoto, en todo el mundo · ES (nativo) · EN (intermedio)",
  },
};

function SocialIcon({ type }: { type: IconType }) {
  const p: React.SVGProps<SVGSVGElement> = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, className: "social-ico" };
  if (type === "linkedin") return (
    <svg {...p}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4z" fill="currentColor"/></svg>
  );
  if (type === "github") return (
    <svg {...p}><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" fill="currentColor"/></svg>
  );
  if (type === "email") return (
    <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M4 7l8 5.5L20 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  if (type === "phone") return (
    <svg {...p}><path d="M6.5 3h3l1.5 4-2 1.2a11 11 0 0 0 4.8 4.8l1.2-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  );
  return (
    <svg {...p}><path d="M9.5 14.5l5-5M8 8.5H6.5a3.5 3.5 0 0 0 0 7H8M16 8.5h1.5a3.5 3.5 0 0 1 0 7H16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const { lang } = useLang();
  const c = CONTACT_COPY[lang];
  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="wrap contact-inner">
        <div className="eyebrow reveal"><span className="status-dot" /> {c.eyebrow}</div>
        <h2 className="contact-title reveal" data-delay="60">{c.title}</h2>
        <a href={"mailto:" + EMAIL} className="contact-email reveal" data-delay="120">
          {EMAIL} <Arrow size={22} />
        </a>
        <div className="contact-actions reveal" data-delay="180">
          <a href={"mailto:" + EMAIL} className="btn btn-primary">{c.start} <Arrow /></a>
        </div>
        <div className="cv-row reveal" data-delay="220">
          <a
            href={siteConfig.cv[lang]}
            className="cv-btn"
            download={`Ana Karina Suárez González — CV ${lang.toUpperCase()}.pdf`}
          >
            {c.cvLabel} <Arrow size={13} />
          </a>
        </div>
        <ul className="contact-socials reveal" data-delay="280">
          {c.socials.map(([n, h, ico]) => (
            <li key={n}><a href={h} target="_blank" rel="noreferrer"><SocialIcon type={ico} />{n}</a></li>
          ))}
        </ul>
        <p className="contact-loc reveal" data-delay="340">{c.loc}</p>
      </div>
    </section>
  );
}
