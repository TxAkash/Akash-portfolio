import { useState } from "react";
import useData from "../hooks/useData";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

export default function Portfolio() {
  const { data, error, loading } = useData("portfolio");
  const [filter, setFilter] = useState("All");
  if (loading || error) return <Loader error={error} />;

  const projects =
    filter === "All" ? data.projects : data.projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader eyebrow="Selected work" title={data.heading} subtitle={data.subheading} />

      <section className="section pt-0">
        <div className="container">
          <div className="filter-bar">
            {data.categories.map((c) => (
              <button
                key={c}
                className={`filter-btn ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {projects.map((p, i) => (
              <div className="col-md-6" key={p.id}>
                <Reveal delay={i * 90} className="h-100">
                  <article className="project-card h-100" style={{ "--accent": p.accent }}>
                    <div className="project-cover">
                      <div className="browser-dots">
                        <span />
                        <span />
                        <span />
                        <em>{p.url ? p.url.replace("https://", "") : "personal-project"}</em>
                      </div>
                      <i className={`bi ${p.icon} cover-icon`} />
                      <span className="project-num">0{p.id}</span>
                    </div>
                    <div className="project-body">
                      <div className="d-flex justify-content-between align-items-center mb-2 gap-2 flex-wrap">
                        <span className="badge-sky">{p.type}</span>
                        <span className="project-cat">{p.category}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <div className="tag-row">
                        {p.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noreferrer" className="project-link">
                          Visit Website <i className="bi bi-box-arrow-up-right ms-1" />
                        </a>
                      ) : (
                        <span className="project-link muted">
                          <i className="bi bi-lock me-1" /> Personal project
                        </span>
                      )}
                    </div>
                  </article>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
