import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

interface Props {
    search: string
}

const Search: React.FC<Props> = (props) => {
    const [value, setValue] = useState(props.search)
    let history = useHistory();

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            history.push("/forecast/"+value)
            history.go(0)
        }
    }

    return (
        <div className="search_section">
            <Link to="/"><span className="title_header">WeatherApp</span></Link>
            <div className="search_container">
                <input type="text" className="search_input" value={value} onChange={changeValue}
                onKeyPress={handleKeypress} />
                <div className="searchIcon">
                    <span className="material-icons-round">search</span>
                </div >
            </div >
        </div>
    )
}

export default Search;