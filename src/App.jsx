import { useEffect, useRef, useState } from 'react'
import data from './data/portfolio.json'
import './styles/main.css'

/* ---------- Hooks & effects ---------- */
function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

// Reveal-on-scroll for any [data-reveal] element
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Mouse-follow spotlight on [data-spotlight] cards
function useSpotlight() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('[data-spotlight]'))
    const onMove = e => {
      const c = e.currentTarget
      const r = c.getBoundingClientRect()
      c.style.setProperty('--mx', `${e.clientX - r.left}px`)
      c.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    cards.forEach(c => c.addEventListener('pointermove', onMove))
    return () => cards.forEach(c => c.removeEventListener('pointermove', onMove))
  }, [])
}

// Soft cursor glow follower (auto-hidden on touch via CSS)
function CursorGlow() {
  useEffect(() => {
    const el = document.createElement('div')
    el.className = 'cursor-glow'
    document.body.appendChild(el)
    let raf = 0
    let x = window.innerWidth / 2, y = window.innerHeight / 2
    let tx = x, ty = y
    const move = e => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18
      el.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); el.remove() }
  }, [])
  return null
}

// Count-up number animation, preserves prefix/suffix (e.g. "30%", "4+", "UK")
function CountUp({ value, className }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(() => {
    const m = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/)
    return m ? `${m[1]}0${m[3]}` : value
  })
  useEffect(() => {
    const m = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/)
    if (!m) { setDisplay(value); return }
    const [, pre, numStr, suf] = m
    const target = parseFloat(numStr)
    const decimals = (numStr.split('.')[1] || '').length
    let started = false
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true
          const dur = 1300, start = performance.now()
          const tick = now => {
            const t = Math.min(1, (now - start) / dur)
            const eased = 1 - Math.pow(1 - t, 3)
            setDisplay(`${pre}${(target * eased).toFixed(decimals)}${suf}`)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.6 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [value])
  return <div ref={ref} className={className}>{display}</div>
}

/* ---------- Building blocks ---------- */
function SectionHeader({ index, kicker, title }) {
  return (
    <div className="section-header" data-reveal>
      <div className="section-index">{index}</div>
      <div className="section-heading-block">
        {kicker && <div className="section-kicker">{kicker}</div>}
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-line" />
    </div>
  )
}

function Nav() {
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <nav className="nav">
        <a href="#top" className="nav-logo" aria-label="Surya Sundar — home">
          surya <b>sundar</b>
        </a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><a href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
          <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
          <li><a href="#experience" onClick={() => setOpen(false)}>Experience</a></li>
          <li><a href="#projects" onClick={() => setOpen(false)}>Work</a></li>
          <li><a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Let's Talk</a></li>
        </ul>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>
    </>
  )
}

function Hero() {
  const { hero, contact, currentRole, client } = data
  return (
    <header className="hero" id="top">
      <div className="hero-badge-row" data-reveal>
        <div className="open-to-work-badge">{hero.badge}</div>
        <div className="hero-loc">📍 {hero.location} · {hero.relocate}</div>
      </div>

      <div className="hero-main">
        <div className="hero-copy" data-reveal>
          <div className="hero-eyebrow">{hero.subtitle}</div>
          <h1 className="hero-name">
            <span className="first">{hero.firstName}</span>
            <span className="last">{hero.lastName}</span>
          </h1>
          <p className="hero-desc">{hero.summary}</p>
          <div className="hero-buttons">
            <a href={`mailto:${contact.email}`} className="btn-primary">Get In Touch</a>
            <a href="#projects" className="btn-secondary">View Work <span>→</span></a>
            <a href={contact.resume} download className="btn-ghost" title="Download Resume">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
          </div>
        </div>

        <div className="hero-photo-col" data-reveal>
          <div className="hero-photo-frame" data-tilt>
            <img src={hero.photo} alt={`${hero.firstName} ${hero.lastName}`} className="hero-photo" />
            <div className="hero-photo-tag"><span className="dot" /> Available for hire</div>
          </div>
          <div className="hero-mini-cards">
            <div className="mini-card" data-spotlight>
              <div className="mini-label">{currentRole.label}</div>
              <div className="mini-title">{currentRole.company}</div>
              <div className="mini-meta">{currentRole.title} · {currentRole.since}</div>
            </div>
            <div className="mini-card" data-spotlight>
              <div className="mini-label">{client.label}</div>
              <div className="mini-title" style={{ color: 'var(--accent)' }}>{client.flag} {client.name}</div>
              <div className="mini-meta">{client.project}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats" data-reveal>
        {hero.stats.map(s => (
          <div key={s.label} className="stat">
            <CountUp value={s.value} className="stat-value" />
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </header>
  )
}

function Marquee() {
  const items = [...data.frontEnd.tags, ...data.backEnd.tags, ...data.database.tags]
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">{t}<span className="marquee-sep">✦</span></span>
        ))}
      </div>
    </div>
  )
}

