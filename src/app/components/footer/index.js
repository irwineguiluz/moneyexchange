import React from 'react';

const links = [{
  'url': '#',
  'label': 'Home',
}, {
  'url': '#about-us',
  'label': 'About us',
}, {
  'url': '#currencies',
  'label': 'Currencies',
}];

const socialNetworks = {
  'title': 'Follow us',
  'url': '#follow',
  'icons': [{
    'url': '#instagram',
    'label': 'IG',
  }, {
    'url': '#facebook',
    'label': 'FB',
  }, {
    'url': '#twitter',
    'label': 'TW',
  }],
};

const Footer = () => (
  <footer className="footer__container">
    <div className="footer__wrapper">
      <div className="footer__sections-wrapper">
        {links.map((link, index) => (
          <div key={index} className="footer-section">
            <h3 className="title">
              <a className="anchor" href={link.url}>{link.label}</a>
            </h3>
            <p>
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>
        ))}
        <div className="footer-section">
          <h3 className="title">
            <a className="anchor" href={socialNetworks.url}>{socialNetworks.title}</a>
          </h3>
          <div className="social-networks">
            {socialNetworks.icons.map((icon, index) => (
              <a
                key={index}
                href={icon.url}
                className="social-network__item"
              >{icon.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;