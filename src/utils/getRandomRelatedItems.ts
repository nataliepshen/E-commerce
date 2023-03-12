/* Функция, которая из массива связанных товаров рандомно
выбирает три позиции для заполенения Related Items*/

import { normalizeProduct } from "@store/models/normalize";
import { ProductApi, ProductModel } from "@store/models/products";

export const getRandomRelatedItems = (
  itemsArray: ProductApi[]
): ProductModel[] => {
  const randomItemsArray: ProductModel[] = [];
  while (randomItemsArray.length < 3) {
    let item = Math.floor(Math.random() * itemsArray.length);
    if (!randomItemsArray.includes(normalizeProduct(itemsArray[item]))) {
      randomItemsArray.push(normalizeProduct(itemsArray[item]));
    }
  }
  return randomItemsArray;
};
