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
    title: 'AI Trading Journal',
    image: aiTradingJournalScreen,
    tags: ['React', 'AI Integration', 'Analytics'],
    link: 'https://trade-drop.vercel.app/',
    badge: 'Beta',
    description:
      'An AI-powered trading journal that logs trades, tags setups, and surfaces patterns with automated insights.',
  },
  {
    title: 'UnWine & Co',
    image: unwineScreen,
    tags: ['AI Development', 'Design', 'Client work'],
    link: 'https://unwine.lovable.app/',
    description:
      'A brand-driven web experience for a wine lounge and artisan bakery, designed to drive reservations through atmosphere.',
  },
  {
    title: 'Guidedly',
    image: guidedlyScreen,
    tags: ['React', 'Design'],
    link: 'https://guidedly.netlify.app/',
    description:
      'An online meditation timer that uses speech to text to create a guided meditation with your own mantras.',
  },
  {
    title: 'Pomonoto',
    image: pomonotoScreen,
    tags: ['React', 'Django', 'User Authentication'],
    link: 'https://pomonoto.netlify.app/',
    description:
      'A Pomodoro timer with a helpful twist: jot down disappearing notes while you work, and see them again on your break.',
  },
  {
    title: 'Cubeplex',
    image: cubeplexScreen,
    tags: ['React', 'E-Commerce', 'Stripe payment'],
    link: 'https://cubeplex.netlify.app/',
    badge: 'Checkout disabled',
    description: 'An e-commerce storefront for The Cubeplex, from product pages through to Stripe checkout.',
  },
  {
    title: "D'Core Paperie",
    image: dcoreScreen,
    tags: ['React', 'Design'],
    link: 'https://dcore.netlify.app/',
    description:
      'A website for a local paperie business, showcasing their services and everything a customer needs to know.',
  },
]

const PROJECT_IMAGES = PROJECTS.map((p) => p.image)

const CARDS = [
  {
    tone: 'teal',
    title: 'From the BVI. Based in Little Rock.',
    big: 'AR',
    body: 'Island roots, Arkansas home base. Working with clients anywhere, on Central Time.',
  },
  {
    title: 'What I build with',
    list: ['AI coding agents', 'React', 'Django', 'Stripe', 'Vercel'],
    body: 'AI handles the speed. I write, read and review the code it touches — so what ships is fast and holds up.',
  },
  {
    title: 'Quality, by hand',
    quote: '“Fast is easy now. Right still takes a developer.”',
    body: 'Every project gets a human code review, testing across screen sizes, and a final pass on the details before it goes live.',
  },
]

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
  const contactRef = useRef(null)
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
      { from_name: emailName, to_name: 'Shanka', message: emailMessage, reply_to: emailAddress },
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

      <Header active={active} sections={{ intro: introRef, work: workRef, contact: contactRef }} />

      <aside className="side-label" aria-hidden="true">
        Shanka — Little Rock, AR
      </aside>

      <main>
        {/* 1 — Hero: the laptop lies closed on the desk */}
        <section ref={introRef} id="intro" className="hero" data-stage="hero">
          <div className="hero__desk" aria-hidden="true" />
          <div className="hero__lockup">
            <p className="tagline rv">Full-stack web developer — Little Rock, AR</p>
            <h1 className="wordmark rv">Shanka</h1>
          </div>
          <p className="hero__intro body-copy rv">
            Hi, I'm Shamarl. I build web apps at AI speed — and check every line like a developer, because I am
            one.
          </p>
          <div className="hero__card rv">
            <h2 className="label-lg">Designed and built by Shamarl Leonard.</h2>
            <hr className="dashed" />
            <p className="card-body">Born in the British Virgin Islands. Building from Little Rock, Arkansas.</p>
          </div>
          <span className="scroll-cue label-sm">
            <span className="scroll-cue__dot" /> Scroll to continue
          </span>
        </section>

        {/* 2 — The lid opens */}
        <section className="beat reveal" data-stage="reveal">
          <h2 className="heading reveal__left rv">
            Isn't just
            <br />a portfolio.
          </h2>
          <p className="body-copy reveal__right rv">
            It's proof of process: ideas taken from first sketch to shipped product, with every step checked by
            hand.
          </p>
          <span className="legal reveal__foot">* Scroll slowly. It's more fun.</span>
        </section>

        {/* 3 — Headline over the open laptop */}
        <section className="beat built" data-stage="built">
          <div className="built__head">
            <h2 className="mega rv">
              Built with AI<sup>*</sup>
            </h2>
            <span className="credit rv">Shanka-1</span>
          </div>
          <p className="built__side label-sm rv">
            Reviewed by a human.
            <br />
            Tested before it ships.
          </p>
          <span className="legal built__foot">* And checked line by line by someone who can actually code.</span>
        </section>

        {/* 4 — Pinned glowing word + project strip */}
        <section className="word" data-stage="word" data-progress>
          <div className="word__pin">
            <span className="label-lg word__kicker">Built AI-fast,</span>
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
            <span className="credit rv">01 / Work</span>
            <h2 className="heading rv">Selected work.</h2>
            <p className="card-body muted rv">Client sites and products I've designed, built and shipped.</p>
          </header>
          {PROJECTS.map((project, i) => (
            <Project key={project.title} index={i} total={PROJECTS.length} {...project} />
          ))}
          <p className="cert-line rv">
            <span className="credit">Credit</span> SEO certification — HubSpot Academy
          </p>
        </div>

        {/* 6 — Light section: the laptop steps aside */}
        <section className="cards" data-stage="away">
          <h2 className="heading rv">Behind the build.</h2>
          <div className="cards__grid">
            {CARDS.map((c, i) => (
              <article key={c.title} className={`card ${c.tone === 'teal' ? 'card--teal' : ''} rv`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3 className="label-lg">{c.title}</h3>
                {c.big && <span className="card__big">{c.big}</span>}
                {c.list && (
                  <ul className="card__pills">
                    {c.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {c.quote && <p className="card__quote">{c.quote}</p>}
                <p className="card-body">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 7 — Contact: the laptop returns, half-closed */}
        <section ref={contactRef} id="contact" className="beat contact" data-stage="contact">
          <div className="contact__main">
            <span className="credit rv">02 / Contact</span>
            <h2 className="mega mega--left rv">
              If I can build this,
              <br />
              imagine what we can build for you.
            </h2>
            <button
              type="button"
              className="btn-pill rv"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              Start a project
            </button>
          </div>
        </section>

        <section className="contact-form-section">
          <h2 className="heading rv">Send a message.</h2>
          <div className="contact__form-wrap">
            <p className="body-copy rv">
              Have a project, a question, or an idea that needs building? Send me a message and I'll get back to
              you.
            </p>
            <form
              ref={formRef}
              className="contact-form rv"
              onSubmit={(e) => {
                e.preventDefault()
                sendEmail()
              }}
            >
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
