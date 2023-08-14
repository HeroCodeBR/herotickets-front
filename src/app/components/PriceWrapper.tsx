'use client';

import { useState } from 'react';
interface IPriceProps {
  sector: string;
  amount: string;
  onQuantityChange: (sector: string, value: number) => void;
}
export const PriceWrapper = ({
  sector,
  amount,
  onQuantityChange,
}: IPriceProps) => {
  const [value, setValue] = useState(0);
  const handleIncrement = () => {
    setValue(value + 1);
    onQuantityChange(sector, value + 1);
  };
  const handleDecrement = () => {
    if (value === 0) return;
    setValue(value - 1);
    onQuantityChange(sector, value - 1);
  };
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-bold text-lg">
          {sector} - R${amount},00
        </p>
        <p className="text-sm">
          Entrada e acesso à {sector.toLowerCase()} do evento.
        </p>
      </div>
      <div className="flex">
        <div
          onClick={handleDecrement}
          className="bg-blue cursor-pointer rounded text-white font-medium w-8 h-8 flex justify-center items-center"
        >
          <p>-</p>
        </div>
        <div className="mx-2 bg-white rounded border border-neutral-500 text-blue font-medium w-8 h-8 flex justify-center items-center">
          <p>{value}</p>
        </div>
        <div
          onClick={handleIncrement}
          className="bg-blue cursor-pointer rounded text-white font-medium w-8 h-8 flex justify-center items-center"
        >
          <p>+</p>
        </div>
      </div>
    </div>
  );
};
