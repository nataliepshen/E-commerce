import classNames from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return (
    <button className={classNames(styles.button, className)}>{children}</button>
  );
};

export default Button;
