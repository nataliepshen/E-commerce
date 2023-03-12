import * as React from "react";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value"
> & {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({ value, handleChange, children }) => {
  return (
    <div className={`${styles.input_field} ${styles.search_icon}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={styles.input}
        placeholder="Search property"
      />
      {children}
    </div>
  );
};

export default React.memo(Input);
