import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  buying_price: z.string().min(1, { message: "Buying price is required" }),
  selling_price: z.string().min(1, { message: "Selling price is required" }),
  stock: z.number().min(1, { message: "Stock is required" }),
  img: z.string().min(1, { message: "Image is required" }),
  brand_name: z.string().min(1, { message: "Brand name is required" }),
  category_name: z.string().min(1, { message: "Category name is required" }),
});

export type AddProductType = z.infer<typeof addProductSchema>;
