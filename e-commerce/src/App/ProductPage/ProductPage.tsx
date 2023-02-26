import Container from "@components/Container";
import { useParams } from "react-router-dom";

import ProductCard from "./components/ProductCard";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  return (
    <Container>
      <ProductCard id={id} />
    </Container>
  );
};

export default ProductPage;
