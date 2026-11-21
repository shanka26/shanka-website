import React from 'react'

const Project = ({ title, description, image, tags, link, badge, index, total }) => {
  const number = String(index + 1).padStart(2, '0')
  return (
    <section className="reveal project">
      <hr className="dashed reveal__rule" />

      <div className="reveal__left">
        <span className="label-sm muted">
          {number} / {String(total).padStart(2, '0')}
        </span>
        <h3 className="heading">{title}.</h3>
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag} className="label-sm">{tag}</li>
          ))}
        </ul>
      </div>

      <figure className="reveal__object">
        {badge && <span className="badge label-sm">{badge}</span>}
        <img src={image} alt={`${title} screenshot`} loading="lazy" />
      </figure>

      <div className="reveal__right">
        <p className="body-copy">{description}</p>
        {link && (
          <a className="btn-ghost" href={link} target="_blank" rel="noopener noreferrer">
            Visit site ↗
          </a>
        )}
      </div>
    </section>
  )
}

export default Project
