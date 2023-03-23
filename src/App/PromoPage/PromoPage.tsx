import React from "react";

import Container from "components/Container";
import Login from "components/Login";
import { observer } from "mobx-react-lite";
import rootStore from "store/RootStore/instance";

import DiscountBoard from "./components/DiscountBoard";
import styles from "./PromoPage.module.scss";

const PromoPage: React.FC = () => {
  const token = rootStore.user.token;
  if (!token) {
    return <Login />;
  } else {
    rootStore.user.getUserWithToken(token);
  }
  return (
    <Container>
      <h3 className={styles.heading}>Don't miss your discount!</h3>
      <DiscountBoard />
    </Container>
  );
};

export default observer(PromoPage);
