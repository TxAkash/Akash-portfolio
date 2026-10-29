export default function Loader({ error }) {
  return (
    <div className="loader-wrap">
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="sky-spinner" role="status" aria-label="Loading" />
      )}
    </div>
  );
}
