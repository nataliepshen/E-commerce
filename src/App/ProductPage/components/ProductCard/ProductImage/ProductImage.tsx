import styles from "./ProductImage.module.scss";

export type ProductImageProps = {
  images: string[];
  index: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
  next: () => void;
  prev: () => void;
};

const ProductImage: React.FC<ProductImageProps> = ({
  images,
  index,
  prevDisabled,
  nextDisabled,
  next,
  prev,
}) => {
  return (
    <div className={styles.img_container}>
      <img src={images[index]} className={styles.img} alt="" />
      <button
        className={`${styles.img_button} ${styles.button_prev}`}
        onClick={prev}
        disabled={prevDisabled}
      ></button>
      <button
        className={`${styles.img_button} ${styles.button_next}`}
        onClick={next}
        disabled={nextDisabled}
      ></button>
    </div>
  );
};

export default ProductImage;
