import { Link } from "react-router-dom";

import styles from "./NavSections.module.scss";
import Section from "./Section";

const NavSections: React.FC = () => {
  return (
    <div className={styles.navSections}>
      <Link to="/">
        <Section active>Products</Section>
      </Link>
      <Section>Categories</Section>
      <Section>About Us</Section>
    </div>
  );
};

export default NavSections;
