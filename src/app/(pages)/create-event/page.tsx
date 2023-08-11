'use client';
import { Button } from '@/app/components/Form/Button';
import { Input } from '@/app/components/Form/Input';
import { AutoComplete } from '@/app/components/Form/InputAutoComplete';
import { InputFile } from '@/app/components/Form/InputFile';
import { categories } from '@/app/utils/categories';
import { fetchWrapper } from '@/app/utils/fetchWrapper';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
interface IFormProps {
  title: string;
  cupom: string;
  date: string;
  latitude: string;
  longitude: string;

  time: string;
  price: string;
  sector: string;
  description: string;
  categories: string;
  map: File;
  banner: File;
}

export default function CreateEvent() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormProps>();
  const [flyers, setFlyers] = useState<File[]>([]);
  const onSubmit = async (data: IFormProps) => {
    console.log('🚀 ~ file: page.tsx:35 ~ onSubmit ~ data:', data);
    const formattedDate = new Date(`${data.date}T${data.time}`);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('cupom', data.cupom);
    formData.append('date', formattedDate.toISOString());
    formData.append('location[latitude]', data.latitude);
    formData.append('location[longitude]', data.longitude);
    formData.append('price[amount]', data.price);
    formData.append('price[sector]', data.sector);
    formData.append('description', data.description);
    formData.append('categories', data.categories);

    // formData.append('map', data.map);
    formData.append('banner', data.banner);
    flyers.forEach((flyer) => {
      formData.append('flyers', flyer);
    });
    try {
      const response = await fetchWrapper(`/events`, {
        method: 'POST',
        body: formData,
      });
      toast.success('Evento criado com sucesso!');
      console.log('🚀 ~ file: page.tsx:49 ~ onSubmit ~ response:', response);
    } catch (error) {
      toast.error('Erro ao criar evento');
      console.log('🚀 ~ file: page.tsx:48 ~ onSubmit ~ error:', error);
    }
  };
  const handleFileChange = (name: any, file: File) => {
    if (name === 'flyers') {
      setFlyers([...flyers, file]);
    } else {
      setValue(name, file);
    }
  };
  const onSelect = (address: any) => {
    setValue('latitude', address.lat);
    setValue('longitude', address.lng);
  };
  return (
    <div className="container m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-1 grid-cols-1 p-8">
          <div className="mb-4 pr-6 border-r-2 border-[#61D9DE] ">
            <div className="mb-4">
              <p className="text-blue text-2xl font-medium">
                Adicionar Eventos
              </p>
              <p className=" text-blue text-base font-light">
                Crie o seu próprio evento da maneira que você preferir! :)
              </p>
            </div>
            <Input
              title="Título"
              placeholder="Insira o nome do seu evento"
              type="text"
              {...register('title')}
            />
            {errors.title && (
              <span className="text-red-500">Campo obrigatório</span>
            )}
            <AutoComplete onSelect={onSelect} />
            <Input
              title="Cupom"
              placeholder="Insira o endereço do seu evento"
              type="text"
              {...register('cupom')}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                title="Data"
                placeholder="Insira o endereço do seu evento"
                type="date"
                {...register('date')}
              />
              <Input
                title="Horário"
                placeholder="Insira o endereço do seu evento"
                type="time"
                {...register('time')}
              />
            </div>
            <p className=" text-blue text-base font-medium mb-4">
              Crie o seu próprio evento da maneira que você preferir! :)
            </p>
            <div className="grid grid-cols-5 gap-2">
              {categories.map((category) => (
                <div className="text-blue ">
                  <input
                    type="checkbox"
                    className="mr-2 "
                    {...register('categories')}
                    value={category.name}
                  />
                  <label htmlFor="">{category.name}</label>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-base font-medium text-blue">Valor</p>
              <p className="text-neutral-500 text-sm font-light">
                Caso seu evento seja gratuito, o campo deverá ficar vazio. Caso
                haja mais de um setor, basta adicionar a seção. Se houver cupom
                promocional, basta colocar o código no campo “cupom”.
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <Input
                title="Preço"
                placeholder="R$00,00"
                type="text"
                className="col-span-2"
                {...register('price')}
              />
              <Input
                title="Setor"
                placeholder="Insira o nome do setor"
                type="text"
                className="col-span-3"
                {...register('sector')}
              />
            </div>
            <Input
              title="Descrição"
              placeholder="Insira o nome do setor"
              type="textarea"
              className="col-span-3"
              {...register('description')}
            />
          </div>
          <div className="mb-4 ml-4 ">
            <p className="text-blue text-2xl font-medium">Adicionar Eventos</p>
            <p className=" text-blue text-base font-light">
              Crie o seu próprio evento da maneira que você preferir! :)
            </p>
            <div className="my-4">
              <p className="text-blue  text-base font-medium">Banner</p>
              <p className="text-neutral-500 text-sm font-light">
                Insira um banner no formato 336x280
              </p>
              <div className="w-full  h-28 bg-zinc-300 rounded-3xl shadow">
                <InputFile
                  {...register('banner')}
                  onChange={(e) => handleFileChange('banner', e)}
                />
              </div>
            </div>
            <div className="my-4">
              <p className="text-blue  text-base font-medium">Flyers</p>
              <p className="text-neutral-500 text-sm font-light">
                Insira até três flyers
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="w-full  h-28 bg-zinc-300 rounded-3xl shadow">
                  <InputFile onChange={(e) => handleFileChange('flyers', e)} />
                </div>
                <div className="w-full  h-28 bg-zinc-300 rounded-3xl shadow">
                  <InputFile onChange={(e) => handleFileChange('flyers', e)} />
                </div>
                <div className="w-full  h-28 bg-zinc-300 rounded-3xl shadow">
                  <InputFile onChange={(e) => handleFileChange('flyers', e)} />
                </div>
              </div>
            </div>
            <div className="my-4">
              <p className="text-blue  text-base font-medium">Mapa do Evento</p>
              <p className="text-neutral-500 text-sm font-light">
                Insira o Mapa do Evento indicando os setores
              </p>
              <div className="w-full  h-56 bg-zinc-300 rounded-3xl shadow">
                <InputFile
                  {...register('map')}
                  onChange={(e) => handleFileChange('map', e)}
                />
              </div>
            </div>
            <Button title="Cadastrar Evento" />
          </div>
        </div>
      </form>
    </div>
  );
}
