import { z } from "zod";
import { createInputNumberSchema, createStringSchema } from "./helpers";

export const VendingOptionSchema = z.object({
  name: createStringSchema("Name"),
  price: createInputNumberSchema("Price"),
  inventory: createInputNumberSchema("Inventory"),
});

export const VendingChangeSchema = z.object({
  amount: createInputNumberSchema("Amount"),
  inStore: createInputNumberSchema("In stock"),
});
