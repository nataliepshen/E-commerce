import { useEffect } from "react";

import OneProductStore from "@store/OneProductStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./ProductCard.module.scss";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import RelatedItems from "./RelatedItems";

export type ProductCardProps = {
  id: string | undefined;
};

const ProductCard: React.FC<ProductCardProps> = ({ id }) => {
  const oneProductStore = useLocalStore(() => new OneProductStore());

  useEffect(() => {
    oneProductStore.getOneProduct({
      id: id,
    });
  }, [id, oneProductStore]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 200 });
  }, [id]);
  return (
    <div>
      {oneProductStore.product && (
        <div>
          <div className={styles.card}>
            <ProductImage
              images={oneProductStore.product.images}
              index={oneProductStore.imageIndex}
              prevDisabled={oneProductStore.prevDisabled}
              nextDisabled={oneProductStore.nextDisabled}
              prev={oneProductStore.prev}
              next={oneProductStore.next}
            />
            <ProductInfo
              name={oneProductStore.product.title}
              description={oneProductStore.product.description}
              price={oneProductStore.product.price}
            />
          </div>
          <RelatedItems items={oneProductStore.relatedItems} />
        </div>
      )}
    </div>
  );
};

export default observer(ProductCard);
