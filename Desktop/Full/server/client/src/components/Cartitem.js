import React, { useState } from "react";
import styles from "./Cartitem.module.css";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { removefromCart, adjustQty } from '../redux/ActionCreators';

//functional cartitem component it will be called in the cart component for each item in cart state
//props are sent from cart component and are destructured using {} 

//all the below classnames are imported from cart.module.css 

function CartItem({ item, adjustQty, removefromCart }) {
  //we adjust quantity of item depending upon users entered value in cart component
  const [input, setInput] = useState(item.qty);
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(item._id, e.target.value);
  };
  console.log(item.image);

  return (
    <div className={styles.cartItem}>
      <Link to={`/searchc/${item._id}`}>
        <img
          className={styles.cartItem__image}
          src={item.image}
          alt={item.title}
        />
      </Link>
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{item.name}</p>
        <p className={styles.details__price}>Rs {item.price}</p>
      </div>
      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <label htmlFor="qty">Months</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        <button
          onClick={() => removefromCart(item._id)}
          className={styles.actions__deleteItemBtn}
        >
          <img src="https://cdn4.iconfinder.com/data/icons/chat-icons-2/100/9-512.png" alt="deleteicon"></img>
        </button>
      </div>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
    removefromCart: (id) => dispatch(removefromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);