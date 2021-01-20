import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

interface IRec {
    name: string,
    weather: WeatherMain[],
    main: WeatherMain
}

interface Props {
    title: string,
}

const Recommend: React.FC<Props> = (props) => {
    const [data, setData] = useState<IRec[]>([]);
    useEffect(() => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + props.title + "&appid="+API_KEY;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.weather = data.weather[0]
                setData([data])
            })
    }, [props.title])
    
    return (
        <Link to={"/forecast/" + props.title} className="recommend_block">
            <div>
                {data.map((item: any, id: number) => {
                    return (
                        <div key={id} className="title_block">
                            <span className="rec_title">{item.name}</span>

                            <div className="weather_info_container">
                                <span className="weather_temp">{Math.round(item.main.temp - 273.15)}°</span>
                                <span className="weather_feels">{Math.round(item.main.feels_like - 273.15)}°</span>
                            </div>

                            <div>
                                <img src={`http://openweathermap.org/img/wn/${item.weather.icon.slice(0, -1)}d@2x.png`} alt="" />
                            </div>


                        </div>
                    )
                })}
            </div>
        </Link>
    )
}

export default Recommend;