import { useCallback } from "react";

import Button from "@components/Button";
import ProductListStore from "@store/ProductListStore";
import rootStore from "@store/RootStore/instance";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Input.module.scss";

const Input: React.FC = () => {
  const productListStore = useLocalStore(() => new ProductListStore());
  const [searchParams, setSearchParams] = useSearchParams();
  rootStore.query.setSearch(searchParams.toString());
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ query: event.target.value });
      rootStore.query.setInput(event.target.value);
    },
    [setSearchParams]
  );

  const onClick = useCallback(() => {
    productListStore.getSearchProducts({
      value: rootStore.query.input,
    });
  }, [productListStore]);
  return (
    <div className={`${styles.input_field} ${styles.search_icon}`}>
      <input
        type="text"
        value={rootStore.query.input}
        onChange={handleChange}
        className={styles.input}
        placeholder="Search property"
      />
      <Button className={styles.find_button} onClick={onClick}>
        Find Now
      </Button>
    </div>
  );
};

export default observer(Input);
