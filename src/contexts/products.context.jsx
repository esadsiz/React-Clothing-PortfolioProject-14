import { createContext, useState } from "react";
// createContext metodunu react'ten import ettik.

import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext({
  // Depolamak istediğimiz şey nedir? Bir dizi ürün.
  // Yani boş bir dizi olarak başlatabileceğimiz ürünler.
  products: [],
});
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// Bir context için, hem context value'suna hem de provider'in kendisine ihtiyacımız vardir.
// Ve Provider, product context provider'ini döndüren bir component olacak.
// Icerisinde de children'lari render etmeliyiz.

// Burada shop-data-json'daki ürünleri import etmek varken,
// bu verilere global olarak erisebilmek icin context icine attik.
