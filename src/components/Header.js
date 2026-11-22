import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BLOG_URL = 'https://shankatech.hashnode.dev/'

// On the home page, Intro/Work/Contact scroll to their section.
// On other pages (e.g. /resume) they link back to the home page section.
const Header = ({ active, sections }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const onHome = Boolean(sections)

  const go = (key) => {
    setMenuOpen(false)
    sections[key]?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const items = [
    { key: 'intro', label: 'Intro' },
    { key: 'work', label: 'Work' },
    { key: 'resume', label: 'Résumé', to: '/resume' },
    { key: 'blog', label: 'Blog', href: BLOG_URL },
    { key: 'contact', label: 'Contact' },
  ]

  const cls = (key) => `nav__item ${active === key ? 'is-active' : ''}`

  const renderItem = (item) => {
    if (item.href) {
      return (
        <a key={item.key} className="nav__item" href={item.href} target="_blank" rel="noopener noreferrer">
          {item.label}
        </a>
      )
    }
    if (item.to || !onHome) {
      const to = item.to || (item.key === 'intro' ? '/' : `/#${item.key}`)
      return (
        <Link
          key={item.key}
          className={cls(item.key)}
          to={to}
          aria-current={active === item.key ? 'page' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          {item.label}
        </Link>
      )
    }
    return (
      <button
        key={item.key}
        type="button"
        className={cls(item.key)}
        aria-current={active === item.key ? 'true' : undefined}
        onClick={() => go(item.key)}
      >
        {item.label}
      </button>
    )
  }

  return (
    <header className={`nav ${menuOpen ? 'nav--open' : ''}`}>
      {onHome ? (
        <button type="button" className="nav__logo" onClick={() => go('intro')}>
          Shanka
        </button>
      ) : (
        <Link className="nav__logo" to="/">
          Shanka
        </Link>
      )}

      <button
        type="button"
        className="nav__toggle label-sm"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>

      <nav className="nav__items" aria-label="Main">
        {items.map(renderItem)}
      </nav>
    </header>
  )
}

export default Header
