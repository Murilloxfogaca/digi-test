"use client";
import { getSingleProducts } from "@/services/getProducts";
import { addToCart, formatMoedaBR, iProduct } from "@/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Single() {
  const pathname = usePathname();

  const formatString = (input: string) => {
    let result = input.replace("/single/", "");
    result = decodeURIComponent(result);
    return result;
  };

  const singleProduct: iProduct | undefined = getSingleProducts(
    formatString(pathname)
  );
  if (singleProduct === undefined) return <></>;

  return (
    <div className="px-4">
      <div className="my-5 flex items-center justify-between"></div>
      <div className="flex align-start flex-col-reverse gap-5 md:flex-row ">
        <div className="mb-6 sm:w-1/2 rounded-lg bg-white px-6 py-8 flex-col flex justify-between">
          <div>
            <h1 className="font-semibold text-3xl text-grey-400">
              {singleProduct.name}
            </h1>
            {singleProduct.offer && (
              <h4 className="text-base font-semibold text-grey-400">
                Código: {singleProduct.offer}
              </h4>
            )}

            {singleProduct.hero && (
              <h4 className="text-base font-semibold text-grey-400">
                {singleProduct.hero}
              </h4>
            )}
            <p className="mt-2 text-grey-400">{singleProduct.detail}</p>
            {singleProduct.info && (
              <p className="mt-1 text-grey-400">{singleProduct.info}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 md:flex-row justify-between">
            <h6 className="mb-0 font-semibold text-4xl">
              {formatMoedaBR(singleProduct.price)}
            </h6>
            <button
              onClick={() => addToCart(singleProduct)}
              role="button"
              className="bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
        <div className="sm:w-1/2 px-6 flex align-start justify-end">
          <Image
            width="400"
            height="400"
            className="h-300 w-300 rounded-lg object-cover"
            src={singleProduct.image}
            alt={singleProduct.name}
          />
        </div>
      </div>
      <button
        onClick={() => history.back()}
        role="button"
        className="bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded"
      >
        Voltar
      </button>
    </div>
  );
}
