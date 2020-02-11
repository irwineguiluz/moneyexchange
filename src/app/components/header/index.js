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
}, {
  'url': '#follow',
  'label': 'Follow us',
}];

const Header = () => (
  <header className="header__container">
    <div className="header__wrapper">
      <div className="header__logo">money<span>X</span>change</div>
    </div>
    <div className="nav__container">
      <div className="nav__wrapper">
        <nav className="nav__menu">
        {links.map((link, index) => (
          <a
            key={index}
            className="nav__menu-item"
            href={link.url}
          ><div>{link.label}</div></a>
        ))}
        </nav>
      </div>
    </div>
  </header>
);

export default Header;