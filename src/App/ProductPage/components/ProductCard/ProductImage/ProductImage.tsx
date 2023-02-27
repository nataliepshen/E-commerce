import { useState } from "react";

import styles from "./ProductImage.module.scss";

export type ProductImageProps = {
  images: string[];
};

const ProductImage: React.FC<ProductImageProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const clickNext = () => {
    if (index >= images.length - 2) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
    setIndex((prevIndex) => prevIndex + 1);
    setPrevDisabled(false);
  };
  const clickPrev = () => {
    if (index === 1) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
    setIndex((prevIndex) => prevIndex - 1);
    setNextDisabled(false);
  };
  return (
    <div className={styles.img_container}>
      <img src={images[index]} className={styles.img} alt="" />
      <button
        className={`${styles.img_button} ${styles.button_prev}`}
        onClick={clickPrev}
        disabled={isPrevDisabled}
      ></button>
      <button
        className={`${styles.img_button} ${styles.button_next}`}
        onClick={clickNext}
        disabled={isNextDisabled}
      ></button>
    </div>
  );
};

export default ProductImage;
