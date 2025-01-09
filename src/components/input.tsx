"use client"
import React, {useState} from 'react';

interface InputProps{
  label?: string; 
  placeholder?: string;  
  widthScale?:number
}

const Input = ({label, placeholder="enter text", widthScale=1}: InputProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }


    const calculatedWidth = `${widthScale * 100}vw`;

    return (
        <div style={{ width : calculatedWidth }} className="">
            {label && (
                <label className="block text-gray-700 text-sm font-medium m-2">
                    {label}
                </label>
            )}
            <input 
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        
    );
}

export default Input 