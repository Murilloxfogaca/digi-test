import CardResume, {
  Card as CardResumeWithoutKey,
} from "@/components/cardResume";
import { getAllProducts, getSingleProductHero } from "@/services/getProducts";
import { iProduct } from "@/utils";

export default function Home() {
  const singleHero: iProduct | undefined = getSingleProductHero();

  return (
    <>
      <div className="px-4">
        <div className="my-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Produto Destacado
          </h2>
        </div>

        <div className="sm:w-1/2 rounded-lg bg-white">
          <div className="mb-6 rounded-lg bg-white p-6">
            {singleHero !== undefined && (
              <CardResumeWithoutKey {...singleHero} />
            )}
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="my-5">
          <h2 className="text-lg font-semibold text-gray-900">Produtos</h2>
        </div>
        <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
          {getAllProducts().map((product: iProduct, index) => (
            <CardResume key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}
