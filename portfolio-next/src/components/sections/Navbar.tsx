"use client";

import Link from "next/link";
import { SideMenu } from "@/components/ui/SideMenu";
import { useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About",      href: "/about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects",   href: "/#projects" },
  { label: "Contact",    href: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="ds-nav"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left brand */}
        <Link href="/" className="ds-nav-brand">
          <span className="copyright">©</span>
          <span>Mujtaba Saqib</span>
        </Link>

        {/* Right links */}
        <ul className="ds-nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
          </li>
        </ul>
      </motion.nav>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
