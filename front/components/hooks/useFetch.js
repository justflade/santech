import { useEffect, useState, useCallback } from "react";

export default function useFetch(url, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryString = new URLSearchParams(params).toString();

  const fetchData = useCallback(async () => {
    const fullUrl = `${url}${queryString ? "?" : ""}${queryString}`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(fullUrl);
      const jsonData = await response.json();

      if (response.ok) {
        setData(jsonData.data);
      } else {
        setError(jsonData.error);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [url, queryString]);

  useEffect(() => {
    let ignore = false;

    const runFetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${url}${queryString ? "?" : ""}${queryString}`,
        );
        const jsonData = await response.json();

        if (ignore) {
          return;
        }

        if (response.ok) {
          setData(jsonData.data);
        } else {
          setError(jsonData.error);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    runFetch();

    return () => {
      ignore = true;
    };
  }, [url, queryString]);

  return { data, loading, error, refetch: fetchData };
}