import Navbar from "@components/Navbar";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Route, Routes } from "react-router-dom";

import MainPage from "./MainPage";
import ProductPage from "./ProductPage";

const App = () => {
  useQueryParamsStoreInit();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
