
import { useState, useEffect, useCallback } from "react";

export default function useFetchSolution(initialUrl) {
  const [url, updateUrl] = useState(initialUrl);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setData(null);

    if (!url) {
      setError("Error: URL not provided");
      return;
    } else {
      setError(null);
    }

    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    }

    setLoading(false);
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    url,
    data,
    error,
    loading,
    load,
    updateUrl,
  };
}
