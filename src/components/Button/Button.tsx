import classNames from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className }) => {
  let buttonClass = classNames(`${styles.button}`, className);

  return <button className={buttonClass}>{children}</button>;
};

export default Button;
