import Filter from "./Filter";
import Input from "./Input";
import styles from "./Search.module.scss";

const Search: React.FC = () => {
  return (
    <div className={styles.search_filter}>
      <Input />
      <Filter />
    </div>
  );
};

export default Search;
