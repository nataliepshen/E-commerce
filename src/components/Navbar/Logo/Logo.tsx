import styles from "./Logo.module.scss";

const Logo: React.FC = () => {
  return (
    <div className={styles.logoName}>
      <div className={styles.logo}></div>
      <div className={styles.name}></div>
    </div>
  );
};

export default Logo;
