
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Cart.module.css";
import CartItem from "./Cartitem.js";
import { Button } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
let price, items;

// functional cart component props are sent from main component
function Cart(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  //we take use of change in number of items in cart ,total price,totalitems and then we update state of total price and total items
  useEffect(() => {
    let items = 0;
    let price = 0;
    props.cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    setTotalItems(items);
    setTotalPrice(price);
  }, [props.cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);
  price = totalPrice
  items = totalItems

  //all the below classnames are imported from cart.module.css 
  //below chain of if loops is to just display items for plural number of items and item for single item

  
  if (totalItems === 1) {
    return (
      <div style={{ backgroundImage: `url("https://wallpaperaccess.com/full/2667044.jpg")` }}>
        <div className={styles.cart}>
          <div className={styles.cart__items}>

            {/* we send each items in cart of cart state to cartitem component to render it as card aong with styling */}

            {props.cart.map((item) => (
              <Fade left>
                <Pulse>
              <CartItem key={item._id} item={item} />
              </Pulse>
              </Fade>
            ))}
          </div>
          <div className={styles.cart__summary}>


            {/* cart  summary,total items will be displayed */}
            <h4 className={styles.summary__title}>Cart Summary</h4>
            <div className={styles.summary__price}>
              <span>TOTAL: ({totalItems} item)</span>
              <span>Rs {totalPrice}</span>
            </div >
            <div className='zoom'>
              <Button style={{ backgroundColor: "#8c878a" }}>
                <Link to="/checkout"><h5 style={{ color: "black" }}>Proceed To Checkout</h5></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else if (totalItems === 0) {
    return (
      <div style={{ backgroundImage: `url("https://wallpaperaccess.com/full/2667044.jpg")` }}>
        <div className={styles.cart}>
          <div className={styles.cart__items}>
            {props.cart.map((item) => (
            
              <Fade left>
                <Pulse>
              <CartItem key={item._id} item={item} />
              </Pulse>
              </Fade>
            
            ))}
          </div>
          <div className={styles.cart__summary}>
            <h4 className={styles.summary__title}>Cart Summary</h4>
            <div className={styles.summary__price}>
              <span>TOTAL: ({totalItems} items)</span>
              <span>Rs {totalPrice}</span>
            </div>
            <Button style={{ backgroundColor: "#8c878a" }}>
              <h5 style={{ color: "black" }}>Proceed To Checkout</h5>
            </Button>
          </div>
        </div >
      </div >

    )
  }
  else {
    return (
      <div style={{ backgroundImage: `url("https://wallpaperaccess.com/full/2667044.jpg")` }}>
        <div className={styles.cart}>
          <div className={styles.cart__items}>
            {props.cart.map((item) => (
              
              <Fade left>
                <Pulse>
              <CartItem key={item._id} item={item} />
              </Pulse>
              </Fade>
            
            ))}
          </div>
          <div className={styles.cart__summary}>
            <h4 className={styles.summary__title}>Cart Summary</h4>
            <div className={styles.summary__price}>
              <span>TOTAL: ({totalItems} items)</span>
              <span>Rs {totalPrice}</span>
            </div>
            <div className='zoom'>
              <Button style={{ backgroundColor: "#8c878a" }}>
                <Link to="/checkout"><h5 style={{ color: "black" }}>Proceed To Checkout</h5></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

//above cart functional component is exported
export default Cart;
export { price, items };