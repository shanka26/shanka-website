import React, { useEffect, useRef, useState } from 'react'
import { send } from '@emailjs/browser'
import Header from './components/Header'
import Footer from './components/Footer'
import Project from './components/Project'
import StoryCanvas from './story/StoryCanvas'
import pomonotoScreen from './res/pomonotoMock.webp'
import dcoreScreen from './res/dcoreMock.webp'
import cubeplexScreen from './res/cubeplex_mock.jpg'
import guidedlyScreen from './res/guidedlyMock.jpg'
import aiTradingJournalScreen from './res/tradeDropScreen.png'
import unwineScreen from './res/unwine_screenshot.png'
import './App.css'

const PROJECTS = [
  {
    title: 'TradeDrop',
    image: aiTradingJournalScreen,
    tags: ['Next.js', 'OCR', 'OpenAI'],
    link: 'https://trade-drop.vercel.app/',
    badge: 'Beta',
    description: 'Reads trades from screenshots with OCR and AI, then coaches you with insights.',
  },
  {
    title: 'UnWine & Co',
    image: unwineScreen,
    tags: ['Client work', 'Design', 'AI-built'],
    link: 'https://unwine.lovable.app/',
    description: 'A wine lounge and bakery site built to turn atmosphere into reservations.',
  },
  {
    title: 'Guidedly',
    image: guidedlyScreen,
    tags: ['React', 'Text-to-speech'],
    link: 'https://guidedly.netlify.app/',
    description: 'Turns your own mantras into guided meditations.',
  },
  {
    title: 'Pomonoto',
    image: pomonotoScreen,
    tags: ['React', 'Django', 'Auth'],
    link: 'https://pomonoto.netlify.app/',
    description: 'A Pomodoro timer whose notes vanish while you work and return on your break.',
  },
  {
    title: 'Cubeplex',
    image: cubeplexScreen,
    tags: ['React', 'E-commerce', 'Stripe'],
    link: 'https://cubeplex.netlify.app/',
    badge: 'Checkout disabled',
    description: 'A full storefront, from product pages to Stripe checkout.',
  },
  {
    title: "D'Core Paperie",
    image: dcoreScreen,
    tags: ['React', 'Client work'],
    link: 'https://dcore.netlify.app/',
    description: 'A clean showcase site for a local paperie.',
  },
]

const PROJECT_IMAGES = PROJECTS.map((p) => p.image)

const RESUME_URL = `${process.env.PUBLIC_URL}/Shamarl_Leonard_Resume.pdf`

// From the résumé — keep in sync with public/Shamarl_Leonard_Resume.pdf
const EXPERIENCE = [
  {
    when: 'Jun 2023 — Present',
    role: 'Full-stack Software Engineer',
    org: "Dillard's",
    points: [
      '300% faster file processing on critical apps.',
      '~50% less setup time on a rebuilt allocation system, with AI-driven inventory decisions.',
      'Faster SQL through indexing. Test-driven development.',
    ],
  },
  {
    when: '2022 — Present',
    role: 'Web Developer',
    org: 'Independent',
    points: ['Client sites and products. See Work.'],
  },
]

const EDUCATION = [
  { when: '2023', what: 'B.S. Computer Science', where: 'University of Central Arkansas' },
  { when: '2020', what: "Associate's, Computer Studies", where: 'H. Lavity Stoutt Community College, BVI' },
]

// Short on purpose: the full list lives in the PDF.
const SKILLS = [
  { group: 'Frontend', items: ['React', 'Next.js', 'Angular'] },
  { group: 'Backend', items: ['Spring Boot', 'Django', 'SQL', 'MongoDB'] },
  { group: 'Quality', items: ['TDD', 'JUnit', 'Cypress'] },
  { group: 'AI', items: ['OpenAI', 'Lovable', 'v0'] },
]

// Tools shown in the "What I build with" orbit (AI last, on purpose)
const TOOLS = ['React', 'Next.js', 'Angular', 'Spring Boot', 'Django', 'AI tools']

