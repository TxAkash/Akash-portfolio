import useData from "../hooks/useData";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

export default function About() {
  const { data, error, loading } = useData("about");
  if (loading || error) return <Loader error={error} />;

  return (
    <>
      <PageHeader eyebrow="Get to know me" title={data.heading} subtitle={data.subheading} />

      {/* BIO */}
      <section className="section pt-0">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7">
              <Reveal className="h-100">
                <div className="glass-card h-100 p-4 p-md-5">
                  <h2 className="card-heading">
                    <i className="bi bi-person-badge text-sky me-2" />
                    Who I am
                  </h2>
                  {data.bio.map((p, i) => (
                    <p key={i} className="body-text">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5">
              <Reveal delay={120} className="h-100">
                <div className="info-card h-100">
                  {data.info.map((item) => (
                    <div className="info-row" key={item.label}>
                      <span>{item.label}</span>
                      <strong>
                        {item.label === "Email" ? (
                          <a href={`mailto:${item.value}`}>{item.value}</a>
                        ) : (
                          item.value
                        )}
                      </strong>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section pt-0">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Skills</span>
            <h2 className="section-title">What I work with</h2>
          </div>
          <div className="row g-4">
            {data.skills.map((s, i) => (
              <div className="col-sm-6 col-lg-3" key={s.name}>
                <Reveal delay={i * 60}>
                  <div className="glass-card skill-card">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="icon-tile sm">
                        <i className={`bi ${s.icon}`} />
                      </span>
                      <span className="skill-pct">{s.level}%</span>
                    </div>
                    <h3>{s.name}</h3>
                    <div className="skill-bar">
                      <span style={{ "--w": `${s.level}%` }} />
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="tool-row">
            <span className="tool-label">Design & tools</span>
            {data.tools.map((t) => (
              <span className="tool-chip" key={t.name}>
                <i className={`bi ${t.icon}`} /> {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section pt-0">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Journey</span>
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="timeline">
            {data.experience.map((e, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="timeline-item">
                  <span className="timeline-dot" />
                  <div className="glass-card p-4">
                    <span className="badge-sky">{e.period}</span>
                    <h3 className="mt-3 mb-1">{e.title}</h3>
                    <p className="text-muted-sky mb-3">{e.company}</p>
                    <ul className="check-list">
                      {e.points.map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
