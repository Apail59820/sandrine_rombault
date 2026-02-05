"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "A Propos", href: "#a-propos" },
  { label: "Équipe", href: "#equipe" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const locations = ["Carvin", "Haines"] as const;

export default function Topbar() {
  const [location, setLocation] = useState<(typeof locations)[number]>(
    locations[0]
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar" id="accueil">
      <div className="topbar__backdrop" aria-hidden="true" />
      <div className="topbar__frame">
        <div className="topbar__row topbar__row--primary">
          <a className="brand" href="#accueil" aria-label="Cabinet Sandrine Rombaut">
            <span className="brand__text">
              <span className="brand__name">Sandrine Rombaut</span>
              <span className="brand__descriptor">Cabinet d'ergothérapie</span>
            </span>
          </a>

          <nav className="nav nav--desktop" aria-label="Navigation principale">
            {navLinks.map((item) => (
              <a key={item.href} className="nav__link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar__actions">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="location-trigger" aria-label="Choisir le cabinet">
                <span className="location-trigger__dot" aria-hidden="true" />
                <span className="location-trigger__label">{location}</span>
                <span className="chevron" aria-hidden="true" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="location-menu"
                  align="end"
                  sideOffset={12}
                >
                  {locations.map((item) => (
                    <DropdownMenu.Item
                      key={item}
                      className={`location-item${item === location ? " is-active" : ""}`}
                      onSelect={() => setLocation(item)}
                    >
                      <span>{item}</span>
                      {item === location ? (
                        <span className="dot" aria-hidden="true" />
                      ) : null}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <button
              className="menu-toggle"
              type="button"
              data-open={menuOpen ? "true" : "false"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-toggle__label">Menu</span>
              <span className="menu-toggle__icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

      </div>

      <div
        id="mobile-menu"
        className="mobile-panel"
        data-open={menuOpen ? "true" : "false"}
      >
        <nav className="mobile-nav" aria-label="Navigation mobile">
          {navLinks.map((item) => (
            <a
              key={item.href}
              className="mobile-nav__link"
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
