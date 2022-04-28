import React, { useState } from "react";
import styles from "./Cartitem.module.css";
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';


//functional cartitem component it will be called in the cart component for each item in cart state
//props are sent from cart component and are destructured using {} 

//all the below classnames are imported from cart.module.css 

function OrderItem({ item,id }) {
    console.log(item.image);
    function Deleteitem(did,orderid){
      if(window.confirm('Are You sure? this item will be cancelled from current order')){
        fetch('http://localhost:3001/orders/'+id+"/"+did,{
          method:'DELETE',
          header:{'Accept':'application/json',
         'Content-Type':'application/json'   
        },
  
  
        })
  
      }
    }
  


  return (
    <div className={styles.cartItem} style={{width:"350px",paddingBottom:"3px"}}>
      <Link to={`/searchc/${item._id}`}>
        <img
          className={styles.cartItem__image}
          src={baseUrl + item.image}
          alt={item.name}
        />
      </Link> 
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{item.name}</p>
        <p className={styles.details__price}>Price : Rs {item.price}</p>
        <p className={styles.details__price}>Subscription : {item.qty} month(s)</p>
        <button style={{color:"white",borderRadius:"5px",width:"200px",backgroundColor:"red"}} onClick={()=>Deleteitem(item._id,id)}>Cancel Item</button>
      </div>
      {/* <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
         

        <button
          onClick={() => removefromCart(item._id)}
          className={styles.actions__deleteItemBtn}
        >
          <img src="https://cdn4.iconfinder.com/data/icons/chat-icons-2/100/9-512.png" alt="deleteicon"></img>
        </button>
      </div>*/}
    </div> 
  );
};


export default OrderItem;