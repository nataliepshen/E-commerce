import { CategoryModel } from "@store/models/products";
import rootStore from "@store/RootStore/instance";
import classnames from "classnames/bind";

import styles from "./Filter.module.scss";

export type FilterProps = {
  handleClickFilter: () => void;
  showItems: boolean;
  categoryList: CategoryModel[];
  selected: boolean;
  setCategory: (id: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  handleClickFilter,
  showItems,
  categoryList,
  selected,
  setCategory,
}) => {
  const cx = classnames.bind(styles);
  return (
    <div>
      <button className={styles.filter} onClick={handleClickFilter}>
        <div className={styles.filter_icon}></div>
        Filter
      </button>
      {showItems && (
        <ul className={styles.filter_list}>
          {categoryList.map((item: CategoryModel) => {
            return (
              <li
                key={item.id}
                className={cx({
                  filter_item: true,
                  filter_item_selected:
                    item.id === rootStore.query.getParam("categoryId"),
                })}
                onClick={
                  rootStore.query.getParam("categoryId") === item.id
                    ? () => setCategory("")
                    : () => setCategory(item.id)
                }
              >
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
