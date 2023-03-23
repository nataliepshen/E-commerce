import * as React from "react";

import Card from "components/Card";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "store/models/products";
import rootStore from "store/RootStore/instance";

import styles from "./RelatedItems.module.scss";

export type RelatedItemsProps = {
  items: ProductModel[];
};

const RelatedItems: React.FC<RelatedItemsProps> = ({
  items,
}: RelatedItemsProps) => {
  const navigate = useNavigate();
  const discount = rootStore.user.getDiscount();
  return (
    <div className={styles.items_container}>
      <h4 className={styles.items_title}>Related Items</h4>
      <div className={styles.items}>
        {items.map((item: ProductModel) => (
          <Card
            key={item.id}
            image={item.images[0]}
            title={item.title}
            description={item.description}
            category={item.category.name}
            withDiscount={
              discount !== null && rootStore.user.token ? true : false
            }
            discount={Number(discount)}
            price={item.price.toFixed(2)}
            onClick={() => navigate(`/product/${item.id}`)}
            handleClick={() => rootStore.cart.addProductToCart(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
