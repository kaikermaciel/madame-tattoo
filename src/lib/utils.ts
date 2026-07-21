import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário para combinar classes do Tailwind CSS de forma condicional
 * e resolver conflitos de estilização automaticamente.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}