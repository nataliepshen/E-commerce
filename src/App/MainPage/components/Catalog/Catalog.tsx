import { useEffect, useState } from "react";

import Pagination from "@components/Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./Catalog.module.scss";
import TitleCatalog from "./TitleCatalog";
import Card from "../../../../components/Card";

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
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const offset = (currentPage - 1) * limit;
  useEffect(() => {
    const fetchQuantity = async () => {
      const result = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      setQuantity(result.data.length);
    };
    fetchQuantity();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<Product[]>(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      setProducts(data);
    };
    fetchProducts();
  }, [offset]);
  return (
    <>
      <div className={styles.catalog_container}>
        <TitleCatalog quantity={quantity} />
        <div className={styles.catalog}>
          {products.map((product: Product) => (
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
        totalProducts={quantity}
        currentPage={currentPage}
        productsPerPage={limit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Catalog;
