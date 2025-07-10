import { z } from "zod";
// import { PASSWORD_ERROR, PASSWORD_REGEX } from "@/logic/validations/login";

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase(),

//   newPassword: z.string().regex(PASSWORD_REGEX, PASSWORD_ERROR),

  token: z
    .string()
    .trim()
    .min(8, "At least 8 characters long")
    .max(8, "At most 8 characters long")
    .toUpperCase(),
});