import { useState, useCallback } from "react";
const useHttp = () => {
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const sendReq = useCallback(
    async (url, options = { method: "GET" }, setData = null) => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data);
        setData(data);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    },
    []
  );

  return {
    error,
    isLoading,
    sendReq,
  };
};

export default useHttp;
