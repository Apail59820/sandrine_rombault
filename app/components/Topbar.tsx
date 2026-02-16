"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  cabinetLocations,
  useCabinetLocation,
} from "@/app/context/CabinetLocationContext";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "A Propos", href: "#a-propos" },
  { label: "Équipe", href: "#equipe" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Topbar() {
  const { location, setLocation } = useCabinetLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="topbar" id="accueil">
        <div className="topbar__backdrop" aria-hidden="true" />
        <div className="topbar__frame">
          <div className="topbar__row topbar__row--primary">
            <a
              className="brand"
              href="#accueil"
              aria-label="Cabinet Sandrine Rombaut"
            >
              <span className="brand__text">
                <span className="brand__name">Sandrine Rombaut</span>
                <span className="brand__descriptor">Cabinet d&apos;ergothérapie</span>
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
              <DropdownMenu.Root modal={false}>
                <DropdownMenu.Trigger
                  className="location-trigger"
                  aria-label="Choisir le cabinet"
                >
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
                    {cabinetLocations.map((item) => (
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

      <style jsx global>{`
        .topbar {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 120;
          isolation: isolate;
          background: rgba(248, 244, 240, 0.82);
          backdrop-filter: blur(18px) saturate(170%);
          border-bottom: none;
          box-shadow: 0 26px 56px rgba(60, 47, 42, 0.14);
          overflow: hidden;
        }

        .topbar::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 20px;
          background: radial-gradient(
            60% 120% at 50% 0%,
            rgba(192, 139, 123, 0.28),
            rgba(169, 183, 166, 0.2) 40%,
            transparent 75%
          );
          opacity: 0.8;
          filter: blur(6px);
          transform: translateY(40%);
        }

        .topbar a {
          color: inherit;
          text-decoration: none;
        }

        .topbar__backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              600px 260px at 10% 10%,
              rgba(192, 139, 123, 0.2),
              transparent 70%
            ),
            radial-gradient(
              520px 220px at 90% 20%,
              rgba(169, 183, 166, 0.24),
              transparent 70%
            ),
            linear-gradient(
              120deg,
              rgba(255, 255, 255, 0.75),
              rgba(255, 255, 255, 0)
            );
          opacity: 0.9;
        }

        .topbar__frame {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          padding: 18px 28px 14px;
          display: grid;
          gap: 14px;
        }

        .topbar__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .topbar__row--primary {
          flex-wrap: wrap;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .brand__text {
          display: inline-flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .brand__name {
          font-size: clamp(1.25rem, 1.1rem + 1vw, 1.8rem);
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.1;
          white-space: nowrap;
          color: #3b2f2a;
        }

        .brand__descriptor {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: clamp(0.6rem, 0.55rem + 0.3vw, 0.78rem);
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #6f625b;
          white-space: nowrap;
        }

        .brand__descriptor::before {
          content: "";
          width: 32px;
          height: 1px;
          background: rgba(60, 47, 42, 0.28);
        }

        .topbar__actions {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-left: auto;
        }

        .nav {
          display: inline-flex;
          align-items: center;
          gap: 14px 18px;
          flex-wrap: wrap;
          justify-content: center;
          flex: 1 1 auto;
          margin-inline: clamp(16px, 5vw, 72px);
          padding: 0;
          border-radius: 0;
          border: none;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
        }

        .nav__link {
          position: relative;
          font-size: 0.94rem;
          font-weight: 500;
          color: #6f625b;
          padding: 9px 12px;
          border-radius: 999px;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .nav__link::after {
          content: "";
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 6px;
          height: 2px;
          background: linear-gradient(90deg, #c08b7b, #a9b7a6);
          transform: scaleX(0.2);
          transform-origin: left;
          opacity: 0;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .nav__link:hover,
        .nav__link:focus-visible {
          color: #3b2f2a;
          background: rgba(60, 47, 42, 0.05);
          transform: translateY(-1px);
          box-shadow: inset 0 0 0 1px rgba(60, 47, 42, 0.08);
          outline: none;
        }

        .nav__link:hover::after,
        .nav__link:focus-visible::after {
          transform: scaleX(1);
          opacity: 1;
        }

        .location-trigger {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 6px;
          border-radius: 0;
          border: none;
          background: transparent;
          color: #3b2f2a;
          font-weight: 600;
          cursor: pointer;
          box-shadow: none;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            color 0.2s ease;
        }

        .location-trigger__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c08b7b, #a9b7a6);
          box-shadow: 0 0 0 4px rgba(192, 139, 123, 0.18);
        }

        .location-trigger__label {
          letter-spacing: 0.01em;
        }

        .location-trigger:hover,
        .location-trigger:focus-visible {
          transform: translateY(-1px);
          box-shadow: inset 0 -1px 0 rgba(60, 47, 42, 0.28);
          outline: none;
        }

        .chevron {
          width: 10px;
          height: 10px;
          border-right: 2px solid currentColor;
          border-bottom: 2px solid currentColor;
          transform: rotate(45deg);
          margin-top: -2px;
          opacity: 0.6;
        }

        .location-menu {
          min-width: 200px;
          padding: 10px 12px;
          border-radius: 16px;
          background: rgba(253, 249, 246, 0.9);
          border: none;
          box-shadow: 0 24px 60px rgba(60, 47, 42, 0.22);
          backdrop-filter: blur(22px) saturate(160%);
          display: grid;
          gap: 6px;
          animation: fadeUp 0.2s ease;
          z-index: 160;
          position: relative;
        }

        .location-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 6px;
          border-radius: 0;
          font-weight: 500;
          color: #6f625b;
          cursor: pointer;
          background: transparent;
          transition:
            color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .location-item:hover,
        .location-item:focus-visible {
          color: #3b2f2a;
          transform: translateY(-1px);
          box-shadow: inset 0 -1px 0 rgba(60, 47, 42, 0.25);
          outline: none;
        }

        .location-item.is-active {
          color: #3b2f2a;
          font-weight: 600;
          box-shadow: inset 0 -1px 0 rgba(60, 47, 42, 0.32);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(135deg, #c08b7b, #a9b7a6);
        }

        .menu-toggle {
          display: none;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(60, 47, 42, 0.08);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.96),
            rgba(252, 248, 244, 0.9)
          );
          color: #3b2f2a;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 12px 26px rgba(60, 47, 42, 0.14);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        }

        .menu-toggle:hover,
        .menu-toggle:focus-visible {
          transform: translateY(-1px);
          box-shadow: 0 18px 36px rgba(60, 47, 42, 0.18);
          border-color: rgba(192, 139, 123, 0.35);
          outline: none;
        }

        .menu-toggle__icon {
          position: relative;
          display: grid;
          gap: 4px;
        }

        .menu-toggle__icon span {
          display: block;
          width: 18px;
          height: 2px;
          background: currentColor;
          border-radius: 999px;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .menu-toggle[data-open="true"] .menu-toggle__icon span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .menu-toggle[data-open="true"] .menu-toggle__icon span:nth-child(2) {
          opacity: 0;
        }

        .menu-toggle[data-open="true"] .menu-toggle__icon span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        .mobile-panel {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(-8px);
          transition:
            max-height 0.3s ease,
            opacity 0.3s ease,
            transform 0.3s ease;
          background: rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          backdrop-filter: blur(16px) saturate(150%);
        }

        .mobile-panel[data-open="true"] {
          max-height: 360px;
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-nav {
          display: grid;
          gap: 10px;
          padding: 18px 28px 28px;
        }

        .mobile-nav__link {
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 14px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          font-weight: 600;
          color: #6f625b;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .mobile-nav__link:hover,
        .mobile-nav__link:focus-visible {
          background: rgba(47, 109, 246, 0.08);
          color: #3b2f2a;
          outline: none;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .topbar__frame {
            gap: 12px;
          }

          .nav--desktop {
            order: 3;
            flex-basis: 100%;
            justify-content: flex-start;
            margin-inline: 0;
          }

          .topbar__actions {
            order: 2;
          }

          .nav__link {
            padding: 8px 10px;
          }
        }

        @media (max-width: 860px) {
          .nav--desktop {
            display: none;
          }

          .menu-toggle {
            display: inline-flex;
          }
        }

        @media (max-width: 640px) {
          .topbar__frame {
            padding: 16px 20px 12px;
          }

          .brand__name {
            font-size: 1.15rem;
            white-space: normal;
          }

          .topbar__actions {
            width: 100%;
            justify-content: space-between;
            margin-left: 0;
          }

          .brand__descriptor {
            letter-spacing: 0.18em;
            white-space: normal;
          }

          .brand__descriptor::before {
            content: none;
          }

          .menu-toggle__label {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .topbar *,
          .location-menu,
          .mobile-panel {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
