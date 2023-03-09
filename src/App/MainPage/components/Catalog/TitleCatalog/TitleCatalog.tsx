import { memo } from "react";

import styles from "./TitleCatalog.module.scss";

export type TitleCatalogProps = {
  quantity: number;
};

const TitleCatalog: React.FC<TitleCatalogProps> = ({ quantity }) => {
  return (
    <div className={styles.title_container}>
      <h3 className={styles.titleCat}>Total Product</h3>
      <div className={styles.quantity}>{quantity}</div>
    </div>
  );
};

export default memo(TitleCatalog);
