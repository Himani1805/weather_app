import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from "lucide-react"

export default function Search({ city, setCity }) {
    const [inputValue, setInputValue] = useState(city || '');
    const debounceTimer = useRef(null);

    useEffect(() => {
        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new debounce timer
        debounceTimer.current = setTimeout(() => {
            setCity(inputValue);
        }, 1000);

        // Cleanup on unmount
        return () => clearTimeout(debounceTimer.current);
    }, [inputValue, setCity]);

    return (
        <div className="relative flex items-center w-full">
            <input
                type="text"
                name="city"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter City Name"
                className="border-2 border-gray-300 bg-white px-5 py-4 pr-16 rounded-full text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />

            <SearchIcon
                size={24}
                className="absolute right-5 text-gray-400 pointer-events-none"
            />
        </div>
    );
}