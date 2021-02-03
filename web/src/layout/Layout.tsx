import React from 'react';
import { Input } from 'semantic-ui-react';
import useLocationSearch from '../hooks/location-search';

const Layout: React.FC = () => {
    const { searchJSON, updateSearch } = useLocationSearch();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = {
            ...searchJSON,
            [e.target.name]: e.target.value
        }
        if (e.target.value === "") {
            delete newSearch[e.target.name];
        }
        updateSearch(newSearch);
    }
    return <>
        <Input placeholder="Character ID" name="character_id" value={searchJSON?.character_id || ""} onChange={onChange}/>
    </>;
}

export default Layout;