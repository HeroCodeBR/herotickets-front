'use client';
import { CardFilter } from '@/app/components/CardFilter';
import { Button } from '@/app/components/Form/Button';
import { Input } from '@/app/components/Form/Input';
import { AutoComplete } from '@/app/components/Form/InputAutoComplete';
import { InputRange } from '@/app/components/Form/InputRange';
import { categories } from '@/app/utils/categories';
import { fetchWrapper } from '@/app/utils/fetchWrapper';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface IFormFilter {
  name: string;
  categories: string;
  price: string;
  date: string;
  latitude: string;
  longitude: string;
  radius: string;
}
export default function FilterEvents() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState([]);
  const { register, handleSubmit, setValue } = useForm<IFormFilter>();
  const onSelect = (address: any) => {
    setValue('latitude', address.lat);
    setValue('longitude', address.lng);
  };
  const getEvents = async (data: any) => {
    const response = await fetchWrapper(
      `/events/filter?` +
        new URLSearchParams({
          name: data.name,
        }),
      { method: 'GET' },
    );
    setEvents(response);
    console.log('🚀 ~ file: page.tsx:25 ~ getEvents ~ response:', response);
  };
  useEffect(() => {
    if (searchParams.get('q')) {
      getEvents({ name: searchParams.get('q') });
    }
  }, [searchParams.get('q')]);
  const onSubmit = async (data: IFormFilter) => {
    console.log('🚀 ~ file: page.tsx:30 ~ onSubmit ~ data', data);
    const response = await fetchWrapper(
      `/events/filter?` +
        new URLSearchParams({
          name: data.name,
          categories: data.categories,
          price: data.price,
          date: data.date,
          latitude: String(data.latitude),
          longitude: String(data.longitude),
          radius: data.radius,
        }),
      { method: 'GET' },
    );
    setEvents(response);
    console.log('🚀 ~ file: page.tsx:25 ~ getEvents ~ response:', response);
  };
  return (
    <div className="container m-auto">
      <div className="grid md:grid-cols-2 gap-1 grid-cols-1 p-8">
        <div className="mb-4 pr-6 border-r-2 border-[#61D9DE] ">
          <div className="mb-4">
            <p className="text-blue text-2xl font-medium">Filtrar Eventos</p>
            <p className=" text-blue text-base font-light">
              Busque o evento que é a sua cara de maneira mais detalhada!
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              title="Nome"
              placeholder="Insira o nome do seu evento"
              type="text"
              {...register('name')}
            />
            <AutoComplete onSelect={onSelect} />
            <div className="grid grid-cols-2 gap-3">
              <Input
                title="Data"
                placeholder="Insira o endereço do seu evento"
                type="date"
                {...register('date')}
              />
              <div className="text-blue">
                <label htmlFor="" className="text-blue">
                  {' '}
                  Categoria
                </label>
                <select
                  {...register('categories')}
                  className="w-full px-6 py-[5px] bg-white rounded-lg border border-teal-400 "
                >
                  <option value="">Selecione </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <InputRange title="Distância" {...register('radius')} />
            <InputRange title="Valor" {...register('price')} />
            <div className="grid grid-cols-2 gap-7 w-2/3 m-auto">
              <Button
                title="Limpar"
                className="bg-white border text-blue border-blue"
              />
              <Button title="Buscar" />
            </div>
          </form>
        </div>
        <div className="mb-4 ml-4 ">
          <p className="text-blue text-2xl font-medium ">Adicionar Eventos</p>
          <p className=" text-blue text-base font-light">
            Crie o seu próprio evento da maneira que você preferir! :)
          </p>
          {events.map((event, index) => {
            return <CardFilter event={event} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
