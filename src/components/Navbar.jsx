import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useData from "../hooks/useData";

export default function Navbar() {
  const { data } = useData("site");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data) return null;

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="container navbar navbar-expand-lg">
        <Link to="/" className="navbar-brand brand">
          <span className="brand-mark">AG</span>
          <span>{data.brand}<span className="text-sky">{data.brandAccent}</span></span>
        </Link>

        <button
          className="nav-toggle d-lg-none"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`} />
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {data.navLinks.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink to={link.path} end className="nav-link nav-pill">
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <a href={`mailto:${data.email}`} className="btn btn-sky btn-sm px-3">
                <i className="bi bi-envelope-paper me-2" />
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
