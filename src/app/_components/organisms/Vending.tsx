"use client";
import { useState } from "react";
import { PriceRange } from "../data";
import toast from "react-hot-toast";
import { type SyntheticEvent } from "react";
import { cn } from "~/utils";
import {
  useVendingChange,
  useVendingOptions,
} from "~/utils/atoms/vending.atom";
import VendingDisplay from "../atom/VendingDisplay";
import { getChange } from "~/utils/getChange";

const Vending = () => {
  const [price, setPrice] = useState<number>();
  const [amountEntered, setAmountEntered] = useState<number>();
  const [selectedStr, setSelectedStr] = useState("");

  const selected = Number(selectedStr);

  const { vendingOption, setVendingOption } = useVendingOptions();
  const { setVendingChange, vendingChange } = useVendingChange();

  const leftToPay = (price ?? 0) - (amountEntered ?? 0) || undefined;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (selected) {
      const selectedOption = vendingOption.find(({ id }) => selected === id);

      if (selectedOption) {
        if (selectedOption.inventory > 0) {
          setPrice(selectedOption.price);
        } else {
          toast.error(`${selectedOption.name} is currently out of stock`);
        }
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
  const selectedVending = vendingOption.find(({ id }) => selected === id);

  const change = (leftToPay ?? 0) < 1 ? (leftToPay ?? 0) * -1 : 0.0;

  const positiveLeftToPay = (() => {
    if (leftToPay) {
      return leftToPay < 0 ? 0.0 : leftToPay;
    }

    return leftToPay;
  })();

  console.log(change);

  const handlePay = () => {
    if (selected) {
      if (typeof price !== "undefined") {
        if ((amountEntered ?? 0) >= (price ?? 0)) {
          const newElement = vendingOption.map((ele) => {
            if (ele.id === selected) {
              return { ...ele, inventory: ele.inventory - 1 };
            }

            return ele;
          });

          if (!change || (change && !CHANGE_ONLY_MODE)) {
            setVendingOption(newElement);
            setPrice(undefined);
            setSelectedStr("");
            setAmountEntered(undefined);
            toast.success("Payment made successfully");
          }
        } else {
          toast.error("Amount entered is smaller than price");
        }
      } else {
        toast.error("Click enter to select element");
      }
    }

    if (change) {
      if (!CHANGE_ONLY_MODE) {
        const newChangeArr = getChange(change, vendingChange);

        setVendingChange(newChangeArr);
        toast.success(`You have been given ${change.toFixed(2)} as change`);
      } else {
        toast.error("Please enter the exact amount");
      }
    }
  };

  const CHANGE_ONLY_MODE = vendingChange.some((ele) => ele.inStore <= 0);

  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-2 bg-[#202022] p-3 text-sm">
      {vendingOption.map(({ id, name, inventory }) => (
        <div
          className={cn(
            "relative flex cursor-auto flex-col items-center rounded bg-[#151515]/50 p-3 text-center text-base",
            price && selected === id && "bg-blue-950/10 ring",
            !inventory && "cursor-not-allowed",
          )}
          key={id}
        >
          <span>{id}</span>
          <p>{name}</p>
          {inventory <= 0 && (
            <div className="absolute bottom-0 left-0 right-0 flex h-1/2 items-center justify-center rounded bg-black p-1 px-3 text-xs">
              Out of stock
            </div>
          )}
        </div>
      ))}

      <div className="col-span-3 my-3 grid grid-cols-3 gap-2 [&>*]:pl-2">
        <VendingDisplay title="Price" value={price} />
        <VendingDisplay title="Left to pay" value={positiveLeftToPay} />
        <VendingDisplay title="Coins Inputted" value={amountEntered} />
      </div>
      <div className="col-span-3 mb-5 space-y-1">
        <div className="col-span-3 flex items-center justify-between bg-slate-500/10 px-4 py-2">
          <span className="font-bold">You selected:</span>
          {price && <span>{selectedVending?.name}</span>}
        </div>

        <div className="col-span-3 flex items-center justify-between bg-slate-500/10 px-4 py-2">
          {CHANGE_ONLY_MODE ? (
            <div className="w-full text-center text-red-600">
              Accepting only exact change
            </div>
          ) : (
            <>
              <span className="font-bold">You Change:</span>
              {leftToPay && <span>{change.toFixed(2)}</span>}
            </>
          )}
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <form onSubmit={handleSubmit}>
          <span>Number</span>
          <input
            type="number"
            placeholder="Enter Number of option"
            className="mt-1 w-full rounded-md bg-[#ccc]/10 p-3 outline-none focus-within:ring"
            onChange={(e) => setSelectedStr(e.target.value)}
            value={selectedStr}
          />
          <button
            type="submit"
            className="mt-2 w-full rounded bg-black py-2 text-sm"
          >
            Enter
          </button>
        </form>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p>Coin Input</p>
            <button
              type="button"
              className="rounded bg-black px-6 py-2 text-sm"
              onClick={handlePay}
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
              type="button"
              className="flex items-center justify-center border py-2.5 text-xs"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vending;
