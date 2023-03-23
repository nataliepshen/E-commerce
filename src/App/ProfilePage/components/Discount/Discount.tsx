import React from "react";

import Button from "components/Button";
import { Link } from "react-router-dom";

import styles from "./Discount.module.scss";

export type DiscountProps = {
  discount: number | null;
};

const Discount: React.FC<DiscountProps> = ({ discount }) => {
  return (
    <div className={styles.discountContainer}>
      <h2 className={styles.discountHeading}>Personal discount</h2>
      {discount ? (
        <h3 className={styles.discount}>{discount}%</h3>
      ) : (
        <Link to="/discount">
          <Button className={styles.button}>Get discount</Button>
        </Link>
      )}
    </div>
  );
};

export default Discount;
