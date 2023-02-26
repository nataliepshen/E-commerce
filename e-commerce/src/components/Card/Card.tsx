import styles from "./Card.module.scss";

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  category?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
  category,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imgContainer}>
        <img className={styles.cardImg} src={image} alt="" />
      </div>
      {category && <h5 className={styles.categoryHeader}>{category}</h5>}
      <h3 className={styles.titleHeader}>{title}</h3>
      <h5 className={styles.subHeader}>{subtitle}</h5>
      {content && <h3 className={styles.contentHeader}>${content}</h3>}
    </div>
  );
};

export default Card;
