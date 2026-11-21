import React, { useState } from 'react'

const BLOG_URL = 'https://shankatech.hashnode.dev/'

const Header = ({ active, sections }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (key) => {
    setMenuOpen(false)
    sections[key]?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const items = [
    { key: 'intro', label: 'Intro' },
    { key: 'work', label: 'Work' },
    { key: 'blog', label: 'Blog', href: BLOG_URL },
    { key: 'contact', label: 'Contact' },
  ]

  return (
    <header className={`nav ${menuOpen ? 'nav--open' : ''}`}>
      <button type="button" className="nav__logo" onClick={() => go('intro')}>
        Shanka
      </button>

      <button
        type="button"
        className="nav__toggle label-sm"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>

      <nav className="nav__items" aria-label="Main">
        {items.map((item) =>
          item.href ? (
            <a key={item.key} className="nav__item" href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ) : (
            <button
              key={item.key}
              type="button"
              className={`nav__item ${active === item.key ? 'is-active' : ''}`}
              aria-current={active === item.key ? 'true' : undefined}
              onClick={() => go(item.key)}
            >
              {item.label}
            </button>
          )
        )}
      </nav>
    </header>
  )
}

export default Header
