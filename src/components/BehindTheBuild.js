import React, { useEffect, useRef, useState } from 'react'

// Tools in the orbit (AI last, on purpose) with a one-line "what for".
const TOOLS = [
  { name: 'React', note: 'Interfaces that feel instant' },
  { name: 'Next.js', note: 'Fast, search-friendly sites' },
  { name: 'Angular', note: 'Large, structured front ends' },
  { name: 'Spring Boot', note: 'Solid Java back ends' },
  { name: 'Django', note: 'Python APIs, built quickly' },
  { name: 'AI tools', note: 'Speed, then my own review' },
]

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Subtle 3D tilt that follows the pointer.
function useTilt() {
  const ref = useRef(null)
  const onPointerMove = (e) => {
    if (reduceMotion() || e.pointerType === 'touch') return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--tx', `${(-y * 6).toFixed(2)}deg`)
    el.style.setProperty('--ty', `${(x * 8).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
  }
  const onPointerLeave = () => {
    const el = ref.current
    el.style.setProperty('--tx', '0deg')
    el.style.setProperty('--ty', '0deg')
  }
  return { ref, onPointerMove, onPointerLeave }
}

function useLittleRockTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' }).format(
      new Date()
    )
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 20000)
    return () => clearInterval(id)
  }, [])
  return time
}

function RouteCard() {
  const tilt = useTilt()
  const motionRef = useRef(null)
  const [flown, setFlown] = useState(false)
  const time = useLittleRockTime()
  const fly = () => {
    if (reduceMotion()) return
    setFlown(true)
    try {
      motionRef.current?.beginElement()
    } catch (e) {
      /* SMIL not supported: the static route still reads fine */
    }
  }
  return (
    <article
      {...tilt}
      className="card card--teal card--tilt rv"
      onPointerEnter={fly}
      onClick={fly}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && fly()}
      tabIndex={0}
      aria-label="BVI-born, Little Rock-based. Working with clients anywhere, on Central Time."
    >
      <h3 className="label-lg">BVI-born.<br />Little Rock-based.</h3>
      <svg className="route" viewBox="0 0 300 190" aria-hidden="true">
        <path id="route-path" className="route__path" d="M250 160 C 230 70, 120 40, 60 52" />
        <circle className="route__dot route__dot--from" cx="250" cy="160" r="6" />
        <circle className="route__dot" cx="60" cy="52" r="7" />
        <circle className="route__pulse" cx="60" cy="52" r="7" />
        <g className={`route__plane ${flown ? 'is-on' : ''}`}>
          <circle r="5" />
          <animateMotion ref={motionRef} begin="indefinite" dur="1.6s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" path="M250 160 C 230 70, 120 40, 60 52" />
        </g>
        <text x="250" y="184" textAnchor="middle">BVI</text>
        <text x="60" y="30" textAnchor="middle">Little Rock</text>
      </svg>
      <div className="route__clock">
        <span className="route__live" aria-hidden="true" />
        <span className="label-sm">Little Rock · {time}</span>
      </div>
      <p className="card-body">Working with clients anywhere, on Central Time.</p>
    </article>
  )
}

function OrbitCard() {
  const tilt = useTilt()
  const [active, setActive] = useState(0)
  const tool = TOOLS[active]
  return (
    <article {...tilt} className="card card--tilt rv" style={{ transitionDelay: '90ms' }}>
      <h3 className="label-lg">What I build with</h3>
      <div className="orbit">
        <span className="orbit__ring" aria-hidden="true" />
        <div className="orbit__center" aria-live="polite">
          <span className="orbit__name">{tool.name}</span>
          <span className="orbit__note">{tool.note}</span>
        </div>
        <div className="orbit__spin">
          {TOOLS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`orbit__pill ${t.name === 'AI tools' ? 'orbit__pill--ai' : ''} ${i === active ? 'is-on' : ''}`}
              style={{ '--i': i }}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="card-body">Code first. AI where it helps.</p>
    </article>
  )
}

function ReviewCard() {
  const tilt = useTilt()
  const [run, setRun] = useState(0)
  return (
    <article {...tilt} className="card card--dark card--tilt rv" style={{ transitionDelay: '180ms' }}>
      <h3 className="label-lg">Quality, by hand</h3>
      {/* Re-keying replays the review animation */}
      <div key={run} className="review" aria-hidden="true">
        <span className="review__line review__line--bug" style={{ '--w': '72%', '--d': '0ms' }} />
        <span className="review__line review__line--fix" style={{ '--w': '80%', '--d': '900ms' }} />
        <span className="review__line" style={{ '--w': '58%', '--d': '150ms' }} />
        <span className="review__line review__line--add" style={{ '--w': '64%', '--d': '300ms' }} />
        <span className="review__cursor" />
        <span className="review__badge">✓ Reviewed</span>
      </div>
      <div className="review__foot">
        <p className="card__quote">“Fast is easy now. Right still takes a developer.”</p>
        <button type="button" className="btn-ghost review__run" onClick={() => setRun((n) => n + 1)}>
          {run ? 'Review again' : 'Run review'}
        </button>
      </div>
    </article>
  )
}

export default function BehindTheBuild() {
  return (
    <div className="cards__grid">
      <RouteCard />
      <OrbitCard />
      <ReviewCard />
    </div>
  )
}
