import React from "react";

import classnames from "classnames/bind";
import Button from "components/Button";
import { observer } from "mobx-react-lite";
import rootStore from "store/RootStore/instance";

import styles from "./CartTotal.module.scss";

export type CartTotalProps = {
  withDiscount: boolean;
  discount: number | null;
};

const CartTotal: React.FC<CartTotalProps> = ({ withDiscount, discount }) => {
  const totalItemsSum = rootStore.cart.totalSum;
  const totalDiscount = (totalItemsSum * Number(discount)) / 100;
  const shipping = totalItemsSum > 1000 ? totalItemsSum * 0.01 : 10;
  const cx = classnames.bind(styles);

  const handleClick = () => {
    withDiscount
      ? rootStore.user.addOrder(
          rootStore.cart.productsInCart,
          totalItemsSum - totalDiscount + shipping
        )
      : rootStore.user.addOrder(
          rootStore.cart.productsInCart,
          totalItemsSum + shipping
        );
    rootStore.cart.clearCart();
  };
  return (
    <div
      className={cx({
        totalContainer: true,
        totalContainer_withDiscount: withDiscount,
      })}
    >
      <div className={styles.subtotal}>
        <h4 className={styles.cartTitle}>Your Shopping Cart</h4>
        <div className={styles.totalItems}>
          <p className={styles.priceDetails}>
            Items ({rootStore.cart.totalQuantity})
          </p>
          <p className={styles.priceDetails}>${totalItemsSum.toFixed(2)}</p>
        </div>
        {withDiscount && (
          <>
            <div className={styles.totalItems}>
              <p
                className={cx({
                  priceDetails: true,
                  priceDetails_discount: withDiscount,
                })}
              >
                Your discount ({discount}%)
              </p>
              <p
                className={cx({
                  priceDetails: true,
                  priceDetails_discount: withDiscount,
                })}
              >
                - ${totalDiscount.toFixed(2)}
              </p>
            </div>
            <div className={styles.totalItems}>
              <p className={styles.priceDetails}>Subtotal</p>
              <p className={styles.priceDetails}>
                ${(totalItemsSum - totalDiscount).toFixed(2)}
              </p>
            </div>
          </>
        )}
        <div className={styles.totalItems}>
          <p className={styles.priceDetails}>Shipping</p>
          <p className={styles.priceDetails}>${shipping.toFixed(2)}</p>
        </div>
      </div>
      <div className={styles.totalCost}>
        <h4 className={styles.cartTitle}>Total</h4>
        <h4 className={styles.cartTitle}>
          {withDiscount
            ? `$${(totalItemsSum - totalDiscount + shipping).toFixed(2)}`
            : `$${(totalItemsSum + shipping).toFixed(2)}`}
        </h4>
      </div>
      <Button className={styles.orderButton} onClick={handleClick}>
        Place order
      </Button>
    </div>
  );
};

export default observer(CartTotal);
