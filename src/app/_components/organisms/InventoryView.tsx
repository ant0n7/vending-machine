"use client";

import { useState } from "react";
import { useVendingOptions } from "~/utils/atoms/vending.atom";
import { IconButton, type IconButtonProps } from "../atom/Icons";
import { cn, getAllFormElementValue } from "~/utils";
import InventoryEditableRow from "../atom/InventoryEditableRow";
import { VendingOptionSchema } from "~/utils/zod/schema";

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

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = getAllFormElementValue(e.currentTarget);

    try {
      const res = VendingOptionSchema.safeParse(data);

      if (res.success) {
        const { inventory, name, price } = res.data;
        const newVendingOptions = vendingOption.map((option) => {
          if (option.id === editMode) {
            return {
              id: option.id,
              inventory: Number(inventory),
              price: Number(price),
              name: name,
            };
          }

          return option;
        });

        setVendingOption(newVendingOptions);
        setEditMode(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="mx-auto w-full max-w-md text-sm">
      <div className="w-full">
        <header className="grid grid-cols-3 gap-4 bg-gray-50/20 px-4 py-2">
          <div>Item</div>
          <div>Price</div>
          <div>QTY</div>
        </header>
        <div className="">
          {vendingOption.map(({ id, ...vendOption }) => {
            const isEditMode = editMode === id;

            return (
              <form
                key={id}
                className="relative grid w-full grid-cols-3 gap-4 py-1"
                onSubmit={handleSave}
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
                    name={field}
                    type={field !== "name" ? "number" : "text"}
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
                    <IconButton type="submit" icon="RiCheck" />
                    <IconButton
                      onClick={() => setEditMode(undefined)}
                      icon="RiClear"
                    />
                  </div>
                )}
              </form>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default InventoryView;
