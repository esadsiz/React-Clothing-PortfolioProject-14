import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { ProductProvider } from "./contexts/products.context";
import { CartProvider } from "./contexts/cart.context";

import "./index.scss";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          {/*Artık UserProvider icindeki herhangi bir component,
     Provider içindeki context value'suna erişebilir.
     Yani burada, UserProvider'in bize "Component ağacımın içinde hangi componentlerin context'ime erişimi var?"
     diye sormasi amaçlanıyor.
     Yalnizca Provider içindeki herhangi bir bileşenler.
     Dışarıdaki hiçbir şey context'e erişemez.*/}
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
