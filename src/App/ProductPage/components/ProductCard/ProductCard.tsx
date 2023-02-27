import { useEffect, useState } from "react";

import axios from "axios";
import { Product } from "src/App/MainPage/components/Catalog";

import styles from "./ProductCard.module.scss";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import RelatedItems from "./RelatedItems";

export type ProductCardProps = {
  id: string | undefined;
};

const ProductCard: React.FC<ProductCardProps> = ({ id }) => {
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      setProduct(data);
    };
    fetch();
  }, [id]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 200 });
  }, [id]);
  return (
    <div>
      {product && (
        <div>
          <div className={styles.card}>
            <ProductImage images={product.images} />
            <ProductInfo
              name={product.title}
              description={product.description}
              price={product.price}
            />
          </div>
          <RelatedItems id={product.category.id} item_id={product.id} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
