import React from "react";

import Button from "components/Button";
import Container from "components/Container";
import Login from "components/Login";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import rootStore from "store/RootStore/instance";

import styles from "./CartPage.module.scss";
import CartProducts from "./components/CartProducts";
import CartTotal from "./components/CartTotal";

const CartPage: React.FC = () => {
  const token = rootStore.user.token;
  if (!token) {
    return <Login />;
  } else {
    rootStore.user.getUserWithToken(token);
  }
  const products = rootStore.cart.productsInCart;
  const discount = rootStore.user.getDiscount();
  return (
    <Container>
      <div className={styles.header}>
        <h3 className={styles.cartHeading}>Shopping Cart</h3>
      </div>
      {products.length > 0 ? (
        <div className={styles.cartContainer}>
          <CartProducts
            products={products}
            withDiscount={discount !== null && token ? true : false}
            discount={discount}
          />
          <CartTotal
            withDiscount={
              discount !== null && rootStore.user.user !== null ? true : false
            }
            discount={discount}
          />
        </div>
      ) : (
        <div className={styles.emptyCartContainer}>
          <p className={styles.emptyPar}>Your shopping cart is empty.</p>
          <Link to="/">
            <Button className={styles.button}>Start shopping</Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default observer(CartPage);
