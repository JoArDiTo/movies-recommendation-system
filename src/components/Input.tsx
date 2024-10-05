import React from 'react';

interface InputProps {
    value: string ;
    onClick: (genre: string) => void;
}
const Input: React.FC<InputProps> = ({ value, onClick }) => {
    return (
        <label className="flex gap-2 text-white border-2 border-gray-300 rounded-md p-2 m-2 bg-violet-600 hover:bg-violet-700 hover:scale-110 transition">
            <input 
                type="checkbox" 
                className="h-auto text-xl"
                onChange={(e) => onClick(value)}
            />
            <span className="text-black">{value}</span>
        </label>
    );
};

export default Input;