import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import Recommend from '../componennts/Recommend'
import '../css/style.css'

const Main: React.FC = () => {
    const [value, setValue] = useState('');
    let history = useHistory();

    const textChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            history.push('/forecast/' + value)
        }
    }

    return (
        <div className="main_section">
            <Link to="/" className="weather_header weather_header_padding"><span className="title_header_weather">WeatherApp</span></Link>
            <div className="main_seatch_rec_block">
                <div className="search_main_container">
                    <input type="text" className="search_input" placeholder="City" onChange={textChange}
                        onKeyPress={handleKeypress} />
                    <div className="searchIcon">
                        <span className="material-icons-round">search</span>
                    </div >
                </div >
                <div className="recommend_section">
                    <Recommend title="New York" />
                    <Recommend title="London" />
                    <Recommend title="Paris" />
                    <Recommend title="Amsterdam" />
                </div>
            </div>
            <span className="footer_txt">Made by <a href="https://github.com/Arboker">Denis Lupookov</a></span>
        </div>
    )
}


export default Main;