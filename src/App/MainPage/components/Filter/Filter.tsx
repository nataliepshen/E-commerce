import { useEffect, useState } from "react";

import { CategoryApi, CategoryModel } from "@store/models/products";
import axios from "axios";

import styles from "./Filter.module.scss";

const Filter: React.FC = () => {
  const [showItems, setShowItems] = useState(false);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const handleClickFilter = () => setShowItems(!showItems);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get<CategoryApi[]>(
        "https://api.escuelajs.co/api/v1/categories"
      );
      setCategories(data);
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <button className={styles.filter} onClick={handleClickFilter}>
        <div className={styles.filter_icon}></div>
        Filter
      </button>
      {showItems && (
        <ul className={styles.filter_list}>
          {categories.map((item: CategoryModel) => {
            return (
              <li key={item.id} className={styles.filter_item}>
                {item.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Filter;
