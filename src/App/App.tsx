import Navbar from "@components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "./MainPage";
import ProductPage from "./ProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
