"use client";
import { addToCart, encodeURL, iProduct } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface iProductWithId extends iProduct {
  key: number;
}

export function Card(props: iProduct) {
  const { image, name, detail, hero, price, offer, info } = props;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            width="400"
            height="400"
            className="mr-2 h-20 w-20 rounded-full object-cover"
            src={image}
            alt={name}
          />
          <Link href={`/single/${encodeURL(name)}`}>
            <h2 className="text-base font-semibold text-rose-600 text-2xl">
              {name}
            </h2>
            {hero && (
              <span className="block text-xs font-normal text-gray-500">
                {hero}
              </span>
            )}
          </Link>
        </div>
      </div>
      <p className="my-6 text-sm font-normal font-bold text-gray-2s00">
        <u className="text-rose-600">Descrição</u>: {detail}
        {info && (
          <>
            <br /> {info}
          </>
        )}
      </p>
      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
        <div className="flex items-center align-center">
          <div>
            {offer && (
              <span className="block text-xs font-normal text-rose-600">
                Código: {offer}
              </span>
            )}
            <b className="text-rose-600 text-2xl">
              R$ <span className="mr-1">{price}</span>
            </b>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => addToCart(props)}
            role="button"
            className="bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded"
          >
            Adicionar ao carrinho
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
