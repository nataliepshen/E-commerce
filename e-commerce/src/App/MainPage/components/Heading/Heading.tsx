import styles from "./Heading.module.scss";

const Heading: React.FC = () => {
  return (
    <div className={styles.heading}>
      <h1 className={styles.mainHeading}>Products</h1>
      <p className={styles.par}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
    </div>
  );
};

export default Heading;
