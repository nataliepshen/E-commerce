import Button from "@components/Button";

import styles from "./Input.module.scss";

const Input: React.FC = () => {
  return (
    <div className={`${styles.input_field} ${styles.search_icon}`}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search property"
      />
      <Button className={styles.find_button}>Find Now</Button>
    </div>
  );
};

export default Input;
