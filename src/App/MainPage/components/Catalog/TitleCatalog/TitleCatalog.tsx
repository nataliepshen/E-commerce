import { memo } from "react";

import styles from "./TitleCatalog.module.scss";

export type TitleCatalogProps = {
  quantity: number;
  categoryName?: string;
};

const TitleCatalog: React.FC<TitleCatalogProps> = ({
  quantity,
  categoryName,
}) => {
  return (
    <div className={styles.title_container}>
      {categoryName ? (
        <h3 className={styles.titleCat}>{categoryName}</h3>
      ) : (
        <h3 className={styles.titleCat}>Total Product</h3>
      )}
      <div className={styles.quantity}>{quantity}</div>
    </div>
  );
};

export default memo(TitleCatalog);
