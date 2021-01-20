import React, { useEffect, useState } from 'react';
import {
    useParams, Link
} from "react-router-dom";

import { formatHours } from '../functions/index'
import '../css/weather.css'
import ErrorImage from '../img/error.png'
import Loader from '../componennts/loader'

interface RouteParams {
    city: string,
    day: string
}

interface IWeatherDay {
    dt_txt: string,
    main: {
        temp: number,
        feels_like: number
    },
    weather: [{
        main: string,
        description: string,
        icon: string
    }],
    wind: {
        speed: number
    }
}

const Weather: React.FC = () => {
    const [data, setData] = useState<IWeatherDay[]>([])
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)
    let params = useParams<RouteParams>();

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + params.city + "&appid="+API_KEY;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod == 200) {
                    setLoading(false)
                    const nowDayData = data.list.filter((item: any) => item.dt_txt.split(" ")[0].split("-")[2] === params.day);
                    if (nowDayData.length === 0) {
                        setStatus(true)
                    }
                    setData(nowDayData)
                }
                else {
                    setLoading(false)
                    setStatus(true)
                }
            })
    }, [params.city, params.day])

    return (
        <div className="weather_section">
            <Link to="/" className="weather_header"><span className="title_header_weather">WeatherApp</span></Link>

            <div className="weather_main_container">
                <h2 className="title_main_weather">{params.city}</h2>
                <div className="weather_main_block">

                    {loading ? (
                        <div className="loader_block">
                            <Loader />
                        </div>
                    ) : (
                            <>
                                {!status ? (
                                    <>
                                        {data.map((item, id) => {
                                            return (
                                                <div key={id} className="weather_main_date_container">
                                                    <span className="weather_date">{formatHours(item.dt_txt)}</span>

                                                    <div key={id} className="weather_info_container">
                                                        <span className="weather_temp">{Math.round(item.main.temp - 273.15)}°</span>
                                                        <span className="weather_feels">{Math.round(item.main.feels_like - 273.15)}°</span>
                                                    </div>

                                                    {item.weather.map((main, id) => {
                                                        return (
                                                            <div key={id} className="weather_info_container__sub">
                                                                <img src={`http://openweathermap.org/img/wn/${main.icon.slice(0, -1)}d@2x.png`} alt="" />
                                                                <div className="info_weather">
                                                                    <span className="weather_main_title">{main.main}</span>
                                                                    <span className="weather_description">{main.description}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (
                                        <div className="error_weather">
                                            <div className="error_weather">
                                                <img src={ErrorImage} alt="Error" className="error_image" />
                                                <span className="error_text">The data was not found!</span>
                                            </div>
                                        </div>
                                    )}
                            </>
                        )}
                </div>
            </div>
            <span className="footer_txt footer_margin">Made by <a href="https://github.com/Arboker">Denis Lupookov</a></span>
        </div>
    )
}


export default Weather;