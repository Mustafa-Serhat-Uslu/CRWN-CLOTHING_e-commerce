export const addItemToCart = (cartItems, cartItemToAdd) => {

  // if the item doesnt already exist, existingCartItem will be undefined
  const existingCartItem = cartItems.find(
    (cartItem) => (cartItem) => cartItem.id == cartItemToAdd.id
  );

  // map funs retrun a completely new object hence it will reuire the component to re-render as needed
  if (existingCartItem){
      return cartItems.map(cartItem =>
        cartItem.id == cartItemToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
      );
  }

  return [...cartItems, {...cartItemToAdd, quantity: 1}];
};
