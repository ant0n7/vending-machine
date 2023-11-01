"use client";
import { useState } from "react";
import VendingDisplay from "../atom/VendingDisplay";
import { VendingOptions } from "../data";

const PriceRange = [0.05, 0.1, 0.2, 0.5, 1.0, 2.0, 5.0];

const Vending = () => {
  const [price, setPrice] = useState<number>();
  const [amountEntered, setAmountEntered] = useState<number>();

  const leftToPay = (price ?? 0) - (amountEntered ?? 0) || undefined;

  return (
    <div className="grid w-full max-w-sm grid-cols-3 gap-6 bg-[#202022] p-3 text-sm">
      {VendingOptions.map(({ id, name }) => (
        <div
          className="flex flex-col rounded-md bg-[#151515]/50 p-3 text-center text-base"
          key={id}
        >
          <span>{id}</span>
          <p>{name}</p>
        </div>
      ))}
      <div className="col-span-3 grid grid-cols-3 gap-6 text-center">
        <VendingDisplay title="Price" value={price} />
        <VendingDisplay title="Left to pay" value={leftToPay} />
        <VendingDisplay title="Coins Inputted" value={amountEntered} />
      </div>
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <div>
          <span>Number</span>
          <div
            contentEditable
            className="mt-1 h-20 w-full overflow-auto rounded-md bg-[#ccc]/10 p-3 outline-none focus-within:ring"
            onKeyDown={(event) => {
              console.log(event);
            }}
          ></div>
        </div>
        <div>
          <p>Coin Input</p>
          <div className="mt-1 grid grid-cols-4 gap-2">
            {PriceRange.map((n) => (
              <button
                type="button"
                key={n}
                className="flex items-center justify-center border p-1 text-xs"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vending;
