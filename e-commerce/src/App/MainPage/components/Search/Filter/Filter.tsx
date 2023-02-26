import { useEffect, useState } from "react";

import axios from "axios";

import styles from "./Filter.module.scss";
import { Category } from "../../Catalog/Catalog";

const Filter: React.FC = () => {
  const [showItems, setShowItems] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const handleClickFilter = () => setShowItems(!showItems);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get<Category[]>(
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
          {categories.map((item: Category) => {
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
