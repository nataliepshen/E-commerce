import * as React from "react";

import classnames from "classnames/bind";
import Button from "components/Button";
import { Link } from "react-router-dom";
import { ProductModel } from "store/models/products";
import rootStore from "store/RootStore/instance";

import styles from "./ProductInfo.module.scss";

export type ProductInfoProps = {
  name: string;
  description: string;
  price: number;
  product: ProductModel;
  withDiscount: boolean;
  discount: number | null;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  price,
  product,
  withDiscount,
  discount,
}) => {
  const cx = classnames.bind(styles);
  return (
    <div className={styles.info_container}>
      <div>
        <h2 className={styles.prod_name}>{name}</h2>
        <p className={styles.prod_description}>{description}</p>
      </div>
      <div>
        <div className={styles.prices}>
          <h2 className={styles.prod_price}>
            {withDiscount
              ? `$${(
                  Number(price) -
                  (Number(price) * Number(discount)) / 100
                ).toFixed(2)}`
              : `$${price.toFixed(2)}`}
          </h2>
          {withDiscount && (
            <h2
              className={cx({
                prod_price: true,
                prod_price_ifDiscount: withDiscount,
              })}
            >
              ${price.toFixed(2)}
            </h2>
          )}
        </div>
        <div className={styles.btn_container}>
          <Link to="/cart">
            <Button
              className={styles.buy_btn}
              onClick={() => rootStore.cart.addProductToCart(product)}
            >
              Buy Now
            </Button>
          </Link>
          <Button
            className={styles.add_btn}
            onClick={() => rootStore.cart.addProductToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductInfo);
