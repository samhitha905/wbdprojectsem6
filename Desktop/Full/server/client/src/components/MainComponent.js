import React, { Component, useEffect } from 'react';
import {Header,user} from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Account from './AccountComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import NewspapersMain from './NewspapersComponent';
import Searchc from './Searchc';
import Cart from './Cart';
import { Login } from './Login';
import NewspaperDetail from './NewspaperDetail';
import MagazinesMain from './MagazinesComponent';
import OrderDetail from './OrderDetail';
import ItemDetail from './ItemDetail';
import MagazineDetail from './MagazineDetail';
import Signup from './Signup';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchNewspapers, fetchMagazines, filterMagazinesByCategory,
  filterMagazinesByLanguage,
  filterNewspapersByLanguage, sortNewspapers, sortMagazines, postFeedback, postsignup, fetchUsers, fetchReviews, postReview,
  getproducts, addToCart, removefromCart, adjustQty,deleteorder, fetchOrders, postOrder, fetchItems, postblog, fetchBlogs,
  getTopNewspapers, getTopMagazines
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

import Checkout from './Checkout';
import OrdersComponent from './OrdersComponent';
import Blog from './Blog';
import Upload from './upload';
import TutorialsList from './abc';


//Mapping state to props
const mapStateToProps = (state) => (
  {
    newspapers: state.newspapers,
    magazines: state.magazines,
    reviews: state.reviews,
    cartitem: state.cartReducer,
    regusers: state.regusers,
    orders: state.orders,
    blogs: state.blogs
  }
);

