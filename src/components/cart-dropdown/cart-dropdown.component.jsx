import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    const navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

// dispatch comes from connevct auto magically
const CartDropdown = ({ cartItems, router, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        router.navigate("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

//provides acsess to the cart items, by using selectCartItems selector,
//we make sure other state changes doesnt trigger a rerender of the cart dropdown
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// this way component has access to the props we are looking for e.g. "history"
export default withRouter(connect(mapStateToProps)(CartDropdown));
