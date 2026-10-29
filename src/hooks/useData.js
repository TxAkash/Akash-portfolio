import { useEffect, useState } from "react";

// Every JSON file inside src/data is registered here and loaded on demand.
// useData("home") -> loads src/data/home.json
const files = import.meta.glob("../data/*.json");

export default function useData(name) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loader = files[`../data/${name}.json`];
    if (!loader) {
      setError(`Data file "${name}.json" not found`);
      return;
    }
    let active = true;
    loader()
      .then((mod) => active && setData(mod.default))
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [name]);

  return { data, error, loading: !data && !error };
}
