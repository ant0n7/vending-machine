"use client";

import { cn, getAllFormElementValue } from "~/utils";
import { useVendingChange } from "~/utils/atoms/vending.atom";
import InventoryEditableRow from "../atom/InventoryEditableRow";
import { useState } from "react";
import { IconButton } from "../atom/Icons";
import { EditButton } from "./InventoryView";
import { VendingChangeSchema } from "~/utils/zod/schema";
import toast from "react-hot-toast";
import { handleOneLevelZodError } from "~/utils/zod/helpers";

const Fields = ["amount", "inStore"] as const;

const ChangeManagement = () => {
  const [editMode, setEditMode] = useState<number>();
  const { setVendingChange, vendingChange } = useVendingChange();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = getAllFormElementValue(e.currentTarget);

    const res = VendingChangeSchema.safeParse(data);

    if (res.success) {
      const { amount, inStore } = res.data;
      const newVendingOptions = vendingChange.map((option) => {
        if (option.id === editMode) {
          return {
            id: option.id,
            amount: Number(amount),
            inStore: Number(inStore),
          };
        }

        return option;
      });

      setVendingChange(newVendingOptions);
      setEditMode(undefined);
    }

    if (!res.success) {
      console.log(res.error);

      const err = handleOneLevelZodError(res.error);

      if (err) {
        if (typeof err === "string") {
          toast.error(err);
        } else {
          const [k1] = Object.keys(err);

          const errK1 = err?.[k1!];

          toast.error(errK1 ?? "Please check input values");
        }
      } else {
        toast.error("Incorrect values passed");
      }
    }
  };

  return (
    <div>
      <div className="w-full">
        <header className="grid grid-cols-3 gap-4 bg-gray-50/20 px-4 py-2">
          <div>Change</div>
          <div>In Stock</div>
          <div>Total</div>
        </header>
        <div className="">
          {vendingChange.map(({ id, ...change }) => {
            const isEditMode = editMode === id;

            return (
              <form
                key={change.amount}
                className="relative grid w-full grid-cols-3 gap-4 py-1"
                onSubmit={handleSave}
              >
                {Fields.map((field) => (
                  <InventoryEditableRow
                    key={field}
                    className={cn("p-1.5")}
                    shouldEdit={isEditMode}
                    value={change[field]}
                    name={field}
                    type="number"
                  />
                ))}

                <div
                  className={cn(
                    "select-none",
                    isEditMode ? "max-w-[65%] pt-1" : "max-w-[83%]",
                  )}
                >
                  {isEditMode
                    ? "---"
                    : (change.amount * change.inStore).toFixed(2)}
                </div>

                {!isEditMode ? (
                  <EditButton
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
    </div>
  );
};

export default ChangeManagement;
