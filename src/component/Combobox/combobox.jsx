// src/ComboBox.js
import React, { useState } from 'react';

const ComboBox = ({ options, onSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setFilteredOptions(
            options.filter((option) =>
                option.toLowerCase().includes(value.toLowerCase())
            )
        );
        setIsDropdownVisible(true);
    };

    const handleSelect = (option) => {
        setInputValue(option);
        setIsDropdownVisible(false);
        onSelect(option);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
            />
            {isDropdownVisible && (
                <ul style={{ border: '1px solid #ccc', margin: 0, padding: 0 }}>
                    {filteredOptions && filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(option)}
                            style={{
                                listStyle: 'none',
                                padding: '8px',
                                cursor: 'pointer',
                                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                            }}
                        >
                            {option.TenKH}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComboBox;
