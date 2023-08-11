'use client';
import { useState } from 'react';
import { Input } from './Input';
interface IAutoCompleteProps {
  onSelect: (address: any) => void;
}

const AutoComplete = ({ onSelect }: IAutoCompleteProps) => {
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
  const handleSelect = async (address) => {
    setInputValue(address.description);
    setSuggestions([]);
    try {
      const response = await fetch(`/api/maps?placeId=${address.place_id}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(
        '🚀 ~ file: InputAutoComplete.tsx:29 ~ handleSelect ~ data:',
        data,
      );
      if (data.result.geometry.location) {
        onSelect(data.result.geometry.location);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: InputAutoComplete.tsx:27 ~ handleSelect ~ error:',
        error,
      );
    }
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
