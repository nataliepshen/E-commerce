import * as React from "react";

import Card from "@components/Card";
import { ProductModel } from "@store/models/products";
import { useNavigate } from "react-router-dom";

import styles from "./Catalog.module.scss";
import TitleCatalog from "./TitleCatalog";

export type CatalogProps = {
  quantity: number;
  list: ProductModel[];
  categoryName?: string;
};

const Catalog: React.FC<CatalogProps> = ({ quantity, list, categoryName }) => {
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
              subtitle={product.description}
              category={product.category.name}
              content={product.price.toFixed(2)}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(Catalog);
