import React from "react";

import classnames from "classnames/bind";
import Button from "components/Button";

import styles from "./Card.module.scss";

export type CardProps = {
  image: string;
  title: React.ReactNode;
  description: React.ReactNode;
  price: React.ReactNode;
  withDiscount: boolean;
  discount: number | null;
  onClick?: React.MouseEventHandler;
  category?: React.ReactNode;
  handleClick: VoidFunction;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  price,
  withDiscount,
  discount,
  onClick,
  category,
  handleClick,
}) => {
  const [isHover, setIsHover] = React.useState(false);
  const handleMouseOver = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };
  const cx = classnames.bind(styles);
  return (
    <div
      className={cx({
        cardContainer: true,
        cardContainer_hover: isHover,
      })}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className={styles.card} onClick={onClick}>
        <div className={styles.imgContainer}>
          <img className={styles.cardImg} src={image} alt="" />
        </div>
        {category && <h5 className={styles.categoryHeader}>{category}</h5>}
        <h3 className={styles.titleHeader}>{title}</h3>
        <h5 className={styles.subHeader}>{description}</h5>
        <div className={styles.priceContainer}>
          <h3 className={styles.price}>
            {withDiscount
              ? `$${(
                  Number(price) -
                  (Number(price) * Number(discount)) / 100
                ).toFixed(2)}`
              : `$${price}`}
          </h3>
          {withDiscount && (
            <h3
              className={cx({
                price: true,
                price_ifDiscount: withDiscount,
              })}
            >
              ${price}
            </h3>
          )}
        </div>
      </div>
      {isHover && (
        <div className={styles.cardBackground}>
          <div className={styles.cardBottom}>
            <Button onClick={handleClick}>Add to Cart</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
