import { noteCategories } from "../config";

/**
 * Function for get value of category from Map
 * @param {string} key
 * @returns {string}
 */
export function getValueCategory(key) {
  return noteCategories.get(key);
}
