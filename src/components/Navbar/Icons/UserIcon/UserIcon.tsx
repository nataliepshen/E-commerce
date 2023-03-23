import React from "react";

import { Link } from "react-router-dom";

import styles from "./UserIcon.module.scss";

const UserIcon: React.FC = () => {
  return (
    <Link to="/profile">
      <div className={styles.userIcon}></div>
    </Link>
  );
};

export default UserIcon;
