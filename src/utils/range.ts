/* Функция, которая принимает начальное и конечное числовое значение
и создаёт массив из всех значений между start и end */
export const range = (start: number, end: number): number[] => {
  let length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};
