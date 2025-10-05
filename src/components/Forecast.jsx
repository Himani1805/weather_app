import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function Forecast({ city }) {
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getForecastData = async (cityName) => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${API_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
                );
                // Filter the forecast data 1 day Each
                const dailyData = response.data.list.filter(entry =>
                    entry.dt_txt.includes("12:00:00")
                );
                setForecastData(dailyData.slice(0, 5));
            } catch (err) {
                setError('City not found or API error');
            } finally {
                setLoading(false);
            }
        };

        if (city) {
            getForecastData(city);
        }
    }, [city]);

    return (
        <div className="bg-white bg-opacity-75 rounded-xl shadow-lg p-6 md:p-8 w-full mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h2>
            {loading && (
                <div className="text-center text-gray-500">Loading forecast...</div>
            )}
            {error && (
                <div className="text-center text-red-500">{error}</div>
            )}
            {forecastData.length > 0 && (
                <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between
            gap-4 overflow-x-auto pb-4">
                    {forecastData.map((entry, index) => (
                        <div key={index} className="flex-shrink-0 w-36 sm:w-40 md:w-44 lg:w-48  bg-gray-100 rounded-xl p-4 text-center shadow-md   hover:shadow-xl hover:bg-gray-50 transition-all duration-300 ease-in-out">
                            <div className="text-lg font-semibold text-gray-700">{new Date(entry.dt_txt).toLocaleDateString([], { weekday: 'long' })}</div>
                            <img
                                src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}.png`}
                                alt={entry.weather[0].description}
                                className="w-16 h-16 mx-auto mt-2"
                            />
                            <div className="text-2xl font-bold text-gray-800 mt-2">{Math.round(entry.main.temp)}°C</div>
                            <div className="text-gray-600 capitalize text-sm mt-1">{entry.weather[0].description}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}