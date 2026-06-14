import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().max(150, "Subject is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(4000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;
