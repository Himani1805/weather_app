import React, { useState, useEffect, useRef } from 'react';

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
        }, 1000); // 500ms debounce delay

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
            <svg
                className="absolute right-5 w-6 h-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    );
}