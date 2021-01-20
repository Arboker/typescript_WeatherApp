interface WeatherMain {
    main: string,
    icon: string
}

interface WeatherInfo {
    temp: number,
    feels_like: number    
}

interface listWeather {
    date: string,
    weather: WeatherInfo[],
    main: WeatherMain[]
}

interface IWeather {
    city: {
        id: number,
        name: string
    },
    list: listWeather[]
}