import React from 'react'

// One story beat per project. The persistent laptop shows the screenshot;
// the <img> here is only a fallback for devices without WebGL.
const Project = ({ title, description, image, tags, link, badge, badges, index }) => {
  const side = index % 2 === 0 ? 'left' : 'right'
  const labels = badges || (badge ? [badge] : [])
  return (
    <section className={`beat project project--${side}`} data-stage={`project-${index}`}>
      <div className="project__text">
        {labels.length > 0 && (
          <span className="label-sm badges rv">
            {labels.map((b, i) => (
              <span key={b} className={`badge ${i === 0 && badges ? 'badge--strong' : ''}`}>{b}</span>
            ))}
          </span>
        )}
        <h3 className="heading rv">{title}.</h3>
        <p className="body-copy rv">{description}</p>
        <ul className="tags rv">
          {tags.map((tag) => (
            <li key={tag} className="label-sm">{tag}</li>
          ))}
        </ul>
        {link && (
          <a className="btn-ghost rv" href={link} target="_blank" rel="noopener noreferrer">
            Visit site ↗
          </a>
        )}
        <img className="project__fallback" src={image} alt={`${title} screenshot`} loading="lazy" />
      </div>
    </section>
  )
}

export default Project
