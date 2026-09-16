import { Link } from "@tanstack/react-router";
import { Menu, Phone, X, MessageCircle, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/mexvtc-data";

const nav = [
  ["Services","/vtc-lyon"],["Aéroport","/vtc-aeroport-lyon"],["Flotte","/notre-flotte"],["Tarifs","/tarifs"],["Destinations","/#destinations"],
];

export function Brand({ light = false }: { light?: boolean }) {
  return <Link to="/" aria-label="MEXVTC — Accueil" className={`inline-flex items-center gap-3 ${light ? "text-hero-foreground" : "text-foreground"}`}>
    <span className="grid size-10 place-items-center border border-current/30 font-display text-lg">M</span>
    <span><strong className="block font-display text-xl leading-none tracking-normal">MEXVTC</strong><span className="mt-1 block text-[9px] uppercase tracking-[.24em] opacity-70">Chauffeur privé</span></span>
  </Link>;
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open,setOpen] = useState(false);
  return <header className={`z-50 w-full ${overlay ? "absolute inset-x-0 top-0 text-hero-foreground" : "border-b border-border bg-background/95 text-foreground"}`}>
    <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:px-8">
      <Brand light={overlay}/>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
        {nav.map(([label,to])=><Link key={label} to={to} className="nav-link text-xs font-semibold uppercase tracking-[.12em]">{label}</Link>)}
        <Button asChild variant={overlay ? "hero" : "default"} size="lg"><Link to="/reserver">Réserver <ArrowUpRight/></Link></Button>
      </nav>
      <Button aria-label="Ouvrir le menu" variant={overlay ? "heroGhost" : "ghost"} size="icon" className="lg:hidden" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button>
    </div>
    {open && <nav className="absolute inset-x-0 top-20 border-y border-border bg-background p-5 text-foreground shadow-2xl lg:hidden" aria-label="Navigation mobile">
      <div className="grid gap-1">{nav.map(([label,to])=><Link key={label} to={to} onClick={()=>setOpen(false)} className="border-b border-border px-2 py-4 text-sm font-semibold uppercase tracking-[.1em]">{label}</Link>)}<Button asChild size="lg" className="mt-4"><Link to="/reserver">Réserver mon trajet</Link></Button></div>
    </nav>}
  </header>;
}

export function MobileBar(){return <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(0,0,0,.14)] backdrop-blur lg:hidden">
  <a href={contact.phoneHref} className="mobile-action"><Phone/>Appeler</a><a href={contact.whatsapp} target="_blank" rel="noreferrer" className="mobile-action"><MessageCircle/>WhatsApp</a><Link to="/reserver" className="mobile-action text-primary"><ArrowUpRight/>Réserver</Link>
</div>}

export function SiteFooter(){return <footer className="bg-ink text-ink-foreground pb-24 lg:pb-0">
  <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid gap-12 border-b border-ink-foreground/15 pb-14 md:grid-cols-2 lg:grid-cols-4">
    <div><Brand light/><p className="mt-6 max-w-xs text-sm leading-7 text-ink-muted">Chauffeur privé à Lyon pour vos transferts aéroport, déplacements professionnels et trajets longue distance.</p></div>
    <FooterGroup title="Navigation" links={[["Réserver","/reserver"],["Nos tarifs","/tarifs"],["Notre flotte","/notre-flotte"],["À propos","/a-propos"]]}/>
    <FooterGroup title="Services" links={[["VTC Lyon","/vtc-lyon"],["Aéroport Lyon","/vtc-aeroport-lyon"],["Entreprise","/vtc-entreprise-lyon"],["Stations de ski","/transfert-stations-ski-alpes"]]}/>
    <div><h2 className="footer-title">Contact</h2><address className="not-italic text-sm leading-7 text-ink-muted"><a href={contact.phoneHref}>{contact.phone}</a><br/><a href={contact.emailHref}>{contact.email}</a><br/><span>{contact.address}</span></address></div>
  </div><div className="flex flex-col gap-3 pt-6 text-xs text-ink-muted sm:flex-row sm:justify-between"><span>© 2026 MEXVTC. Tous droits réservés.</span><div className="flex gap-5"><Link to="/mentions-legales">Mentions légales</Link><Link to="/politique-confidentialite">Confidentialité</Link></div></div></div>
</footer>}
function FooterGroup({title,links}:{title:string;links:string[][]}){return <div><h2 className="footer-title">{title}</h2><ul className="space-y-3 text-sm text-ink-muted">{links.map(([l,t])=><li key={l}><Link to={t} className="transition hover:text-ink-foreground">{l}</Link></li>)}</ul></div>}
export function PageShell({children}:{children:React.ReactNode}){return <><SiteHeader/><main>{children}</main><SiteFooter/><MobileBar/></>}
