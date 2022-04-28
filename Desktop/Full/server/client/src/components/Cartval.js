//this component is to display number of items in cart in navbar

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
function Cartval({ cart }) {
  const [cartCount, setCartCount] = useState(0);
  //we take use of use effect depending upon change in cart and we update and return cartcount
  useEffect(() => {
    let count = 0;
    cart.map((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);
  return (
    <div >
      {cartCount}

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    items: state.cartReducer.items,
  };
};

export default connect(mapStateToProps)(Cartval);




