import data from './data/portfolio.json'
import './styles/main.css'

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">surya<span>.</span>dev</div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact" className="nav-cta">Hire Me</a></li>
      </ul>
    </nav>
  )
}

function Hero() {
  const { hero, contact, uaeBadge, currentRole, client, techStack } = data

  return (
    <div className="hero-grid">
      {/* Left panel */}
      <div className="hero-left">
        <div className="open-to-work-badge">{hero.badge}</div>

        <h1 className="hero-name">
          <span className="first">{hero.firstName}</span>
          <span className="last">{hero.lastName}</span>
        </h1>

        <p className="hero-subtitle">
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{hero.title}</strong>
          {' · '}{hero.subtitle}
        </p>

        <div className="hero-tags">
          {hero.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="hero-buttons">
          <a href={`mailto:${contact.email}`} className="btn-primary">Get In Touch</a>
          <a href="#projects" className="btn-secondary">
            View Projects <span>→</span>
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
        {/* Current Role */}
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

        {/* Client */}
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

        {/* Tech Stack */}
        <div className="info-card">
          <div className="section-label">{techStack.label}</div>
          <div className="stack-tags">
            {techStack.tags.map(t => <span key={t} className="tag accent">{t}</span>)}
          </div>
        </div>

        {/* UAE Badge */}
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
        <p className="about-text" dangerouslySetInnerHTML={{ __html: highlighted }} />
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
      <div className="exp-list">
        {data.experience.map(exp => (
          <div key={exp.id} className="exp-card">
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
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-header">
        <h2 className="section-title">Key Projects</h2>
        <div className="section-line" />
      </div>
      <div className="projects-grid">
        {data.projects.map(p => (
          <div
            key={p.id}
            className="project-card"
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
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const { contact } = data
  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title">Let's <span>Work Together</span></h2>
      <p className="contact-sub">
        Available for UAE / Dubai opportunities · Open to visa sponsorship & relocation
      </p>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="contact-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          {contact.email}
        </a>
        <a href={`tel:${contact.phone.replace(/\s/g,'')}`} className="contact-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.58 2.72h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          {contact.phone}
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <span>© 2025 Surya Sundar · Built with React + Vite</span>
      <span>Bengaluru, India · Open to UAE 🇦🇪</span>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
