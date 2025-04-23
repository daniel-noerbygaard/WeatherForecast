import { useQuery } from "@tanstack/react-query";
import { fetchWeatherApi } from "openmeteo";
import { useCallback } from "react";
import { Address } from "../models/responseModels";

type WeatherData = {
    current: {
        time: Date,
        temperature: number,
        windSpeed: number,
        rain: number,
        humidity: number
        weatherCode: any
    }
    hourly : {
        time: Date[],
        temperature: number[]
    }
}

var params = {
	"latitude": 0,
	"longitude": 0,
	"hourly": "temperature_2m",
    "current": ["temperature_2m", "wind_speed_10m", "relative_humidity_2m", "rain", "weather_code"],
    "wind_speed_unit": "ms"
};

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

const url = "https://api.open-meteo.com/v1/forecast";

export const useFetchWeather = (address: Address | undefined) => {
    const fetchWeather = useCallback(async () => {
        if (!address){
            return null
        }

        params.latitude = address.latitude
        const responses = await fetchWeatherApi(url, params);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        
        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        
        const current = response.current()!;
        const hourly = response.hourly()!;
        
        // Note: The order of weather variables in the URL query and the indices below need to match!
        var weatherData : WeatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature: Math.round(current.variables(0)!.value()),
                windSpeed: Math.round(current.variables(1)!.value()),
                humidity: current.variables(2)!.value(),
                rain: Math.round(current.variables(3)!.value()),
                weatherCode: current.variables(4)!.value(),
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)),
                temperature: Array.from(hourly.variables(0)!.valuesArray()!)
            },
        } ;

        return weatherData
    }, [address]);

    return useQuery({
        queryKey: ["weather", address],
        queryFn: fetchWeather,
    });
}
