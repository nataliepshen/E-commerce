import React from "react";

import classnames from "classnames/bind";
import { observer } from "mobx-react-lite";
import { ProductInCart } from "store/RootStore/CartStore/types";
import rootStore from "store/RootStore/instance";

import styles from "./CartProducts.module.scss";

export type CartProductsProps = {
  products?: ProductInCart[];
  withDiscount: boolean;
  discount: number | null;
};

const CartProducts: React.FC<CartProductsProps> = ({
  products,
  withDiscount,
  discount,
}) => {
  const cx = classnames.bind(styles);
  return (
    <div className={styles.cartItems_container}>
      {products &&
        products.map((item: ProductInCart) => (
          <div className={styles.cartItem} key={item.id}>
            <div className={styles.imgContainer}>
              <img className={styles.itemImg} src={item.images[0]} alt="" />
            </div>
            <div className={styles.itemTitle}>{item.title}</div>
            <div className={styles.itemQuantity_container}>
              <div className={styles.itemQuantity}>
                <button
                  className={styles.minusPlusBtn}
                  onClick={() => rootStore.cart.reduceProductQuantity(item)}
                >
                  -
                </button>
                <div className={styles.quantity}>{item.quantity}</div>
                <button
                  className={styles.minusPlusBtn}
                  onClick={() => rootStore.cart.addProductQuantity(item)}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.prices}>
              <div className={styles.itemPrice}>
                {withDiscount
                  ? `$${(
                      item.price * item.quantity -
                      (item.price * item.quantity * Number(discount)) / 100
                    ).toFixed(2)}`
                  : `$${(item.price * item.quantity).toFixed(2)}`}
              </div>
              {withDiscount && (
                <div
                  className={cx({
                    itemPrice: true,
                    itemPrice_ifDiscount: withDiscount,
                  })}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default observer(CartProducts);
