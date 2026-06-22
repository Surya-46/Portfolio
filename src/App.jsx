import { useEffect, useState } from 'react'
import data from './data/portfolio.json'
import './styles/main.css'

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (scrolled / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

function Nav() {
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <nav className="nav">
        <a href="#top" className="nav-logo">surya<span>.</span>dev</a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
          <li><a href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
          <li><a href="#experience" onClick={() => setOpen(false)}>Experience</a></li>
          <li><a href="#projects" onClick={() => setOpen(false)}>Projects</a></li>
          <li><a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Hire Me</a></li>
        </ul>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>
    </>
  )
}

function Hero() {
  const { hero, contact, uaeBadge, currentRole, client, frontEnd, backEnd, database } = data

  return (
    <div className="hero-grid" id="top">
      {/* Left panel */}
      <div className="hero-left">
        <div className="open-to-work-badge">{hero.badge}</div>

        <div className="hero-identity">
          <div className="hero-photo-wrap">
            <img src={hero.photo} alt={`${hero.firstName} ${hero.lastName}`} className="hero-photo" />
            <span className="hero-photo-ring" />
          </div>
          <div>
            <h1 className="hero-name">
              <span className="first">{hero.firstName}</span>
              <span className="last">{hero.lastName}</span>
            </h1>
            <p className="hero-subtitle">
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{hero.title}</strong>
              {' · '}{hero.subtitle}
            </p>
          </div>
        </div>

        <p className="hero-desc">{hero.summary}</p>

        <div className="hero-tags">
          {hero.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="hero-buttons">
          <a href={`mailto:${contact.email}`} className="btn-primary">Get In Touch</a>
          <a href="#projects" className="btn-secondary">
            View Projects <span>→</span>
          </a>
          <a href={contact.resume} download className="btn-secondary btn-icon" title="Download Resume">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>

        <div className="hero-stats">
          {hero.stats.map(s => (
            <div key={s.label} className="stat">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="hero-right">
        <div className="info-card">
          <div className="section-label">{currentRole.label}</div>
          <div className="info-card-header">
            <div className="info-card-icon">💼</div>
            <div>
              <div className="info-card-title">{currentRole.title}</div>
              <div className="info-card-meta">{currentRole.company} · {currentRole.since}</div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="section-label">{client.label}</div>
          <div className="info-card-header">
            <div className="info-card-icon">{client.flag}</div>
            <div>
              <div className="info-card-title" style={{ color: '#4F8EF7' }}>{client.name}</div>
              <div className="info-card-meta">{client.project}</div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className='skills-list'>
            <div className="section-label">{frontEnd.label}</div>
            <div className="stack-tags">
              {frontEnd.tags.map(t => <span key={t} className="tag accent">{t}</span>)}
            </div>
          </div>
          <div className='skills-list'>
            <div className="section-label">{backEnd.label}</div>
            <div className="stack-tags">
              {backEnd.tags.map(t => <span key={t} className="tag accent">{t}</span>)}
            </div>
          </div>
          <div className='skills-list'>
            <div className="section-label">{database.label}</div>
            <div className="stack-tags">
              {database.tags.map(t => <span key={t} className="tag accent">{t}</span>)}
            </div>
          </div>
        </div>

        <div className="info-card uae-card">
          <div className="uae-inner">
            <div className="uae-flag-circle">{uaeBadge.flag}</div>
            <div>
              <div className="uae-title">{uaeBadge.title}</div>
              <div className="uae-sub">{uaeBadge.subtitle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ValueProps() {
  return (
    <section className="section" id="why">
      <div className="section-header">
        <h2 className="section-title">Why Hire Me</h2>
        <div className="section-line" />
      </div>
      <div className="value-grid">
        {data.valueProps.map(v => (
          <div key={v.title} className="value-card">
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
  const summary = data.summary
  const highlighted = summary
    .replace('Lloyds Bank (UK)', '<strong>Lloyds Bank (UK)</strong>')
    .replace('TCS', '<strong>TCS</strong>')
    .replace('30%', '<strong>30%</strong>')
    .replace('React.js, Node.js, TypeScript', '<strong>React.js, Node.js, TypeScript</strong>')
    .replace('Dubai-based technology company', '<strong>Dubai-based technology company</strong>')

  return (
    <section className="section" id="about">
      <div className="section-header">
        <h2 className="section-title">About</h2>
        <div className="section-line" />
      </div>
      <div className="about-card">
        <img src={data.hero.photo} alt="" className="about-photo" />
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

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-header">
        <h2 className="section-title">Technical Skills</h2>
        <div className="section-line" />
      </div>
      <div className="skills-grid">
        {data.skills.map(s => (
          <div key={s.category} className="skill-card">
            <div className="skill-category">{s.category}</div>
            <div className="skill-tags">
              {s.items.map(item => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-header">
        <h2 className="section-title">Experience</h2>
        <div className="section-line" />
      </div>
      <div className="timeline">
        {data.experience.map(exp => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-dot" />
            <div className="exp-card">
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

              {exp.client && (
                <div className="exp-client-badge">
                  🏦 Client: {exp.client}
                </div>
              )}

              <ul className="exp-highlights">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <div className="exp-stack">
                {exp.stack.map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ p }) {
  return (
    <div
      className={`project-card ${p.featured ? 'featured' : ''}`}
      style={{ '--domain-color': p.domainColor + '15' }}
    >
      <div className="project-top">
        <div>
          <div className="project-title">{p.title}</div>
          <div className="project-client">{p.client}</div>
        </div>
        <span
          className="project-domain"
          style={{
            color: p.domainColor,
            background: p.domainColor + '18',
            border: `1px solid ${p.domainColor}30`
          }}
        >
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
      <div className="section-header">
        <h2 className="section-title">Key Projects</h2>
        <div className="section-line" />
      </div>
      <div className="projects-grid">
        {featured.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>
      {others.length > 0 && (
        <>
          <div className="section-subheader">More Work</div>
          <div className="projects-grid">
            {others.map(p => <ProjectCard key={p.id} p={p} />)}
          </div>
        </>
      )}
    </section>
  )
}

function Contact() {
  const { contact, additional } = data
  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title">Let's <span>Work Together</span></h2>
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
      <span>© 2026 Surya Sundar · Built with React + Vite</span>
      <span>Bengaluru, India · Open to UAE 🇦🇪</span>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <ValueProps />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
