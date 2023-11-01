"use client";
import VendingDisplay from "../atom/VendingDisplay";
import { VendingOptions } from "../data";

const Vending = () => (
  <div className="grid w-full max-w-sm grid-cols-3 gap-6 bg-[#202022] p-3">
    {VendingOptions.map(({ id, name }) => (
      <div
        className="flex flex-col rounded-md bg-[#151515]/50 p-3 text-center"
        key={id}
      >
        <span>{id}</span>
        <p>{name}</p>
      </div>
    ))}
    <VendingDisplay title="Price" />
  </div>
);

export default Vending;
