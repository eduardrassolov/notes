import { noteCategories } from "../config";

export function getValueCategory(key) {
  return noteCategories.get(key);
}
