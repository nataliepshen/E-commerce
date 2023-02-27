import Button from "@components/Button";

import styles from "./ProductInfo.module.scss";

export type ProductInfoProps = {
  name: string;
  description: string;
  price: number;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  price,
}) => {
  return (
    <div className={styles.info_container}>
      <div>
        <h2 className={styles.prod_name}>{name}</h2>
        <p className={styles.prod_description}>{description}</p>
      </div>
      <div>
        <h2 className={styles.prod_price}>{`$${price.toFixed(2)}`}</h2>
        <div className={styles.btn_container}>
          <Button className={styles.buy_btn} children="Buy Now"></Button>
          <Button className={styles.add_btn} children="Add to Cart"></Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
