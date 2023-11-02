"use client";

import { useState } from "react";
import { useVendingOptions } from "~/utils/atoms/vending.atom";
import { IconButton, type IconButtonProps } from "../atom/Icons";
import { cn } from "~/utils";
import InventoryEditableRow from "../atom/InventoryEditableRow";

const Fields = ["name", "price", "inventory"] as const;

const Button = ({ className, ...rest }: IconButtonProps) => (
  <IconButton
    className={cn(
      "absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2",
      className,
    )}
    {...rest}
  />
);

const InventoryView = () => {
  const [editMode, setEditMode] = useState<number>();
  const { setVendingOption, vendingOption } = useVendingOptions();

  return (
    <aside className="mx-auto w-full max-w-md text-sm">
      <div className="w-full">
        <header className="grid grid-cols-3 gap-4 bg-gray-50/20 px-4 py-2">
          <div>Item</div>
          <div>Price</div>
          <div>QTY</div>
        </header>
        <ul className="">
          {vendingOption.map(({ id, ...vendOption }) => {
            const isEditMode = editMode === id;

            return (
              <li
                key={id}
                className="relative grid w-full grid-cols-3 gap-4 py-1"
              >
                {Fields.map((field, idx) => (
                  <InventoryEditableRow
                    key={field}
                    className={cn(
                      "p-1.5",
                      idx === Fields.length - 1 && isEditMode
                        ? "max-w-[65%]"
                        : "max-w-[80%]",
                    )}
                    shouldEdit={isEditMode}
                    value={vendOption[field]}
                  />
                ))}

                {!isEditMode ? (
                  <Button
                    type="button"
                    icon="Pencil"
                    onClick={() => setEditMode(id)}
                  />
                ) : (
                  <div className="absolute right-0 top-1/2 flex w-full max-w-[10%] -translate-y-1/2 items-center gap-2 [&>*]:w-[18px]">
                    <IconButton icon="RiCheck" />
                    <IconButton icon="RiClear" />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default InventoryView;
