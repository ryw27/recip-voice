import React, {useEffect, useState, useRef} from 'react';

interface InputProps{
  label?: string; 
  placeholder?: string;  
  inputText?: string;
  widthScale?:number;
}

const Input = ({label, placeholder="Enter Text", inputText, widthScale=1}: InputProps) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (inputRef.current) {
            console.log("hello");
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
        } 
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
        }
        if (inputText) {
            setInputValue(inputText);
        }
        console.log(inputValue);
    }, [inputText])

    const calculatedWidth = `${widthScale * 100}vw`;

    return (
        <div style={{ width : calculatedWidth }} className="">
            {label && (
                <label className="block text-sm font-medium m-2">
                    {label}
                </label>
            )}
            <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={1}
            />
        </div>
        
    );
}

export default Input 