//dispatching props
const mapDispatchToProps = (dispatch) => ({

  fetchNewspapers: () => { dispatch(fetchNewspapers()) },
  fetchMagazines: () => { dispatch(fetchMagazines()) },
  fetchUsers: () => { dispatch(fetchUsers()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  postsignup: (username, password) => dispatch(postsignup(username, password)),
  filterMagsByCategory: (magazines, category) => dispatch(filterMagazinesByCategory(magazines, category)),
  filterMagsByLanguage: (magazines, language) => dispatch(filterMagazinesByLanguage(magazines, language)),
  filterNewspapersByLanguage: (newspapers, language) => dispatch(filterNewspapersByLanguage(newspapers, language)),
  sortNewspapers: (newspapers, sort) => dispatch(sortNewspapers(newspapers, sort)),
  sortMagazines: (magazines, sort) => dispatch(sortMagazines(magazines, sort)),
  fetchReviews: () => { dispatch(fetchReviews()) },
  postReview: (itemId, rating, author, review) => dispatch(postReview(itemId, rating, author, review)),
  getproducts: (newspapers, magazines) => { dispatch(getproducts(newspapers, magazines)) },
  addtocart: (id) => { dispatch(addToCart(id)) },
  resetCheckoutForm: () => { dispatch(actions.reset('order')) },
  fetchOrders: () => { dispatch(fetchOrders()) },
  postOrder: (fullName, address, city, postalCode, country, NameOnCard, CreditCardNum, ExpMon, ExpYear, Cvv, cart, user, price, items) => dispatch(postOrder(fullName, address, city, postalCode, country, NameOnCard, CreditCardNum, ExpMon, ExpYear, Cvv, cart, user, price, items)),
  topRatedNewspapers: (newspapers, reviews) => dispatch(getTopNewspapers(newspapers, reviews)),
  topRatedMagazines: (magazines, reviews) => dispatch(getTopMagazines(magazines, reviews)),
  fetchItems: () => { dispatch(fetchItems()) },
  fetchBlogs: () => { dispatch(fetchBlogs()) },
  
  
  postblog: (username, topic, message) => dispatch(postblog(username, topic, message))

});


class Main extends Component {

  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchNewspapers();
    this.props.fetchMagazines();
    this.props.fetchReviews();
    this.props.fetchUsers();
    this.props.fetchOrders();
    this.props.fetchBlogs();
  }


  render() {
    //Sending appropriate details from json server to Homepage component
    const HomePage = () => {
      return (
        <Home
          newspapers={this.props.newspapers.newspapers.filter((newspaper) => newspaper.featured)}
          newspapersLoading={this.props.newspapers.isLoading}
          newspapersErrMess={this.props.newspapers.errMess}
          magazines={this.props.magazines.magazines.filter((magazine) => magazine.featured)}
        />
      );
    }
    //Sending appropriate details from json server to Newspaper page
    const NewspapersMainPage = () => {
      return (
        <NewspapersMain
          newspapers={this.props.newspapers}
          filterByLanguage={this.props.filterNewspapersByLanguage}
          reviews={this.props.reviews.reviews}
          sort_newspapers={this.props.sortNewspapers}
          topNewspapers={this.props.topRatedNewspapers}
        />
      );
    }
    //Sending appropriate details from json server to Magazines page
    const MagazinesMainPage = () => {
      return (
        <MagazinesMain
          magazines={this.props.magazines}
          filterByCategory={this.props.filterMagsByCategory}
          filterByLanguage={this.props.filterMagsByLanguage}
          reviews={this.props.reviews.reviews}
          sort_magazines={this.props.sortMagazines}
          topMagazines={this.props.topRatedMagazines}
        />
      );
    }
    //Sending appropriate details from json server to Newspaper detail component
    const NewspaperWithId = ({ match }) => {
      return (
        <NewspaperDetail paperSelected={this.props.newspapers.newspapers.filter((paper) => paper._id === match.params.paperId)[0]}
          isLoading={this.props.newspapers.isLoading}
          errMess={this.props.newspapers.errMess}
          reviews={this.props.reviews.reviews.filter((review) => review.itemId === match.params.paperId)}
          reviewsErrMess={this.props.reviews.errMess}
          postReview={this.props.postReview}
          addtocart={this.props.addtocart}
          getproducts={this.props.getproducts}
          newspapers={this.props.newspapers}
          magazines={this.props.magazines}
          checkorders={this.props.orders.orders.filter((order)=>order.user===user)}
        />
      );
    }
    //Sending appropriate details from json server to Magazines detail component
    const MagazineWithId = ({ match }) => {
      return (
        <MagazineDetail magSelected={this.props.magazines.magazines.filter((magazine) => magazine._id === match.params.magId)[0]}
          isLoading={this.props.magazines.isLoading}
          errMess={this.props.magazines.errMess}
          reviews={this.props.reviews.reviews.filter((review) => review.itemId === match.params.magId)}
          reviewsErrMess={this.props.reviews.errMess}
          postReview={this.props.postReview}
          addtocart={this.props.addtocart}
          getproducts={this.props.getproducts}
          newspapers={this.props.newspapers}
          magazines={this.props.magazines}
          checkorders={this.props.orders.orders.filter((order)=>order.user===user)}
        />
      );
    }


    const OrderWithId = ({ match }) => {
      return (
        <OrderDetail orderSelected={this.props.orders.orders.filter((order) => order._id === match.params.orderId)[0]} />
      );
    }

    const ItemWithId = ({ match }) => {
      return (
        <ItemDetail itemSelected={this.props.cartitem.items.filter((item) => item._id === match.params.itemId)[0]}
          isLoading={this.props.magazines.isLoading}
          errMess={this.props.magazines.errMess}
          addtocart={this.props.addtocart}
          getproducts={this.props.getproducts}
          reviews={this.props.reviews.reviews.filter((review) => review.itemId === match.params.itemId)}
          reviewsErrMess={this.props.reviews.errMess}
          postReview={this.props.postReview}
          checkorders={this.props.orders.orders.filter((order) => order.user === user)}
        />
      );
    }
   
    
      
    

    return (
      <div>
        <Header />
        {/* Going to appropriate page */}
        <Switch location={this.props.location}>
          
          <Route path='/home' component={HomePage} />
          <Route path='/imgUpload' component={() => <Upload />} />
          <Route path='/orders/:orderId' component={OrderWithId} />
          <Route exact path='/login' component={() => <Login {...this.props} />} />
          <Route exact path='/signup' component={() => <Signup {...this.props} />} />
          <Route exact path='/newspapers' component={NewspapersMainPage} />
          <Route path='/newspapers/:paperId' component={NewspaperWithId} />
          <Route exact path='/magazines' component={MagazinesMainPage} />
          <Route path='/magazines/:magId' component={MagazineWithId} />
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route path='/myaccount' component={() => <Account {...this.props} />} />
          <Route path='/aboutus' component={() => <About />} />
          <Route path='/cart' component={() => <Cart getproducts={this.props.getproducts} newspapers={this.props.newspapers} magazines={this.props.magazines} cart={this.props.cartitem.cart} />} />
          <Route exact path='/searchc' component={() => <Searchc items={this.props.cartitem.items} />} />
          <Route path='/searchc/:itemId' component={ItemWithId} />
          <Route path='/checkout' component={() => <Checkout resetCheckoutForm={this.props.resetCheckoutForm} postOrder={this.props.postOrder} cart={this.props.cartitem.cart} />} />
          <Route path='/orders' component={() => <OrdersComponent orders={this.props.orders.orders.filter((order) => order.user === user)} ordersErrMess={this.props.orders.errMess} deleteorder={this.props.deleteorder} />} />
         
          <Route path='/blog' component={() => <Blog {...this.props} />} /> 
          <Route path='/search' component={TutorialsList}/>
          <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));