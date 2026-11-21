import React, { useEffect, useRef, useState } from 'react'
import { send } from '@emailjs/browser'
import Header from './components/Header'
import Footer from './components/Footer'
import Project from './components/Project'
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
    title: 'Guidedly',
    image: guidedlyScreen,
    tags: ['React', 'Design'],
    link: 'https://guidedly.netlify.app/',
    description:
      'An online meditation timer that uses speech to text to create a guided meditation with your own mantras.',
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

const INTRO = {
  default: {
    heading: 'Designed and built by Shanka Tech.',
    body: 'I design and develop responsive web applications, and I love learning new technologies to bring ideas to life.',
  },
  name: {
    heading: 'From the British Virgin Islands.',
    body: 'My aim in life is to grow every day and enjoy myself in the process.',
    quote: '“Ten out of ten people die, so don’t take life too seriously.” — Henry Winkler',
  },
  job: {
    heading: 'Full-stack, front to back.',
    body: 'Programming isn’t about what you know, it’s about what you can figure out.',
    quote: '“A true master is an eternal student.” — Master Yi',
  },
}

function App() {
  const introRef = useRef(null)
  const workRef = useRef(null)
  const contactRef = useRef(null)
  const [active, setActive] = useState('intro')
  const [introMode, setIntroMode] = useState('default')

  const [emailName, setEmailName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [emailStatus, setEmailStatus] = useState('idle')

  // Track which section is in view for the nav's active indicator.
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

  const intro = INTRO[introMode]

  return (
    <div className="site">
      <Header
        active={active}
        sections={{ intro: introRef, work: workRef, contact: contactRef }}
      />

      <aside className="side-label" aria-hidden="true">
        Shanka — Full-stack developer
      </aside>

      {/* Hero */}
      <section ref={introRef} id="intro" className="hero">
        <div className="hero__lockup">
          <p className="tagline">Responsive web apps, built to last.</p>
          <h1 className="display">
            Hi, I'm{' '}
            <span
              className="hover-word"
              tabIndex={0}
              onMouseEnter={() => setIntroMode('name')}
              onMouseLeave={() => setIntroMode('default')}
              onFocus={() => setIntroMode('name')}
              onBlur={() => setIntroMode('default')}
            >
              Shamarl
            </span>
            <br />
            a full-stack{' '}
            <span
              className="hover-word"
              tabIndex={0}
              onMouseEnter={() => setIntroMode('job')}
              onMouseLeave={() => setIntroMode('default')}
              onFocus={() => setIntroMode('job')}
              onBlur={() => setIntroMode('default')}
            >
              web developer
            </span>
          </h1>
        </div>

        <div className="hero__card" aria-live="polite">
          <h2 className="label-lg">{intro.heading}</h2>
          <hr className="dashed" />
          <p className="card-body">{intro.body}</p>
          {intro.quote && <p className="credit">{intro.quote}</p>}
        </div>

        <button
          type="button"
          className="hero__thumb"
          onClick={() => workRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <img src={aiTradingJournalScreen} alt="" />
          <span className="hero__thumb-meta">
            <span className="label-sm">Latest work</span>
            <span className="label-sm">View ↓</span>
          </span>
        </button>
      </section>

      {/* Work — one void-mode reveal per project */}
      <div ref={workRef} id="work">
        <header className="section-intro">
          <span className="credit">01 / Work</span>
          <h2 className="heading">Selected work.</h2>
        </header>
        {PROJECTS.map((project, i) => (
          <Project key={project.title} index={i} total={PROJECTS.length} {...project} />
        ))}
        <p className="cert-line">
          <span className="credit">Credit</span> SEO certification — HubSpot Academy
        </p>
      </div>

      {/* Contact */}
      <section ref={contactRef} id="contact" className="reveal contact">
        <hr className="dashed reveal__rule" />
        <div className="reveal__left">
          <span className="credit">02 / Contact</span>
          <h2 className="heading">Get in touch.</h2>
          <nav className="socials" aria-label="Social links">
            <a className="text-link" href="https://twitter.com/Shanka26/" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className="text-link" href="https://github.com/Shanka26" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-link" href="https://www.linkedin.com/in/shamarl-l-a70864118" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </div>

        <div className="reveal__right">
          <p className="body-copy">
            Want to talk about work, ask a question, or keep up with what I'm building? Send me a message.
          </p>
          <form
            className="contact-form"
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
              <button type="submit" className="btn-pill" disabled={emailStatus === 'sending'}>
                Send message
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App
