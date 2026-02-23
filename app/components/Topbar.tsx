"use client";

import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  CABINET_LOCATION_STORAGE_KEY,
  type CabinetLocation,
  cabinetLocations,
  useCabinetLocation,
} from "@/app/context/CabinetLocationContext";
import { LocationChoiceModal } from "@/app/components/LocationChoiceModal";

const navLinks = [
  { label: "Équipe", href: "#equipe" },
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Localisation", href: "#localisation" },
];

export default function Topbar() {
  const { location, setLocation } = useCabinetLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLocationChoiceModal, setShowLocationChoiceModal] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const closeLocationChoiceModal = () => setShowLocationChoiceModal(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedLocation = window.localStorage.getItem(
      CABINET_LOCATION_STORAGE_KEY
    );
    const hasStoredLocation = cabinetLocations.some(
      (cabinetLocation) => cabinetLocation === storedLocation
    );

    setShowLocationChoiceModal(!hasStoredLocation);
  }, []);

  const handleLocationSelection = (nextLocation: CabinetLocation) => {
    setLocation(nextLocation);
    closeLocationChoiceModal();
  };

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
                  <span className="location-trigger__content">
                    <span className="location-trigger__meta">Cabinet</span>
                    <span className="location-trigger__label">{location}</span>
                  </span>
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

      <LocationChoiceModal
        open={showLocationChoiceModal}
        currentLocation={location}
        onSelectLocation={handleLocationSelection}
      />
    </>
  );
}
