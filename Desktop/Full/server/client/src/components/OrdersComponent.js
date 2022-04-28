import "./Orders.css";
import { user } from "./HeaderComponent";
import { Breadcrumb,BreadcrumbItem ,Card,CardHeader,CardBody,CardText}   from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteorder } from '../redux/ActionCreators';
import React, { useState, useEffect } from 'react';

function RenderItem({ order,deleteorder }) {
  const [orders, setOrders] = useState({order});
  useEffect(() => {
  
    setOrders(order);
    
  }, order);


  function Deleteorder(id){
    
    if(window.confirm('Are You sure? complete order will be cancelled')){
      
      fetch('http://localhost:3001/orders/'+id,{
        method:'DELETE',
        header:{'Accept':'application/json',
       'Content-Type':'application/json'   
      },


      })

    }

  };






  return (
    <div >
      <Card style={{backgroundColor:"white" ,width:"fit-content"}}>
        
          
            <div className="col">
            <div className="row" style={{float:"right",width:"500px"}} >
            <Link to={`/orders/${order._id}`}> 
            <p style={{fontSize:"30px", color:"black",alignContent:"center"}}>View more</p></Link> 
            <hr></hr>
            
            {/* <CardHeader><h4>Order Id:{order._id}</h4></CardHeader> */}
              <h6 style={{fontSize:"20px", color:"black",fontStyle:"normal"}}>Full Name : {order.fullName}</h6>
              <h6 style={{fontSize:"20px",color:"black"}}>Order Placed : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(order.updatedAt)))}</h6>
              <h6 style={{fontSize:"20px",color:"black"}}>Total amount : {order.price}</h6>
              <h6 style={{fontSize:"20px",color:"black"}}>Total items : {order.items}</h6>

            <button onClick={()=>{Deleteorder(order._id)}} variant="danger" style={{width:"200px",color:"white",backgroundColor:"red"}}>Cancel Order</button>
            
          
            </div>
            <div className="row" style={{float:"left"}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxF19h6rpnDCEHDkWvamGkom43CBJO3lGxQ&usqp=CAU" alt="order" style={{width:"300px"}}></img>

            </div>
            </div>
            
    
        

      </Card>
    </div>
  );
}







function OrdersComponent(props) {
  const errMess = props.ordersErrMess
  const orders = props.orders


  const items = orders.map((order)=> {
             
    return (
       <div key={order._id}>
     <RenderItem order={order}  />
       <br />
      </div>
         )
         }
         )


  const displayOrders =items.map((order) => {
          return (
            <div style={{ width: 1000,paddingLeft: "200px"}}>
              {order}
            </div>
          );
        });       

  if (errMess === null) {
    if (user) {
      if (orders.length) {
        //Displying orders of a particular user if there is no error and atleast one order is placed by them
        return (
          <div className="container">

          <div >
            <div style={{ paddingLeft: "6%", paddingBottom: "20px"}}>
            <Breadcrumb style={{ fontSize: "20px",padding:"3px" }} className='bdcrum'>
              <BreadcrumbItem><Link to="/myaccount">Account</Link></BreadcrumbItem>
              <BreadcrumbItem active>Orders</BreadcrumbItem>
            </Breadcrumb>
              <h3 style={{color:'white'}}>ORDERS</h3>
              
              {displayOrders}
              

            
            


             


              </div>
              
            </div>
          </div>
        );
      }
      //If there are no orders, a statement stating that is displayed
      else {
        return (
          <div className="mo">
            <div className="container">
              <div className="col-12 col-md-10">
                <h3 style={{ color: "#d10a9c" }}>ORDERS</h3>
                <h4 style={{ fontSize: "20px", color: "#07ada5" }}>No Orders placed.</h4>
              </div>
            </div>
          </div>
        );
      }
    }
    //If user is not logged in, displaying login message
    else {
      return (
        <div className="mo">
          <div className="container">
            <div className="col-12 col-md-10">
              <h4 style={{ fontSize: "20px", color: "#07ada5" }}>You must be logged in to display your orders</h4>
            </div>
          </div>
        </div>
      );
    }
  }
  //If any error occurs, an error message is displayed
  else {
    return (
      <div className="mo">
        <div className="col-12 col-md-10">
          <h5>{errMess}</h5>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteorder:(id)=>dispatch(deleteorder(id)),
    
  };
};


export default connect(null, mapDispatchToProps)(OrdersComponent);

