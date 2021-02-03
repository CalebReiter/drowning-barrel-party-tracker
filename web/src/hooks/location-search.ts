import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const objectToQueryString = (obj: Record<string, string>) => {
    const keys = Object.keys(obj);
    if (!keys.length) return "";
    return keys.reduce((queryString, key, index) => `${queryString}${index ? "&" : "?"}${key}=${obj[key]}`, '');
}

const useLocationSearch = () => {
    const location = useLocation();
    const history = useHistory();
    const [search, setSearch] = useState<URLSearchParams | null>(null);
    const [searchJSON, setSearchJSON] = useState<Record<string, any> | null>(null);
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        setSearch(urlSearchParams);
        const newSearchJSON: Record<string, any> = {};
        urlSearchParams.forEach((value: string, key: string) => {
            newSearchJSON[key] = value;
        })
        setSearchJSON(newSearchJSON);
    }, [location.search]);

    const updateSearch = (query: Record<string, string>) => {
        history.push({
            search: objectToQueryString(query)
        })
    }

    return { search, searchJSON, queryString: location.search, updateSearch };
}

export default useLocationSearch;
