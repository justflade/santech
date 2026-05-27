import { useEffect, useState } from "react";

export default function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthed, setIsAuthed] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("localhost:8000/");
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
    }
  }, []);
}
