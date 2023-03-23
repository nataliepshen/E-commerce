import React from "react";

import { Link } from "react-router-dom";

import Icons from "./Icons";
import Logo from "./Logo";
import styles from "./Navbar.module.scss";
import NavSections from "./NavSections";

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <NavSections />
      <Icons />
    </div>
  );
};

export default React.memo(Navbar);
