import React from "react";

import classNames from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  onClick?: VoidFunction;
  className?: string;
}>;

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default React.memo(Button);
