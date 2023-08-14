'use client';
import { useState } from 'react';
import { Button } from './Form/Button';
import { Input } from './Form/Input';
import { PriceWrapper } from './PriceWrapper';

export const FormWrapper = (response: any) => {
  const [subtotal, setSubtotal] = useState(0);

  const onQuantityChange = (sector: any, quantity: any) => {
    console.log('response=>', sector, quantity);
    const selectedQuantity = {
      [sector]: quantity,
    };

    const calculateSubtotal = Object.keys(selectedQuantity).reduce(
      (subtotal: any, currentSector: any) => {
        const quantity = selectedQuantity[currentSector];
        const price = response.price.find(
          (price: any) => price.sector === currentSector,
        );
        if (quantity && price) {
          subtotal += parseFloat(price.amount) * quantity;
        }
        return subtotal;
      },
      0,
    );
    setSubtotal(calculateSubtotal);
  };
  return (
    <div className="bg-gra-50 shadow rounded-3xl">
      <p className="bg-blue rounded-3xl rounded-b-none p-3 text-white text-center">
        Ingressos
      </p>
      <div className="p-6">
        {response.price.map((item: any) => (
          <PriceWrapper
            sector={item.sector}
            amount={item.amount}
            onQuantityChange={onQuantityChange}
          />
        ))}
        <div className="grid grid-cols-5 gap-3 mt-3">
          <Input
            type="text"
            placeholder="Insira aqui um cupom de desconto"
            title="Cupom"
            className="col-span-3"
          />
          <Input
            type="text"
            placeholder="R$0,00"
            title="Subtotal"
            className="col-span-2"
            value={`R$ ${subtotal.toFixed(2)}`}
          />
        </div>
        <Input type="text" title="Nome" placeholder="Insira seu nome" />
        <Input type="text" title="Email" placeholder="Insira seu email" />
        <Button title="Cadastrar" />
      </div>
    </div>
  );
};
