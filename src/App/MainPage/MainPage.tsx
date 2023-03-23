import * as React from "react";

import Button from "components/Button";
import Catalog from "components/Catalog";
import Container from "components/Container";
import Pagination from "components/Pagination";
import WithLoader from "components/WithLoader";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import ProductListStore from "store/ProductListStore";
import rootStore from "store/RootStore/instance";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";

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

  const setValue = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams({
        ...rootStore.query.allParams,
        query: event.target.value,
        page: "1",
      });
    },
    [setSearchParams]
  );

  const value = rootStore.query.getParam("query")
    ? String(rootStore.query.getParam("query"))
    : "";

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

  const handleDebounce = (value: string, page: number) => {
    productListStore.getProductList({
      page: currentPage,
      value: value,
    });
  };

  const debounceQuery = React.useMemo(() => debounce(handleDebounce, 700), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event);
    debounceQuery(value, currentPage);
  };

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

  React.useEffect(() => {
    productListStore.getProductList({
      page: currentPage,
      categoryId: Number(categoryId),
      value: value,
    });
  }, [categoryId, currentPage, productListStore]);

  const discount = rootStore.user.getDiscount();

  return (
    <Container>
      <Heading />
      <div className={styles.search_filter}>
        <Input
          value={value}
          handleChange={handleChange}
          children={
            <Button
              className={styles.find_button}
              loading={value !== "" && productListStore.meta === Meta.loading}
              onClick={onClick}
            >
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
      <WithLoader loading={productListStore.meta === Meta.loading}>
        <Catalog
          quantity={productListStore.quantity}
          list={productListStore.productList}
          withDiscount={
            discount !== null && rootStore.user.token ? true : false
          }
          discount={discount}
          categoryName={categoryName}
        />
        <Pagination
          totalProducts={productListStore.quantity}
          currentPage={!isNaN(currentPage) ? currentPage : 1}
          productsPerPage={9}
          onPageChange={setCurrentPage}
        />
      </WithLoader>
    </Container>
  );
};

export default observer(MainPage);
