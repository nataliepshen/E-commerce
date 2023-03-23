/* Функция, которая возвращает дату в формате дд/мм/гггг из объекта Date */

export const formatDate = (date: Date) => {
  let dd: string | number = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm: string | number = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yyyy = date.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
};
