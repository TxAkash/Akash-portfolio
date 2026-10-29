import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useData from "../hooks/useData";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

export default function Designs() {
  const { data, error, loading } = useData("designs");
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null); // index in the filtered list

  const items = data
    ? filter === "All"
      ? data.designs
      : data.designs.filter((d) => d.category === filter)
    : [];

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  // Keyboard controls + lock page scroll while the lightbox is open
  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  if (loading || error) return <Loader error={error} />;

  const count = (c) =>
    c === "All" ? data.designs.length : data.designs.filter((d) => d.category === c).length;
  const current = active !== null ? items[active] : null;

  return (
    <>
      <PageHeader eyebrow="Creative work" title={data.heading} subtitle={data.subheading} />

      <section className="section pt-0">
        <div className="container">
          <div className="filter-bar">
            {data.categories.map((c) => (
              <button
                key={c}
                className={`filter-btn ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c} <span className="filter-count">{count(c)}</span>
              </button>
            ))}
          </div>

          <div className="masonry">
            {items.map((d, i) => (
              <Reveal key={d.id} delay={(i % 6) * 70} className="masonry-item">
                <button className="design-tile" onClick={() => setActive(i)}>
                  <img src={d.image} alt={d.title} loading="lazy" />
                  <span className="design-overlay">
                    <span className="design-zoom">
                      <i className="bi bi-arrows-fullscreen" />
                    </span>
                    <span className="design-meta">
                      <span className="badge-sky">{d.category}</span>
                      <strong>{d.title}</strong>
                      {d.tool && (
                        <small>
                          <i className="bi bi-brush" /> {d.tool}
                        </small>
                      )}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {!items.length && <p className="text-center text-muted-sky">No designs in this category yet.</p>}
        </div>
      </section>

      {current && createPortal(
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true" aria-label={current.title}>
          <button className="lb-btn lb-close" onClick={close} aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
          {items.length > 1 && (
            <>
              <button
                className="lb-btn lb-prev"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
              >
                <i className="bi bi-chevron-left" />
              </button>
              <button
                className="lb-btn lb-next"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
              >
                <i className="bi bi-chevron-right" />
              </button>
            </>
          )}
          <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
            <img key={current.id} src={current.image} alt={current.title} />
            <figcaption>
              <span className="badge-sky">{current.category}</span>
              <strong>{current.title}</strong>
              {current.tool && <span>Made with {current.tool}</span>}
              <span className="lb-count">
                {active + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>,
        document.body
      )}
    </>
  );
}
