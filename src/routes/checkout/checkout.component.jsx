import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Produkt</span>
        </div>
        <div className="header-block">
          <span>Beschreibung</span>
        </div>
        <div className="header-block">
          <span>Menge</span>
        </div>
        <div className="header-block">
          <span>Preis</span>
        </div>
        <div className="header-block">
          <span>Entfernen</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">GESAMT: ${cartTotal}</div>
    </div>
  );
};

export default Checkout;
