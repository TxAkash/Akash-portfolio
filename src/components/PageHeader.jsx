export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="page-header">
      <div className="container text-center">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="display-title">{title}</h1>
        {subtitle && <p className="lead-text mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
