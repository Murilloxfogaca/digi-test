import { getSingleProducts } from "@/services/getProducts";
import { iProduct } from "@/utils";
import Image from "next/image";

export default function Single() {
  const singleProduct: iProduct | undefined = getSingleProducts("Product 1");
  if (singleProduct === undefined) return <></>;

  return (
    <div className="px-4">
      <div className="my-5 flex items-center justify-between"></div>
      <div className="flex align-start">
        <div className="mb-6 sm:w-1/2 rounded-lg bg-white px-6 py-8">
          <h1 className="font-semibold text-3xl text-grey-400">
            {singleProduct.name}
          </h1>
          {singleProduct.offer && (
            <h4 className="text-base font-semibold text-grey-400">
              {singleProduct.offer}
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
          <h6 className="mb-0 font-semibold text-4xl">
            R$ {singleProduct.price}
          </h6>
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
    </div>
  );
}
