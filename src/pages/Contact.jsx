import { useState } from "react";
import useData from "../hooks/useData";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

const mailto = (email, subject, body = "") =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

export default function Contact() {
  const { data, error, loading } = useData("contact");
  const [copied, setCopied] = useState(false);
  if (loading || error) return <Loader error={error} />;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title={data.heading} subtitle={data.subheading} />

      <section className="section pt-0">
        <div className="container">
          {/* Big email panel — no form, just mail */}
          <Reveal>
            <div className="mail-panel">
              <div className="mail-icon">
                <i className="bi bi-envelope-open-heart" />
              </div>
              <p className="mail-label">Write to me at</p>
              <a href={mailto(data.email, data.mailSubject, data.mailBody)} className="mail-address">
                {data.email}
              </a>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <a href={mailto(data.email, data.mailSubject, data.mailBody)} className="btn btn-light btn-lg fw-semibold">
                  <i className="bi bi-send me-2" /> Send an Email
                </a>
                <button onClick={copyEmail} className="btn btn-outline-light btn-lg">
                  <i className={`bi ${copied ? "bi-check2" : "bi-clipboard"} me-2`} />
                  {copied ? "Copied!" : "Copy Email"}
                </button>
              </div>
            </div>
          </Reveal>

          {/* Quick-subject mail cards */}
          <div className="row g-4 mt-2">
            {data.cards.map((c, i) => (
              <div className="col-md-4" key={c.title}>
                <Reveal delay={i * 90} className="h-100">
                  <a href={mailto(data.email, c.subject)} className="glass-card contact-card h-100">
                    <span className="icon-tile">
                      <i className={`bi ${c.icon}`} />
                    </span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                    <span className="contact-arrow">
                      Email me <i className="bi bi-arrow-right" />
                    </span>
                  </a>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="meta-row">
            <span>
              <i className="bi bi-geo-alt" /> {data.location}
            </span>
            <span>
              <i className="bi bi-clock" /> {data.workingHours}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
