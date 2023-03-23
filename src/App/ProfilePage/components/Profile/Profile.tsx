import React from "react";

import { observer } from "mobx-react-lite";
import rootStore from "store/RootStore/instance";

import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatarContainer}>
        <img
          className={styles.avatar}
          src={rootStore.user.user?.avatar}
          alt="User avatar"
        />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.userName}>{rootStore.user.user?.name}</h2>
        <p className={styles.userEmail}>{rootStore.user.user?.email}</p>
        <div className={styles.linkContainer}>
          <p className={styles.linkPar} onClick={rootStore.user.logOut}>
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
};

export default observer(Profile);
