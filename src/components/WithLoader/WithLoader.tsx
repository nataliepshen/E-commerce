import React from "react";

import Loader from "components/Loader";

import styles from "./WithLoader.module.scss";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
}: WithLoaderProps) => {
  return (
    <div className={styles.withLoaderContainer}>
      {children}
      {loading && <Loader className={styles.withLoader} />}
    </div>
  );
};

export default WithLoader;
