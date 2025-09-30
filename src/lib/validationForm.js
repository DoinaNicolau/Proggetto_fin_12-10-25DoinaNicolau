import { z } from "zod";

// Regex password corretta (senza spazi indesiderati)
const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, and one number.";

// Schema principale
export const FormSchema = z.object({
  email: z.string().email("Invalid email"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRegex, passwordError),
});

// Alias per conferma se serve (senza refine se non fai altre condizioni)
export const ConfirmSchema = FormSchema;

// Funzione per validare un singolo campo
export function getFieldError(property, value) {
  const singleSchema = FormSchema.shape[property];
  const result = singleSchema.safeParse(value);
  return result.success
    ? undefined
    : result.error.issues.map((i) => i.message).join(", ");
}

// Funzione per estrarre tutti gli errori da un safeParse fallito
export const getErrors = (error) => {
  const formatted = {};
  error.issues.forEach((issue) => {
    const path = issue.path[0];
    const message = formatted[path] ? formatted[path] + ", " : "";
    formatted[path] = message + issue.message;
  });
  return formatted;
};