function ImpactBand() {
  return (
    <section className="impact-band" id="impact" data-reveal>
      {data.impact.map(m => (
        <div key={m.label} className="impact-item" data-spotlight>
          <div className="impact-icon">{m.icon}</div>
          <CountUp value={m.value} className="impact-value" />
          <div className="impact-label">{m.label}</div>
        </div>
      ))}
    </section>
  )
}

function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHeader index="01" kicker="Toolkit" title="Technical Skills" />

      <div className="core-stack">
        {data.coreStack.map((s, i) => (
          <div
            key={s.name}
            className="core-skill"
            data-reveal
            data-spotlight
            style={{ transitionDelay: `${i * 70}ms`, '--sk': s.color }}
          >
            <div className="core-skill-top">
              <span className="core-abbr">{s.abbr}</span>
              <div className="core-skill-id">
                <div className="core-name">{s.name}</div>
                <div className="core-note">{s.note}</div>
              </div>
              <div className="core-level">{s.level}<span>%</span></div>
            </div>
            <div className="core-bar"><span style={{ '--lvl': `${s.level}%` }} /></div>
          </div>
        ))}
      </div>

      <div className="section-subheader">Full Toolkit</div>
      <div className="skills-grid">
        {data.skills.map((s, i) => (
          <div key={s.category} className="skill-card" data-reveal data-spotlight style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="skill-card-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="skill-category">{s.category}</div>
            <div className="skill-tags">
              {s.items.map(item => <span key={item} className="tag">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Domains() {
  return (
    <section className="section domains-section" id="domains">
      <SectionHeader index="02" kicker="Breadth" title="Domains I've Delivered In" />
      <div className="domains-row" data-reveal>
        {data.domains.map(d => (
          <div key={d.name} className="domain-pill" style={{ '--pill': d.color }}>
            <span className="domain-pill-icon">{d.icon}</span>{d.name}
          </div>
        ))}
      </div>
    </section>
  )
}

function ValueProps() {
  return (
    <section className="section" id="why">
      <SectionHeader index="03" kicker="Value" title="Why Hire Me" />
      <div className="value-grid">
        {data.valueProps.map((v, i) => (
          <div key={v.title} className="value-card" data-reveal data-spotlight style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="value-icon">{v.icon}</div>
            <div className="value-title">{v.title}</div>
            <div className="value-desc">{v.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  const highlighted = data.summary
    .replace('Lloyds Bank (UK)', '<strong>Lloyds Bank (UK)</strong>')
    .replace('TCS', '<strong>TCS</strong>')
    .replace('30%', '<strong>30%</strong>')
    .replace('React.js, Node.js, TypeScript', '<strong>React.js, Node.js, TypeScript</strong>')
    .replace('forward-thinking global technology company', '<strong>forward-thinking global technology company</strong>')

  return (
    <section className="section" id="about">
      <SectionHeader index="04" kicker="Profile" title="About" />
      <div className="about-card" data-reveal data-spotlight>
        <div className="about-photo-col">
          <img src={data.hero.photo} alt="" className="about-photo" />
          <div className="about-signature">{data.hero.firstName} {data.hero.lastName}</div>
        </div>
        <div>
          <p className="about-text" dangerouslySetInnerHTML={{ __html: highlighted }} />
          <div className="about-meta">
            <span>🎓 {data.education.degree}, {data.education.institution} ({data.education.year})</span>
            <span>📍 {data.hero.location}</span>
            <span>🗣 {data.additional.languages.join(' · ')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHeader index="05" kicker="Journey" title="Experience" />
      <div className="timeline">
        {data.experience.map(exp => (
          <div key={exp.id} className="timeline-item" data-reveal>
            <div className="timeline-dot" />
            <div className="exp-card" data-spotlight>
              <div className="exp-header">
                <div>
                  <div className="exp-company">{exp.company}</div>
                  <div className="exp-role">{exp.role}</div>
                </div>
                <div className="exp-meta">
                  <div className="exp-period">{exp.period}</div>
                  <div className="exp-location">{exp.location}</div>
                </div>
              </div>
              {exp.client && <div className="exp-client-badge">🏦 Client: {exp.client}</div>}
              <ul className="exp-highlights">
                {exp.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
              <div className="exp-stack">
                {exp.stack.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ p, num }) {
  return (
    <div className={`project-card ${p.featured ? 'featured' : ''}`} data-reveal data-spotlight style={{ '--domain-color': p.domainColor }}>
      <div className="project-num">{num}</div>
      <div className="project-top">
        <div>
          <div className="project-title">{p.title}</div>
          <div className="project-client">{p.client}</div>
        </div>
        <span className="project-domain" style={{ color: p.domainColor, background: p.domainColor + '20', border: `1px solid ${p.domainColor}45` }}>
          {p.domain}
        </span>
      </div>
      <p className="project-desc">{p.description}</p>
      <ul className="project-highlights">
        {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
      </ul>
      <div className="project-stack">
        {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
      </div>
    </div>
  )
}

function Projects() {
  const featured = data.projects.filter(p => p.featured)
  const others = data.projects.filter(p => !p.featured)
  return (
    <section className="section" id="projects">
      <SectionHeader index="06" kicker="Selected Work" title="Key Projects" />
      <div className="projects-grid">
        {featured.map((p, i) => <ProjectCard key={p.id} p={p} num={String(i + 1).padStart(2, '0')} />)}
      </div>
      {others.length > 0 && (
        <>
          <div className="section-subheader">More Work</div>
          <div className="projects-grid">
            {others.map((p, i) => <ProjectCard key={p.id} p={p} num={String(featured.length + i + 1).padStart(2, '0')} />)}
          </div>
        </>
      )}
    </section>
  )
}

function Contact() {
  const { contact, additional } = data
  return (
    <section className="contact-section" id="contact" data-reveal>
      <div className="contact-kicker">07 — Contact</div>
      <h2 className="contact-title">Let's build something<br /><span>worth shipping.</span></h2>
      <p className="contact-sub">{additional.visa}</p>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="contact-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {contact.email}
        </a>
        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="contact-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.58 2.72h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {contact.phone}
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          LinkedIn
        </a>
        {contact.github && (
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="contact-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
            </svg>
            GitHub
          </a>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 Surya Sundar · Crafted with React + Vite</span>
      <span>Bengaluru, India · Open to Global &amp; Indian Opportunities 🌍</span>
    </footer>
  )
}

export default function App() {
  useScrollReveal()
  useSpotlight()
  return (
    <div className="app">
      <CursorGlow />
      <Nav />
      <Hero />
      <Marquee />
      <ImpactBand />
      <Skills />
      <Domains />
      <ValueProps />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
