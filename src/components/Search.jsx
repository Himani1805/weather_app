import React, { useState } from 'react';
import { SearchIcon } from "lucide-react";

export default function Search({ city, setCity, handleSearch }) {
    const [inputValue, setInputValue] = useState(city || '');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const onSearch = () => {
        setCity(inputValue);
        handleSearch();
    }

    return (
        <div className="relative flex items-center w-full">
            <input
                type="text"
                name="city"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter City Name"
                className="border-2 border-gray-300 bg-white px-5 py-4 pr-16 rounded-full text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />

            <button
                onClick={onSearch}
                className="absolute right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                <SearchIcon size={24} />
            </button>
        </div>
    );
}