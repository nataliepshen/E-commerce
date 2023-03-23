import React from "react";

import Login from "components/Login";
import Navbar from "components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

import CartPage from "./CartPage";
import MainPage from "./MainPage";
import ProductPage from "./ProductPage";
import ProfilePage from "./ProfilePage";
import PromoPage from "./PromoPage";

const App = () => {
  useQueryParamsStoreInit();
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/discount" element={<PromoPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
