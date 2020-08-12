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
