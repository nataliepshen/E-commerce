import React from "react";

import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import rootStore from "store/RootStore/instance";

import styles from "./CartIcon.module.scss";

const CartIcon: React.FC = () => {
  return (
    <Link to="/cart">
      <div className={styles.cartIcon}>
        {rootStore.cart.totalQuantity > 0 && (
          <div className={styles.quantity}>{rootStore.cart.totalQuantity}</div>
        )}
      </div>
    </Link>
  );
};

export default observer(CartIcon);
