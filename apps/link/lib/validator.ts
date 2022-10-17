import __isSlug from "validator/es/lib/isSlug";
import __isURL from "validator/es/lib/isURL";

export const isSlug = (value: string) => __isSlug(value);
export const isURL = (value: string) => __isURL(value, { require_protocol: true });
