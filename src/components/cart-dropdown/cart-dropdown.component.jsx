import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";
// useNavigate, gezinme işlevi elde etmemizi sağlayan bir hooktur.
// Yani bu, asagidaki Zum Checkout gehen butonun onClick'i ile /checkout sayfasina gitmemizi saglayacak.

import "./cart-dropdown.styles.scss";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropDown = () => {
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>Zum Checkout gehen</Button>
    </div>
  );
};

export default CartDropDown;
