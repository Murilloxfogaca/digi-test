"use client";
import {
  clearCart,
  formatMoedaBR,
  getCartFromCookies,
  iProduct,
  removeFromCart,
} from "@/utils";
import { useEffect, useState } from "react";

interface iCart extends iProduct {
  quantity: number;
}

export function CartBar() {
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState<iProduct[]>([]);
  const [totalCart, setTotalCart] = useState<number>(0);
  const [cartExibition, setCartExibition] = useState<iCart[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    handlerUpdateHydrated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerUpdateHydrated = () => {
    const loadedCart = getCartFromCookies();
    setCart(loadedCart);
    setIsHydrated(true);
    setCartExibition(unitedCart(cart));
    setTotalCart(handlerGetTotalCart(cart));
  };

  const handlerGetTotalCart = (data: iProduct[]): number => {
    let addNewValue = 0;

    data.forEach((produto) => {
      addNewValue += Number(produto.price);
    });

    return addNewValue;
  };

  const unitedCart = (data: iProduct[]): iCart[] => {
    const produtoContador = new Map<string, iCart>();
    data.forEach((produto) => {
      const key = JSON.stringify(produto);
      if (produtoContador.has(key)) {
        produtoContador.get(key)!.quantity! += 1;
      } else {
        produtoContador.set(key, { ...produto, quantity: 1 });
      }
    });

    return Array.from(produtoContador.values());
  };

  const handleRemoveItem = (productName: string) => {
    removeFromCart(productName);
    setCart(getCartFromCookies());
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
  };

  return (
    <div className="p-5" onClick={() => handlerUpdateHydrated()}>
      <div className="flex justify-center">
        <div className="relative ">
          <div className="flex flex-row cursor-pointer truncate p-2 px-4 rounded">
            <div className="flex flex-row-reverse ml-2 w-full">
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-shopping-cart w-6 h-6 mt-2"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div
            className="absolute w-full  rounded-b border-t-0 z-10"
            style={{ right: "190px" }}
          >
            {show && (
              <div className="shadow-xl w-64">
                {isHydrated &&
                  cartExibition.map((product, index) => (
                    <div
                      key={index}
                      className="p-4 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                    >
                      <div className="flex-auto text-sm w-32">
                        <div className="font-bold">{product.name}</div>
                        <div className="truncate">{product.detail}</div>
                        <div className="text-gray-400">
                          Qt: {product.quantity}
                        </div>
                      </div>
                      <div className="flex flex-col w-18 font-medium items-end">
                        <button
                          role="button"
                          onClick={() => handleRemoveItem(product.name)}
                          className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2 "
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                        {formatMoedaBR(product.price)}
                      </div>
                    </div>
                  ))}

                <div className="p-4 bg-gray-100">
                  <button
                    onClick={handleClearCart}
                    className="mx-auto block bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded"
                  >
                    Limpar Carrinho
                  </button>
                  <button className="mx-auto block text-rose-700 text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer">
                    Total: {formatMoedaBR(String(totalCart))}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
