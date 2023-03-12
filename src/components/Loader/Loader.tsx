import React from "react";

import classnames from "classnames/bind";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}: LoaderProps) => {
  const isLoading = loading;
  const cx = classnames.bind(styles);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cx(className, {
        mLoader: size === LoaderSize.m,
        sLoader: size === LoaderSize.s,
        lLoader: size === LoaderSize.l,
      })}
    ></div>
  );
};

export default Loader;
