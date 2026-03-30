import { z } from "zod";

/** HTTP(S) URL or server-relative upload path e.g. /uploads/photo.jpg */
const imageFieldSchema = z
  .string()
  .refine(
    (val) => {
      if (val.startsWith("/")) return true;
      try {
        // eslint-disable-next-line no-new
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Image must be a valid URL or a path starting with /" }
  );

const baseProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  image: imageFieldSchema.optional(),
  stock: z.number().int().nonnegative(),
  availableSizes: z.array(z.number().int().min(1).max(10)).min(1),
  categoryId: z.string().min(1),
});

export const createProductSchema = baseProductSchema.refine((data) => Boolean(data.image), {
  message: "An image upload or valid image URL is required",
  path: ["image"],
});

export const updateProductSchema = baseProductSchema.partial();
