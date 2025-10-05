import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    WiHumidity,
    WiStrongWind,
    WiBarometer,
    WiSunrise,
    WiSunset,
    WiThermometer,
} from 'react-icons/wi';

// API setup
const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Main component
export default function WeatherDisplay({ city }) {
    const [weather, setWeather] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    

    // Fetch weather data when city changes
    useEffect(() => {
        async function fetchWeather() {
            setLoading(true);
            setError(null);
            try {
                const url = `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
                const response = await axios.get(url);
                setWeather(response.data);
            } catch (err) {
                setError('City not found or API error');
            } finally {
                setLoading(false);
            }
        }

        if (city) {
            fetchWeather();
        }
    }, [city]);

    // Convert UNIX timestamp to readable time
    function formatTime(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    // Reusable Box component
    function StatBox({ icon, label, value }) {
        return (
            <div className="flex items-center space-x-2 bg-white bg-opacity-60 rounded-lg p-3 shadow-sm">
                {icon}
                <div>
                    <div className="text-sm text-gray-500">{label}</div>
                    <div className="font-semibold text-gray-800">{value}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-xl">
            {/* Loading message */}
            {loading && (
                <div className="animate-pulse text-center text-gray-500 text-xl">
                    Loading weather...
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="text-center text-red-600 font-semibold text-lg">
                    {error}
                </div>
            )}

            {/* Weather display */}
            {weather && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left panel */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h2 className="text-4xl font-bold text-gray-800">{weather.name}</h2>
                        <p className="text-gray-600 text-lg">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                        <div className="flex items-center space-x-4">
                            <img
                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                                alt={weather.weather[0].description}
                                className="w-24 h-24"
                            />
                            <div className="text-6xl font-extrabold text-gray-800">
                                {Math.round(weather.main.temp)}°C
                            </div>
                        </div>
                        <p className="text-xl text-gray-700 capitalize">
                            {weather.weather[0].description}
                        </p>
                    </div>

                    {/* Right panel */}
                    <div className="grid grid-cols-2 gap-4 text-gray-700 text-lg">
                        <StatBox
                            icon={<WiThermometer size={32} />}
                            label="Feels Like"
                            value={`${Math.round(weather.main.feels_like)}°C`}
                        />
                        <StatBox
                            icon={<WiHumidity size={32} />}
                            label="Humidity"
                            value={`${weather.main.humidity}%`}
                        />
                        <StatBox
                            icon={<WiStrongWind size={32} />}
                            label="Wind"
                            value={`${weather.wind.speed} m/s`}
                        />
                        <StatBox
                            icon={<WiBarometer size={32} />}
                            label="Pressure"
                            value={`${weather.main.pressure} hPa`}
                        />
                        <StatBox
                            icon={<WiSunrise size={32} />}
                            label="Sunrise"
                            value={formatTime(weather.sys.sunrise)}
                        />
                        <StatBox
                            icon={<WiSunset size={32} />}
                            label="Sunset"
                            value={formatTime(weather.sys.sunset)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}