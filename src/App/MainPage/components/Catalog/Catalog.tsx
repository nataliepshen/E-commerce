import { useCallback, useEffect } from "react";

import Card from "@components/Card";
import Pagination from "@components/Pagination";
import ProductListStore from "@store/ProductListStore";
import rootStore from "@store/RootStore/instance";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Catalog.module.scss";
import TitleCatalog from "./TitleCatalog";

export type Category = {
  id: string;
  name: string;
};
export type Product = {
  id: number;
  images: string[];
  title: string;
  description: string;
  category: Category;
  price: number;
};

const Catalog: React.FC = () => {
  const productListStore = useLocalStore(() => new ProductListStore());
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  rootStore.query.setSearch(searchParams.toString());
  const setCurrentPage = useCallback(
    (page: number) => {
      setSearchParams({
        ...rootStore.query.getAllParams(),
        page: String(page),
      });
    },
    [setSearchParams]
  );
  const limit = 9;
  const page = rootStore.query.getParam("page");
  const offset = (Number(page) - 1) * limit;
  useEffect(() => {
    productListStore.getQuantity();
  }, [productListStore]);

  useEffect(() => {
    productListStore.getProductList({
      limit: limit,
      offset: offset,
    });
  }, [offset, productListStore]);
  return (
    <>
      <div className={styles.catalog_container}>
        <TitleCatalog quantity={productListStore.quantity} />
        <div className={styles.catalog}>
          {productListStore.productList.map((product: Product) => (
            <Card
              key={product.id}
              image={product.images[0]}
              title={product.title}
              subtitle={product.description}
              category={product.category.name}
              content={product.price.toFixed(2)}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </div>
      <Pagination
        totalProducts={productListStore.quantity}
        currentPage={productListStore.currentPage}
        productsPerPage={limit}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default observer(Catalog);
