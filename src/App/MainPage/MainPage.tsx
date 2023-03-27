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
import RangeSlider from "./components/RangeSlider";
import TitleCatalog from "./components/TitleCatalog";
import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const productListStore = useLocalStore(() => new ProductListStore());
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    query: "",
    categoryId: "",
    price_min: "",
    price_max: "",
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

  const discount = rootStore.user.getDiscount();
  const withDiscount = discount !== null && rootStore.user.token ? true : false;

  const setPriceRange = React.useCallback(
    (priceRange: number[]) => {
      setSearchParams({
        ...rootStore.query.allParams,
        price_min: String(priceRange[0]),
        price_max: String(priceRange[1]),
        page: "1",
      });
    },
    [setSearchParams]
  );

  const min = rootStore.query.getParam("price_min")
    ? Number(rootStore.query.getParam("price_min"))
    : 0;
  const minWithDiscount = (min * 100) / (100 - Number(discount));
  const max = rootStore.query.getParam("price_max")
    ? Number(rootStore.query.getParam("price_max"))
    : 1000;
  const maxWithDiscount = (max * 100) / (100 - Number(discount));

  const handleDebounce = (
    value: string,
    page: number,
    categoryId?: string,
    priceRange?: number[]
  ) => {
    productListStore.getProductList({
      page: currentPage,
      value: value,
      categoryId: Number(categoryId),
      priceRange: withDiscount
        ? [minWithDiscount, maxWithDiscount]
        : [min, max],
    });
  };

  const debounceQuery = React.useMemo(() => debounce(handleDebounce, 700), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event);
    debounceQuery(value, currentPage, categoryId, [min, max]);
  };

  const onClick = React.useCallback(() => {
    setCurrentPage(1);
    productListStore.getProductList({
      page: currentPage,
      value: value,
      categoryId: Number(categoryId),
      priceRange: withDiscount
        ? [minWithDiscount, maxWithDiscount]
        : [min, max],
    });
  }, [
    categoryId,
    currentPage,
    max,
    maxWithDiscount,
    min,
    minWithDiscount,
    productListStore,
    setCurrentPage,
    value,
    withDiscount,
  ]);

  const onAfterChange = React.useCallback(() => {
    productListStore.getProductList({
      page: currentPage,
      priceRange: withDiscount
        ? [minWithDiscount, maxWithDiscount]
        : [min, max],
      value: value,
      categoryId: Number(categoryId),
    });
  }, [
    categoryId,
    currentPage,
    max,
    maxWithDiscount,
    min,
    minWithDiscount,
    productListStore,
    value,
    withDiscount,
  ]);

  React.useEffect(() => {
    productListStore.getCategoryList();
  }, [productListStore]);

  React.useEffect(() => {
    productListStore.getProductList({
      page: currentPage,
      categoryId: Number(categoryId),
      value: value,
      priceRange: withDiscount
        ? [minWithDiscount, maxWithDiscount]
        : [min, max],
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
      <div className={styles.title_slider}>
        <TitleCatalog
          quantity={productListStore.quantity}
          categoryName={categoryName}
        />
        <RangeSlider
          handleChange={(value) => setPriceRange(value)}
          onAfterChange={onAfterChange}
          left={min}
          right={max}
        />
      </div>
      <WithLoader loading={productListStore.meta === Meta.loading}>
        <Catalog
          list={productListStore.productList}
          withDiscount={withDiscount}
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
