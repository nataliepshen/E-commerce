import { useCallback, useEffect } from "react";

import Container from "@components/Container";
import Pagination from "@components/Pagination";
import ProductListStore from "@store/ProductListStore";
import rootStore from "@store/RootStore/instance";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import Catalog from "./components/Catalog";
import Filter from "./components/Filter";
import Heading from "./components/Heading";
import Input from "./components/Input";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const productListStore = useLocalStore(() => new ProductListStore());
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    query: "",
  });

  rootStore.query.setSearch(searchParams.toString());

  const setCurrentPage = useCallback(
    (page: number) => {
      setSearchParams({
        ...rootStore.query.allParams,
        page: String(page),
      });
    },
    [setSearchParams]
  );

  const currentPage = Number(rootStore.query.getParam("page"));

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams({
        ...rootStore.query.allParams,
        query: event.target.value,
      });
    },
    [setSearchParams]
  );

  const value = String(rootStore.query.getParam("query"));

  useEffect(() => {
    productListStore.getProductList({
      page: currentPage,
      value: value,
    });
  }, [currentPage, productListStore, value]);

  const onClick = useCallback(() => {
    productListStore.getProductList({
      page: currentPage,
      value: value,
    });
  }, [currentPage, productListStore, value]);

  return (
    <Container>
      <Heading />
      <div className={styles.search_filter}>
        <Input value={value} handleChange={handleChange} onClick={onClick} />
        <Filter />
      </div>
      <Catalog
        quantity={productListStore.quantity}
        list={productListStore.productList}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
      <Pagination
        totalProducts={productListStore.quantity}
        currentPage={currentPage}
        productsPerPage={9}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default observer(MainPage);
