import { Link } from "react-router-dom";

import styles from "./NavSections.module.scss";
import Section from "./Section";

const NavSections: React.FC = () => {
  return (
    <div className={styles.navSections}>
      <Link to="/">
        <Section active children="Products" />
      </Link>
      <Section children="Categories" />
      <Section children="About Us" />
    </div>
  );
};

export default NavSections;
