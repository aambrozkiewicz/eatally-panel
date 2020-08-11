import { useState, useEffect } from "react";
import { client } from "./utils/api";

export const useApi = (path, options) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const load = async () => {
        setLoading(true);
        const response = await client(path, options);
        setData(response);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, [path, options]);

    return { loading, data, reload: load };
};
