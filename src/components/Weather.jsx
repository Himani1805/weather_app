import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Forecast from './Forecast';
import { Oval } from 'react-loader-spinner';

export default function Weather() {
    const [city, setCity] = useState("Delhi");
    const [lastSearchedCity, setLastSearchedCity] = useState(localStorage.getItem("lastCity"));
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!city) return;

        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
                setWeather(response.data);
            } catch (err) {
                setError('City Not Found... ');
                setWeather(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    const handleSearch = () => {
        if (city) {
            localStorage.setItem("lastCity", city);
            setLastSearchedCity(city);
            setError(null);
        }
    };

    return (
        <div className="w-full min-h-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  flex flex-col items-center justify-center p-4">  {/*bg-gradient-to-br from-blue-200 to-blue-300 */}

            <div className="w-full max-w-2xl mb-12">
                <Search city={city} setCity={setCity} handleSearch={handleSearch} />
                <div className=''>
                    {lastSearchedCity && (
                        <p className="flex justify-center text-lg sm:text-2xl text-white mt-3 sm:mt-2 text-center sm:text-left ">
                            Last searched city : <span className="font-medium pl-2"> {lastSearchedCity}</span>
                        </p>
                    )}
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                {error ? (
                    <div className="text-center text-red-600 font-semibold text-lg">
                        {error}
                    </div>
                ) : (
                    <>
                        {loading ? (
                            <Oval
                                height={80}
                                width={80}
                                color="#4fa94d"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#4fa94d"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        ) : (
                            <>
                                {/* Weather Data */}
                                <div className='w-full flex flex-col lg:flex-row justify-around items-center'>
                                    <div className="w-full rounded-md mb-6">
                                        <WeatherDisplay weather={weather} />
                                    </div>
                                </div>

                                {/* Forecast Data */}
                                <div className="w-full max-w-7xl rounded-md py-4">
                                    <Forecast city={city} />
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}