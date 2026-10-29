import { Link } from "react-router-dom";
import useData from "../hooks/useData";

export default function Footer() {
  const { data } = useData("site");
  if (!data) return null;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">AG</span>
            <span>{data.brand}<span className="text-sky">{data.brandAccent}</span></span>
          </Link>
          <ul className="footer-links">
            {data.navLinks.map((l) => (
              <li key={l.path}>
                <Link to={l.path}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${data.email}`} className="footer-mail">
            <i className="bi bi-envelope" /> {data.email}
          </a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} · {data.footerText}
        </p>
      </div>
    </footer>
  );
}
