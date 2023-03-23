import React from "react";

import Container from "components/Container";
import Login from "components/Login";
import { observer } from "mobx-react-lite";
import rootStore from "store/RootStore/instance";

import Discount from "./components/Discount";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import styles from "./ProfilePage.module.scss";

const ProfilePage: React.FC = () => {
  const token = rootStore.user.token;
  if (!token) {
    return <Login />;
  } else {
    rootStore.user.getUserWithToken(token);
  }
  const discount = rootStore.user.getDiscount();
  return (
    <Container>
      <h4 className={styles.accHeading}>My account</h4>
      <p className={styles.accInfo}>
        Here you can view your orders, details and discount.
      </p>
      <div className={styles.profilePageContainer}>
        <div className={styles.profileContainer}>
          <Profile />
          <Discount discount={discount} />
        </div>
        <Orders />
      </div>
    </Container>
  );
};

export default observer(ProfilePage);
