import Icons from "./Icons";
import Logo from "./Logo";
import styles from "./Navbar.module.scss";
import NavSections from "./NavSections";

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <Logo />
      <NavSections />
      <Icons />
    </div>
  );
};

export default Navbar;
