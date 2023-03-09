import { useEffect, useState } from "react";

import Card from "@components/Card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Product } from "src/App/MainPage/components/Catalog/Catalog";

import styles from "./RelatedItems.module.scss";

export type RelatedItemsProps = {
  id: string | undefined;
  item_id: number;
};

const RelatedItems = ({ id, item_id }: RelatedItemsProps) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get<Product[]>(
        `https://api.escuelajs.co/api/v1/categories/${id}/products`
      );
      let itemsList: Product[] = [];
      while (itemsList.length < 3) {
        let item = Math.floor(Math.random() * data.length);
        if (!itemsList.includes(data[item])) {
          itemsList.push(data[item]);
        }
      }
      setItems(itemsList);
    };
    fetch();
  }, [id, item_id]);
  return (
    <div className={styles.items_container}>
      <h4 className={styles.items_title}>Related Items</h4>
      <div className={styles.items}>
        {items.map((item: Product) => (
          <Card
            key={item.id}
            image={item.images[0]}
            title={item.title}
            subtitle={item.description}
            category={item.category.name}
            content={item.price.toFixed(2)}
            onClick={() => navigate(`/product/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
