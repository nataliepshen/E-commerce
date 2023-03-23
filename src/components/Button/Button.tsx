import React from "react";

import classnames from "classnames/bind";
import Loader from "components/Loader";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  onClick?: VoidFunction;
  className?: string;
  disabled?: boolean;
  id?: string;
}>;

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  onClick,
  disabled,
  id,
}) => {
  const cx = classnames.bind(styles);

  return (
    <button
      className={cx("button", className, {
        button_withLoader: loading,
      })}
      id={id}
      disabled={disabled}
      onClick={onClick}
    >
      {loading && <Loader className={styles.button_loader} />}
      {children}
    </button>
  );
};

export default React.memo(Button);
