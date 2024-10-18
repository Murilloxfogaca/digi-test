"use client";
import { iProduct, updateCartProduct } from "@/utils";
import Image from "next/image";

interface iProductWithId extends iProduct {
  key: number;
}

export function Card(props: iProduct) {
  const { image, name, detail, hero, price, offer } = props;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            width="400"
            height="400"
            className="mr-2 h-10 w-10 rounded-full object-cover"
            src={image}
            alt={name}
          />
          <div>
            <h3 className="text-base font-semibold text-gray-900">{name}</h3>
            {hero && (
              <span className="block text-xs font-normal text-gray-500">
                {hero}
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="my-6 text-sm font-normal font-bold text-gray-2s00">
        {detail}
      </p>
      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
        <div className="flex items-center align-center">
          <div>
            {offer && (
              <span className="block text-xs font-normal text-gray-500">
                Offer: {offer}
              </span>
            )}
            R$ <span className="mr-1">{price}</span>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => updateCartProduct(props)}
            role="button"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Ver mais
          </button>
        </div>
      </div>
    </>
  );
}

export default function CardResume(props: iProductWithId) {
  const { key } = props;
  return (
    <div id={String(key)} className="mb-6 rounded-lg bg-white p-6">
      <Card {...props} />
    </div>
  );
}
