import { useState, useEffect } from "react";
import type { ApiUser } from "../reducer/user-management/types";

function useUser(id: string | undefined) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUser(signal?: AbortSignal) {
    if(!id) {
      setLoading(false);
      setError("");
      setUser(null);

      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        signal
      });

      if(response.status === 404) {
        return;
      }

      if(!response.ok) {
        throw new Error("Failed to fetch user.");
      }

      const data: ApiUser = await response.json();

      setUser(data);
    } catch(error) {
      if(error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      if(!signal?.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchUser(controller.signal);

    return () => {
      controller.abort();
    }
  }, [id]);

  return {
    user,
    loading,
    error,
    retry: fetchUser
  };
}

export default useUser