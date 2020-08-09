import { useState, useEffect } from "react";
import { client } from "./utils/api";

export const useApi = (path, options) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await client(path, options);
            setData(response);
            setLoading(false);
        };
        
        fetchData();
    }, [path, options]);

    return { loading, data };
};
