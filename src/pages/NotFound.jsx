import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-header" style={{ minHeight: "60vh" }}>
      <div className="container text-center">
        <h1 className="display-title text-gradient">404</h1>
        <p className="lead-text mx-auto">This page drifted off into the sky.</p>
        <Link to="/" className="btn btn-sky mt-3">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
