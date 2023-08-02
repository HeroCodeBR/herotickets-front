'use client';
import { useState } from 'react';
import { Input } from './Input';

const AutoComplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = async (value) => {
    setInputValue(value);
    const fetchSuggestions = await fetch(`/api?input=${value}`, {
      method: 'GET',
    });
    const data = await fetchSuggestions.json();

    setSuggestions(data.predictions);
  };
  const handleSelect = (address) => {
    setInputValue(address.description);
    setSuggestions([]);
  };
  return (
    <>
      <Input
        title="Localização"
        placeholder="Endereço"
        type="input"
        value={inputValue}
        onChange={(e) => handleChangeInput(e.target.value)}
      />
      <ul className="rounded bg-white shadow">
        {suggestions.map((suggestion: any) => (
          <li
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect(suggestion)}
          >
            {suggestion.description}
          </li>
        ))}
      </ul>
    </>
  );
};

export { AutoComplete };
