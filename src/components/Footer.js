import React from 'react'

const Footer = () => (
  <footer className="footer">
    <hr className="dashed" />
    <div className="footer__row">
      <span className="wordmark-lg">Shanka</span>
      <div className="footer__meta">
        <span className="credit">Built by Shanka Tech</span>
        <a className="text-link" href="mailto:shamarl26leonard@gmail.com">shamarl26leonard@gmail.com</a>
      </div>
    </div>
    <p className="legal">* Copyright © {new Date().getFullYear()} Shanka Tech. All rights reserved.</p>
  </footer>
)

export default Footer
