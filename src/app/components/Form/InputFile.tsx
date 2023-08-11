'use client';

import { ChangeEvent, useState } from 'react';
interface IImageProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile = ({ onChange }: IImageProps) => {
  const [preview, setPreview] = useState<String>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] || null;

    if (image) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const base64String = e.target?.result;

        setPreview(base64String as string);
      };
      reader.readAsDataURL(image);
      onChange(image);
    }
  };
  return (
    <>
      {preview ? (
        <div
          className="w-full h-full cursor-pointer bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: `url(${preview})` }}
        ></div>
      ) : (
        <input
          type="file"
          className="block w-full h-full opacity-0 cursor-pointer rounded-3xl"
          onChange={handleChange}
        />
      )}
    </>
  );
};
