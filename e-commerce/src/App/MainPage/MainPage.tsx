import Container from "@components/Container";

import Catalog from "./components/Catalog";
import Heading from "./components/Heading";
import Search from "./components/Search";

const MainPage: React.FC = () => {
  return (
    <Container>
      <Heading />
      <Search />
      <Catalog />
    </Container>
  );
};

export default MainPage;
