import CartIcon from "./CartIcon";
import styles from "./Icons.module.scss";
import UserIcon from "./UserIcon";

const Icons: React.FC = () => {
  return (
    <div className={styles.icons}>
      <CartIcon />
      <UserIcon />
    </div>
  );
};

export default Icons;
