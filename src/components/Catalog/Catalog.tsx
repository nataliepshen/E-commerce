import * as React from "react";

import Card from "components/Card";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "store/models/products";
import rootStore from "store/RootStore/instance";

import styles from "./Catalog.module.scss";
import TitleCatalog from "./TitleCatalog";

export type CatalogProps = {
  quantity: number;
  list: ProductModel[];
  withDiscount: boolean;
  discount: number | null;
  categoryName?: string;
};

const Catalog: React.FC<CatalogProps> = ({
  quantity,
  list,
  withDiscount,
  discount,
  categoryName,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.catalog_container}>
        <TitleCatalog quantity={quantity} categoryName={categoryName} />
        <div className={styles.catalog}>
          {list.map((product: ProductModel) => (
            <Card
              key={product.id}
              image={product.images[0]}
              title={product.title}
              description={product.description}
              category={product.category.name}
              withDiscount={withDiscount}
              discount={discount}
              price={product.price.toFixed(2)}
              onClick={() => navigate(`/product/${product.id}`)}
              handleClick={() => rootStore.cart.addProductToCart(product)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default observer(Catalog);
