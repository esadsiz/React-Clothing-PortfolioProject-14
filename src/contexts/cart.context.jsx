import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
    // Sepetimizin icinden mantiken var olan bir ürünü kaldıracagiz.
    // Bu yüzden önce dizimizin icinde kaldırılacak ürünü bulmaliyiz.
  );

  // Sonra da ürün miktarınin bire eşit olup olmadığını kontrol edecegiz.
  // 1'e esitse, o ürünü sepetten çıkaracagiz.
  // Bunu yapmak için filtre yöntemini kullanalım.
  // Bildiğimiz gibi, filtre, bize dizinin eşleşenleri kaldırilacağı yeni bir dizi verir.
  if (existingCartItem.quantity === 1) {
    // Ve yapacağımız şey, bir alışveriş sepeti ürünü almak ve alışveriş sepeti öğesi kimliğinin, kimliği kaldırmak için sepet öğesiyle aynı olup olmadığını kontrol etmek.
    // "Burada false olan her şeyi filtrelemeni istiyorum."
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    // Eğer bu ifade true olarak değerlendirilirse değeri koru.
    // Yani öğe kimliğinin, kaldırmaya çalıştığımız değere eşit olduğu değeri kaldırmak istiyoruz.
  }

  // Değilse de, sepet öğelerini azaltılmış miktarla eşleşen sepet öğesiyle geri gönderecegiz.
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  // "Hey, kimliğin çıkarmaya çalıştığımiz ürün kimligi ile eşleşiyorsa,
  // o ürünü azaltarak bize aynı kart öğesi özelliklerine sahip yeni bir obje ver.
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  //
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