// Fade/slide text in as it enters the viewport.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function App() {
  const introRef = useRef(null)
  const workRef = useRef(null)
  const resumeRef = useRef(null)
  const contactRef = useRef(null)
  const [topic, setTopic] = useState('Project')
  const formRef = useRef(null)
  const [active, setActive] = useState('intro')

  const [emailName, setEmailName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [emailStatus, setEmailStatus] = useState('idle')

  useReveal()

  useEffect(() => {
    const sections = [
      ['intro', introRef],
      ['work', workRef],
      ['resume', resumeRef],
      ['contact', contactRef],
    ]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find(([, ref]) => ref.current === entry.target)
            if (match) setActive(match[0])
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach(([, ref]) => ref.current && observer.observe(ref.current))
    return () => observer.disconnect()
  }, [])

  const sendEmail = () => {
    if (!/\S+@\S+\.\S+/.test(emailAddress) || emailMessage.trim() === '') {
      setEmailStatus('error')
      return
    }
    setEmailStatus('sending')
    send(
      'service_jgqvxe4',
      'template_gi813u2',
      { from_name: emailName, to_name: 'Shanka', message: `[${topic}] ${emailMessage}`, reply_to: emailAddress, topic },
      'PMbuGmUBbitnn0i_o'
    )
      .then(() => {
        setEmailAddress('')
        setEmailName('')
        setEmailMessage('')
        setEmailStatus('sent')
      })
      .catch(() => setEmailStatus('error'))
  }

  return (
    <div className="site">
      <div className="loader" aria-hidden="true">
        <svg viewBox="0 0 120 80" className="loader__mark">
          <rect x="22" y="8" width="76" height="50" rx="4" />
          <rect x="30" y="15" width="60" height="36" rx="1" />
          <path d="M8 64 h104 l-8 8 h-88 z" />
        </svg>
      </div>

      <StoryCanvas projectImages={PROJECT_IMAGES} />

      <Header active={active} sections={{ intro: introRef, work: workRef, resume: resumeRef, contact: contactRef }} />

      <main>
        {/* 1 — Hero: the laptop lies closed on the desk */}
        <section ref={introRef} id="intro" className="hero" data-stage="hero">
          <div className="hero__desk" aria-hidden="true" />
          <div className="hero__lockup">
            <p className="tagline rv">Full-stack software engineer · Little Rock, AR</p>
            <h1 className="wordmark rv">Shanka</h1>
          </div>
          <p className="hero__intro body-copy rv">
            Hi, I'm Shamarl, though most people call me Shanka. I build for the web, for teams and clients.
          </p>
          <div className="hero__card rv">
            <h2 className="label-lg">Designed and built by Shamarl Leonard.</h2>
            <hr className="dashed" />
            <p className="card-body">Scroll to see how.</p>
          </div>
          <span className="scroll-cue label-sm">
            <span className="scroll-cue__dot" /> Scroll to continue
          </span>
        </section>

        {/* 2 — The lid opens */}
        <section className="beat reveal" data-stage="reveal">
          <h2 className="heading reveal__left rv">
            From first
            <br />
            sketch
          </h2>
          <p className="heading reveal__right rv">
            to shipped
            <br />
            product.
          </p>
        </section>

        {/* 3 — Headline over the open laptop */}
        <section className="beat built" data-stage="built">
          <div className="built__head">
            <h2 className="mega rv">
              Built with code<sup>*</sup>
            </h2>
          </div>
          <p className="built__side label-sm rv">
            Clean. Tested.
            <br />
            Reviewed line by line.
          </p>
          <span className="legal built__foot">* And the right AI tools.</span>
        </section>

        {/* 4 — Pinned glowing word + project strip */}
        <section className="word" data-stage="word" data-progress>
          <div className="word__pin">
            <span className="label-lg word__kicker">Built fast,</span>
            <h2 className="word__big">hand-checked</h2>
            <div className="word__strip" aria-hidden="true">
              {PROJECTS.map((p) => (
                <img key={p.title} src={p.image} alt="" />
              ))}
            </div>
            <span className="scroll-cue label-sm">
              <span className="scroll-cue__dot" /> Scroll to continue
            </span>
          </div>
        </section>

        {/* 5 — One beat per project; the laptop screen shows each one */}
        <div ref={workRef} id="work">
          <header className="section-intro">
            <h2 className="heading rv">Selected work.</h2>
          </header>
          {PROJECTS.map((project, i) => (
            <Project key={project.title} index={i} total={PROJECTS.length} {...project} />
          ))}
        </div>

        {/* 6 — Light section: the laptop steps aside */}
        <section className="cards" data-stage="away">
          <h2 className="heading rv">Behind the build.</h2>
          <div className="cards__grid">
            {/* Roots: a dashed route from the BVI to Little Rock */}
            <article className="card card--teal rv">
              <h3 className="label-lg">BVI-born.<br />Little Rock-based.</h3>
              <svg className="route" viewBox="0 0 300 190" aria-hidden="true">
                <path className="route__path" d="M250 160 C 230 70, 120 40, 60 52" />
                <circle className="route__dot route__dot--from" cx="250" cy="160" r="6" />
                <circle className="route__dot" cx="60" cy="52" r="7" />
                <circle className="route__pulse" cx="60" cy="52" r="7" />
                <text x="250" y="184" textAnchor="middle">BVI</text>
                <text x="60" y="30" textAnchor="middle">Little Rock</text>
              </svg>
              <p className="card-body">Working with clients anywhere, on Central Time.</p>
            </article>

            {/* Tools: code first, AI in orbit */}
            <article className="card rv" style={{ transitionDelay: '90ms' }}>
              <h3 className="label-lg">What I build with</h3>
              <div className="orbit" aria-label="React, Next.js, Angular, Spring Boot, Django, and AI tools">
                <span className="orbit__ring" aria-hidden="true" />
                {TOOLS.map((t, i) => (
                  <span key={t} className={`orbit__pill ${t === 'AI tools' ? 'orbit__pill--ai' : ''}`} style={{ '--i': i }}>
                    {t}
                  </span>
                ))}
              </div>
              <p className="card-body">Code first. AI where it helps.</p>
            </article>

            {/* Quality: a mini code review */}
            <article className="card card--dark rv" style={{ transitionDelay: '180ms' }}>
              <h3 className="label-lg">Quality, by hand</h3>
              <div className="review" aria-hidden="true">
                <span className="review__line review__line--del" style={{ '--w': '72%' }} />
                <span className="review__line review__line--add" style={{ '--w': '86%' }} />
                <span className="review__line" style={{ '--w': '58%' }} />
                <span className="review__line review__line--add" style={{ '--w': '64%' }} />
                <span className="review__badge">✓ Reviewed</span>
              </div>
              <p className="card__quote">“Fast is easy now. Right still takes a developer.”</p>
            </article>
          </div>
        </section>

        {/* 7 — Résumé path for hiring teams: the laptop shows a CV */}
        <section ref={resumeRef} id="resume" className="beat experience" data-stage="experience">
          <div className="experience__main">
            <h2 className="heading rv">For hiring teams.</h2>
            <p className="body-copy rv">Full-stack engineer at Dillard's since 2023.</p>
            <div className="experience__actions rv">
              <a className="btn-pill" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                Download résumé (PDF)
              </a>
              <a className="text-link" href="https://www.linkedin.com/in/shamarl-l-a70864118" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="text-link" href="https://github.com/Shanka26" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>

            <h3 className="label-sm muted rv">Experience</h3>
            <ol className="timeline">
              {EXPERIENCE.map((job) => (
                <li key={job.role + job.org} className="timeline__item rv">
                  <span className="label-sm muted timeline__when">{job.when}</span>
                  <div className="timeline__body">
                    <h4 className="label-lg">
                      {job.role} <span className="credit">· {job.org}</span>
                    </h4>
                    <ul className="timeline__points">
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="label-sm muted rv">Education</h3>
            <ol className="timeline">
              {EDUCATION.map((ed) => (
                <li key={ed.what} className="timeline__item rv">
                  <span className="label-sm muted timeline__when">{ed.when}</span>
                  <div className="timeline__body">
                    <h4 className="label-lg">{ed.what}</h4>
                    <p className="card-body muted">{ed.where}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="label-sm muted rv">Skills</h3>
            <dl className="skills rv">
              {SKILLS.map((s) => (
                <div key={s.group} className="skills__row">
                  <dt className="label-sm">{s.group}</dt>
                  <dd>{s.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 8 — Contact: the laptop returns, half-closed */}
        <section ref={contactRef} id="contact" className="beat contact" data-stage="contact">
          <div className="contact__main">
            <h2 className="mega mega--left rv">
              Imagine what we can build together.
            </h2>
          </div>
        </section>

        <section className="contact-form-section">
          <h2 className="heading rv">Let's get to work.</h2>
          <div className="contact__form-wrap">
            <form
              ref={formRef}
              className="contact-form rv"
              onSubmit={(e) => {
                e.preventDefault()
                sendEmail()
              }}
            >
              <fieldset className="topic">
                <legend className="label-sm">About</legend>
                {['Project', 'Job opportunity', 'Something else'].map((t) => (
                  <label key={t} className={`topic__opt ${topic === t ? 'is-on' : ''}`}>
                    <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
                    {t}
                  </label>
                ))}
              </fieldset>
              <label className="field">
                <span className="label-sm">Your name</span>
                <input value={emailName} onChange={(e) => setEmailName(e.target.value)} autoComplete="name" />
              </label>
              <label className="field">
                <span className="label-sm">Your email</span>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  autoComplete="email"
                />
              </label>
              <label className="field">
                <span className="label-sm">Your message</span>
                <textarea rows={4} value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} />
              </label>
              <div className="form-row">
                <span className="label-sm form-status" role="status">
                  {emailStatus === 'error' && 'Please check your details and try again.'}
                  {emailStatus === 'sent' && 'Message sent — thank you.'}
                  {emailStatus === 'sending' && 'Sending…'}
                </span>
                <button type="submit" className="btn-ghost" disabled={emailStatus === 'sending'}>
                  Send message
                </button>
              </div>
            </form>
            <nav className="socials rv" aria-label="Social links">
              <a className="text-link" href="https://twitter.com/Shanka26/" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a className="text-link" href="https://github.com/Shanka26" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="text-link" href="https://www.linkedin.com/in/shamarl-l-a70864118" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </nav>
          </div>
        </section>

        {/* 8 — The laptop closes and sinks away */}
        <div data-stage="footer">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
