/* Функция, которая из массива связанных товаров рандомно
выбирает три позиции для заполенения Related Items*/

import { normalizeProduct } from "store/models/normalize";
import { ProductApi, ProductModel } from "store/models/products";

export const getRandomItems = (
  itemsArray: ProductApi[],
  needItems: number
): ProductModel[] => {
  const randomItemsArray: ProductModel[] = [];
  while (randomItemsArray.length < needItems) {
    let index = Math.floor(Math.random() * itemsArray.length);
    if (!randomItemsArray.find((item) => item.id === itemsArray[index].id)) {
      randomItemsArray.push(normalizeProduct(itemsArray[index]));
    }
  }
  return randomItemsArray;
};
