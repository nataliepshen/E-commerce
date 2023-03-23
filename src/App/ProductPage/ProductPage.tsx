import * as React from "react";

import Container from "components/Container";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import OneProductStore from "store/OneProductStore";
import rootStore from "store/RootStore/instance";
import { useLocalStore } from "utils/useLocalStore";

import ProductImage from "./components/ProductCard/ProductImage";
import ProductInfo from "./components/ProductCard/ProductInfo";
import RelatedItems from "./components/ProductCard/RelatedItems";
import styles from "./ProductPage.module.scss";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const oneProductStore = useLocalStore(() => new OneProductStore(String(id)));
  const discount = rootStore.user.getDiscount();
  React.useEffect(() => {
    oneProductStore.getOneProduct(String(id));
  }, [id, oneProductStore]);
  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 200 });
  }, [id]);
  return (
    <Container>
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
                product={oneProductStore.product}
                withDiscount={
                  discount !== null && rootStore.user.token ? true : false
                }
                discount={discount}
              />
            </div>
            <RelatedItems items={oneProductStore.relatedItems} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default observer(ProductPage);
