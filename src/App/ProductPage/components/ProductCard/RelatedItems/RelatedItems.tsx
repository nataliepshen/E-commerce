import Card from "@components/Card";
import { useNavigate } from "react-router-dom";
import { Product } from "src/App/MainPage/components/Catalog";

import styles from "./RelatedItems.module.scss";

export type RelatedItemsProps = {
  items: Product[];
};

const RelatedItems = ({ items }: RelatedItemsProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.items_container}>
      <h4 className={styles.items_title}>Related Items</h4>
      <div className={styles.items}>
        {items.map((item: Product) => (
          <Card
            key={item.id}
            image={item.images[0]}
            title={item.title}
            subtitle={item.description}
            category={item.category.name}
            content={item.price.toFixed(2)}
            onClick={() => navigate(`/product/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
