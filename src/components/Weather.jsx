import React, { useState, useEffect } from 'react'
import Search from './Search'
import WeatherDisplay from './WeatherDisplay'
import Forecast from './Forecast'

export default function Weather() {
    const [city, setCity] = useState(localStorage.getItem("lastCity") || "delhi");

    useEffect(() => {
        if (city) {
            localStorage.setItem("lastCity", city);
        }
    }, [city]);

    return (
        <div className="w-full min-h-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%  flex flex-col items-center justify-center p-4">  {/*bg-gradient-to-br from-blue-200 to-blue-300 */}

            <div className="w-full max-w-2xl mb-12">
                <Search city={city} setCity={setCity} />
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                {/* Weather Data */}
                <div className='w-full flex flex-col lg:flex-row justify-around items-center'>
                    <div className="w-full rounded-md mb-6">
                        <WeatherDisplay city={city} />
                    </div>
                </div>

                {/* Forecast Data */}
                <div className="w-full max-w-7xl rounded-md py-4">
                    <Forecast city={city} />
                </div>


            </div>
        </div>
    )
}