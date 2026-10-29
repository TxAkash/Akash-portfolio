import { Link } from "react-router-dom";
import useData from "../hooks/useData";
import Loader from "../components/Loader";
import Typewriter from "../components/Typewriter";
import Reveal from "../components/Reveal";

export default function Home() {
  const { data, error, loading } = useData("home");
  if (loading || error) return <Loader error={error} />;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="status-pill">
                <span className="dot" /> {data.availability}
              </span>
              <p className="hero-greeting">{data.greeting}</p>
              <h1 className="hero-title">
                {data.name.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-gradient">{data.name.split(" ").slice(-1)}</span>
              </h1>
              <h2 className="hero-role">
                <Typewriter words={data.roles} />
              </h2>
              <p className="lead-text">{data.tagline}</p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to={data.cta.primary.link} className="btn btn-sky btn-lg">
                  {data.cta.primary.label} <i className="bi bi-arrow-right ms-2" />
                </Link>
                <Link to={data.cta.secondary.link} className="btn btn-ghost btn-lg">
                  {data.cta.secondary.label}
                </Link>
              </div>

              <div className="hero-stats">
                {data.stats.map((s) => (
                  <div key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-visual">
                <div className="orbit orbit-1" />
                <div className="orbit orbit-2" />
                <div className="avatar-card">
                  <div className="avatar-initials">AG</div>
                  <h3>{data.name}</h3>
                  <p>
                    <i className="bi bi-geo-alt" /> {data.location}
                  </p>
                </div>
                <div className="float-chip chip-1">
                  <i className="bi bi-filetype-jsx" /> React
                </div>
                <div className="float-chip chip-2">
                  <i className="bi bi-bootstrap" /> Bootstrap
                </div>
                <div className="float-chip chip-3">
                  <i className="bi bi-cart3" /> BigCommerce
                </div>
                <div className="code-card">
                  <span className="c-key">const</span> dev = {"{"}
                  <br />
                  &nbsp;&nbsp;name: <span className="c-str">"Akash"</span>,
                  <br />
                  &nbsp;&nbsp;loves: <span className="c-str">"clean UI"</span>
                  <br />
                  {"}"};
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="marquee" aria-label="Technologies">
        <div className="marquee-track">
          {[...data.techStack, ...data.techStack].map((t, i) => (
            <span key={i} className="marquee-item">
              <i className="bi bi-stars" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow">What I Do</span>
            <h2 className="section-title">Services I offer</h2>
          </div>
          <div className="row g-4">
            {data.services.map((s, i) => (
              <div className="col-md-6 col-lg-3" key={s.title}>
                <Reveal delay={i * 90} className="h-100">
                  <div className="glass-card service-card h-100">
                    <span className="icon-tile">
                      <i className={`bi ${s.icon}`} />
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section pt-0">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Have a project in mind?</h2>
                <p>Let's build something clean, fast and beautiful together.</p>
              </div>
              <Link to="/contact" className="btn btn-light btn-lg fw-semibold">
                Let's Talk <i className="bi bi-send ms-2" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
