import * as React from "react";

import Button from "components/Button";
import Container from "components/Container";
import Pagination from "components/Pagination";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import ProductListStore from "store/ProductListStore";
import rootStore from "store/RootStore/instance";
import { useLocalStore } from "utils/useLocalStore";

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
    categoryId: "",
  });

  rootStore.query.setSearch(searchParams.toString());

  const setCurrentPage = React.useCallback(
    (page: number) => {
      setSearchParams({
        ...rootStore.query.allParams,
        page: String(page),
      });
    },
    [setSearchParams]
  );

  const currentPage = Number(rootStore.query.getParam("page"));

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams({
        ...rootStore.query.allParams,
        query: event.target.value,
        page: "1",
      });
    },
    [setSearchParams]
  );

  const value = String(rootStore.query.getParam("query"));
  React.useEffect(() => {
    productListStore.getProductList({
      page: currentPage,
      value: value,
    });
  }, [currentPage, productListStore, value]);

  React.useEffect(() => {
    productListStore.getCategoryList();
  }, [productListStore]);

  const onClick = React.useCallback(() => {
    setCurrentPage(1);
    productListStore.getProductList({
      page: currentPage,
      value: value,
    });
  }, [currentPage, productListStore, setCurrentPage, value]);

  const setCategoryId = React.useCallback(
    (id: string) => {
      setSearchParams({
        ...rootStore.query.allParams,
        categoryId: id,
        page: "1",
      });
    },
    [setSearchParams]
  );
  const categoryId = String(rootStore.query.getParam("categoryId"));
  const categoryName =
    productListStore.categoryList[Number(categoryId) - 1]?.name;
  React.useEffect(() => {
    productListStore.getProductList({
      page: currentPage,
      categoryId: Number(categoryId),
    });
  }, [categoryId, currentPage, productListStore]);

  return (
    <Container>
      <Heading />
      <div className={styles.search_filter}>
        <Input
          value={value}
          handleChange={handleChange}
          children={
            <Button className={styles.find_button} onClick={onClick}>
              Find Now
            </Button>
          }
        />
        <Filter
          handleClickFilter={productListStore.toggleFilter}
          showItems={productListStore.showFilter}
          categoryList={productListStore.categoryList}
          setCategory={setCategoryId}
        />
      </div>
      <Catalog
        quantity={productListStore.quantity}
        list={productListStore.productList}
        categoryName={categoryName}
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
