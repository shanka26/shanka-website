import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useReveal from '../useReveal'
import { RESUME_URL, EXPERIENCE, EDUCATION, SKILLS } from '../data/resume'
import '../App.css'

// A simple, recruiter-friendly page. No 3D: fast to load and easy to scan.
export default function Resume() {
  useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
    const prev = document.title
    document.title = 'Résumé | Shamarl Leonard'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="site resume-page">
      <Header active="resume" />

      <main className="resume">
        <header className="resume__head">
          <p className="tagline rv">Résumé</p>
          <h1 className="heading resume__name rv">Shamarl Leonard</h1>
          <p className="body-copy rv">Full-stack software engineer · Little Rock, AR</p>
          <div className="experience__actions rv">
            <a className="btn-pill" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
            <a className="text-link" href="https://www.linkedin.com/in/shamarl-l-a70864118" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="text-link" href="https://github.com/Shanka26" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </header>

        <section className="resume__block">
          <h2 className="label-sm muted rv">Experience</h2>
          <ol className="timeline">
            {EXPERIENCE.map((job) => (
              <li key={job.role + job.org} className="timeline__item rv">
                <span className="label-sm muted timeline__when">{job.when}</span>
                <div className="timeline__body">
                  <h3 className="label-lg">
                    {job.role} <span className="credit">· {job.org}</span>
                  </h3>
                  <ul className="timeline__points">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  {job.org === 'Independent' && (
                    <Link className="text-link" to="/#work">See the work</Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="resume__block">
          <h2 className="label-sm muted rv">Education</h2>
          <ol className="timeline">
            {EDUCATION.map((ed) => (
              <li key={ed.what} className="timeline__item rv">
                <span className="label-sm muted timeline__when">{ed.when}</span>
                <div className="timeline__body">
                  <h3 className="label-lg">{ed.what}</h3>
                  <p className="card-body muted">{ed.where}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="resume__block">
          <h2 className="label-sm muted rv">Skills</h2>
          <dl className="skills rv">
            {SKILLS.map((s) => (
              <div key={s.group} className="skills__row">
                <dt className="label-sm">{s.group}</dt>
                <dd>{s.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="resume__cta rv">
          <Link className="btn-ghost" to="/#contact">Get in touch</Link>
        </p>
      </main>

      <Footer />
    </div>
  )
}
