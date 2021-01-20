import React, { useEffect, useState } from 'react';
import {
    useParams, Link
} from "react-router-dom";

import { formData } from '../functions/index'
import '../css/forecast.css'
import ErrorImage from '../img/error.png'

import Loader from '../componennts/loader'
import Search from '../Search'

interface RouteParams {
    city: string
}

const Forecast: React.FC = () => {
    const [data, setData] = useState<IWeather[]>([]);
    const [cod, setCod] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        loadContent();
    }, []);

    let params = useParams<RouteParams>();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const loadContent = () => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + params.city + "&appid="+API_KEY;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCod(data.cod)
                if (data.cod == 200) {
                    const dates = data.list.map((item: any) => {
                        return item.dt_txt.split(" ")[0];
                    }).filter((item: any, i: number, currArr: any) => {
                        return currArr.indexOf(item) === i;
                    })
                    let sortedResults: { date: any; weather: any[]; main: any[] }[] = [];
                    for (let i = 0; i < dates.length; i++) {
                        sortedResults.push({
                            date: dates[i],
                            weather: [],
                            main: []
                        });
                    }

                    const todayNew = mm + '/' + dd + '/' + yyyy;
                    const arraysOfTimeToday: any[] = [];
                    data.list.map((item: any) => {
                        const date = item.dt_txt.split("-");
                        const year = date[0];
                        const month = date[1];
                        const day = date[2].split(" ")[0];

                        const dateItem = month + "/" + day + "/" + year;

                        if (dateItem === todayNew) {
                            arraysOfTimeToday.push(item)
                        }
                    })

                    var todaysData;
                    if (arraysOfTimeToday.length === 1) {
                        todaysData = {
                            weather: [{
                                temp: arraysOfTimeToday.map((item: any) => item.main.temp),
                                feels_like: arraysOfTimeToday.map((item: any) => item.main.feels_like),
                            }],
                            main: [{
                                icon: (arraysOfTimeToday[0].weather.map((data: any) => data.icon)).toString()
                            }]
                        }
                    }
                    else {
                        const allTemp: any[] = [];
                        const allFeelsLike: any[] = [];
                        arraysOfTimeToday.map((a) => {
                            allTemp.push(a.main.temp)
                            allFeelsLike.push(a.main.feels_like)
                        })
                        todaysData = {
                            weather: [{
                                temp: Math.round((allTemp.reduce((a, b) => a + b)) / allTemp.length),
                                feels_like: Math.round((allFeelsLike.reduce((a, b) => a + b)) / allFeelsLike.length),
                            }],
                            main: [{
                                icon: (arraysOfTimeToday[0].weather.map((data: any) => data.icon)).toString()
                            }]
                        }
                    }

                    const dailyData = data.list.filter((list: any) => list.dt_txt.includes("15:00:00"))
                    dailyData.map((item: any) => {
                        let itemDate = item.dt_txt.split(" ")[0];

                        for (let i = 0; i < sortedResults.length; i++) {
                            if (sortedResults[i].date === itemDate) {
                                sortedResults[i].weather.push(item.main);
                                sortedResults[i].main.push(item.weather[0]);
                            }
                        }
                    })
                    const returnedData = [
                        {
                            city: {
                                id: data.city.id,
                                name: data.city.name
                            },
                            list: sortedResults
                        }
                    ]
                    returnedData[0].list[0].weather = todaysData.weather;
                    returnedData[0].list[0].main = todaysData.main;
                    setData(returnedData)
                }
                setLoading(true)
            });
    }
    return (
        <div>
            <Search search={params.city} />
            <div className="main_container">
                {!loading ? (
                    <div className="loader_block_comments">
                        <Loader />
                    </div>
                ) : (
                        <div>
                            {cod !== "200" ? (
                                <div className="error_weather">
                                    <img src={ErrorImage} alt="Error" className="error_image" />
                                    <span className="error_text">The city was not found! Or it could be an error with the API</span>
                                </div>
                            ) : (
                                    <div>
                                        {data.map((item, id) => {
                                            return (
                                                <div key={item.city.id}>
                                                    <h2 className="title_weather">{item.city.name}</h2>

                                                    <div className="weather_container">
                                                        {item.list.slice(0, 5).map((list, i) => {
                                                            // console.log(today.getDate())
                                                            const dayNow = yyyy + "-" + mm + "-" + dd;
                                                            return (
                                                                <Link to={process.env.PUBLIC_URL+ "/" + params.city + "/" + (list.date).split("-")[2]} className="weather_date_container" key={i}>
                                                                    <div key={i}>
                                                                        <span className="weather_date">{list.date === dayNow ? "Today" : formData(list.date)}</span>

                                                                        {list.weather.map((info, id) => {
                                                                            return (
                                                                                <div key={id} className="weather_info_container">
                                                                                    <span className="weather_temp">{Math.round(info.temp - 273.15)}°</span>
                                                                                    <span className="weather_feels">{Math.round(info.feels_like - 273.15)}°</span>
                                                                                </div>
                                                                            )
                                                                        })}

                                                                        {list.main.map((main, id) => {
                                                                            return (
                                                                                <div key={id}>
                                                                                    <img src={`http://openweathermap.org/img/wn/${main.icon.slice(0, -1)}d@2x.png`} alt="" />
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </Link>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                            )
                                        })}
                                    </div>
                                )}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Forecast;