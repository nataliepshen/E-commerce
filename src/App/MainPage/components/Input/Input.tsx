import { memo } from "react";

import Button from "@components/Button";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value"
> & {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

const Input: React.FC<InputProps> = ({ value, handleChange, onClick }) => {
  return (
    <div className={`${styles.input_field} ${styles.search_icon}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={styles.input}
        placeholder="Search property"
      />
      <Button className={styles.find_button} onClick={onClick}>
        Find Now
      </Button>
    </div>
  );
};

export default memo(Input);
