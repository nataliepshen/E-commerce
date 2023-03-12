import * as React from "react";

import Card from "components/Card";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "store/models/products";

import styles from "./RelatedItems.module.scss";

export type RelatedItemsProps = {
  items: ProductModel[];
};

const RelatedItems: React.FC<RelatedItemsProps> = ({
  items,
}: RelatedItemsProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.items_container}>
      <h4 className={styles.items_title}>Related Items</h4>
      <div className={styles.items}>
        {items.map((item: ProductModel) => (
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
