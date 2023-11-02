import { z } from "zod";
import { createInputNumberSchema, createStringSchema } from "./helpers";

export const VendingOptionSchema = z.object({
  name: createStringSchema("Name"),
  price: createInputNumberSchema("Inventory"),
  inventory: createInputNumberSchema("Inventory"),
});
