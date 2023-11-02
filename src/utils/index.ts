import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getAllFormElementValue = <AS extends Record<string, string>>(
  form: HTMLFormElement,
  type: "formData" | "object" = "object",
) => {
  const formPayload = new FormData(form);

  if (type === "object") {
    return Object.fromEntries(formPayload.entries()) as AS;
  }

  return formPayload;
};
