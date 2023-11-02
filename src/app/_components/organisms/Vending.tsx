"use client";
import { useState } from "react";
import VendingDisplay from "../atom/VendingDisplay";
import { PriceRange, VendingOptions } from "../data";
import toast from "react-hot-toast";
import { type SyntheticEvent } from "react";
import { cn } from "~/utils";

const Vending = () => {
  const [price, setPrice] = useState<number>();
  const [amountEntered, setAmountEntered] = useState<number>();
  const [selected, setSelected] = useState<number>();

  const leftToPay = (price ?? 0) - (amountEntered ?? 0) || undefined;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selected) {
      const selectedOption = VendingOptions.find(({ id }) => selected === id);

      if (selectedOption) {
        setPrice(selectedOption.price);
      } else {
        toast.error("Please choose a right option");
        setPrice(undefined);
      }
    } else {
      toast.error("Option cannot be blank");
    }
  };

  const handlePriceChange = (num: number) => {
    if (price) {
      setAmountEntered((prev) => (prev ?? 0) + num);
    } else {
      toast.error("You are yet to make a choice");
    }
  };
  const selectedVending = VendingOptions.find(({ id }) => selected === id);

  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-2 bg-[#202022] p-3 text-sm">
      {VendingOptions.map(({ id, name }) => (
        <button
          type="button"
          className={cn(
            "flex cursor-pointer flex-col items-center rounded bg-[#151515]/50 p-3 text-center text-base",
            selected === id && "bg-blue-950/10 ring",
          )}
          key={id}
          onClick={() => setSelected(id)}
        >
          <span>{id}</span>
          <p>{name}</p>
        </button>
      ))}

      <div className="col-span-3 my-3 grid grid-cols-3 gap-2 [&>*]:pl-2">
        <VendingDisplay title="Price" value={price} />
        <VendingDisplay title="Left to pay" value={leftToPay} />
        <VendingDisplay title="Coins Inputted" value={amountEntered} />
      </div>
      <div className="col-span-3 mb-6 flex items-center justify-between bg-slate-500/10 px-4 py-2">
        <span className="font-bold">You selected:</span>
        {price && <span>{selectedVending?.name}</span>}
      </div>
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <form onSubmit={handleSubmit}>
          <span>Number</span>
          <input
            type="number"
            placeholder="Enter Number of option"
            className="mt-1 w-full rounded-md bg-[#ccc]/10 p-3 outline-none focus-within:ring"
            onChange={(e) => setSelected(Number(e.target.value))}
            value={selected}
          />
          <button
            type="submit"
            className="mt-2 w-full rounded bg-black py-2 text-sm"
          >
            Enter
          </button>
        </form>
        <form>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p>Coin Input</p>
            <button
              type="button"
              className="rounded bg-black px-6 py-2 text-sm"
            >
              Pay
            </button>
          </div>
          <div className="mt-1 grid grid-cols-4 gap-2">
            {PriceRange.map((n) => (
              <button
                type="button"
                key={n}
                className="flex items-center justify-center border py-2.5 text-xs"
                onClick={() => handlePriceChange(n)}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => {
                if (amountEntered) {
                  setAmountEntered(0);
                }
              }}
              className="flex items-center justify-center border py-2.5 text-xs"
            >
              X
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Vending;
