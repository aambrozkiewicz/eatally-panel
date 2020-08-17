import { useState, useEffect, useCallback } from "react";
import { client } from "./utils/api";

export const useApi = (path, options) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const load = useCallback(async () => {
    setLoading(true);
    const response = await client(path, options);
    setData(response);
    setLoading(false);
  }, [path, options]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, data, reload: load };
};

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
