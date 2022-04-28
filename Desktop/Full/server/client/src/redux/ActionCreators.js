import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios';


//NEWSPAPERS

//function for fetching newspapers data from the server using fetch api and returning appropriate action creators based on server responses.
export const fetchNewspapers = () => (dispatch) => {
  dispatch(NewspapersLoading(true));
  
  return fetch(baseUrl + 'newspapers')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.response.data);
        throw errmess;
      })
    .then(response => response.json())
    .then(newspapers => dispatch(addNewspapers(newspapers)))
    .catch(error => dispatch(NewspapersFailed(error.message)));
}

//An ActionCreator of type NEWSPAPERS_LOADING 
export const NewspapersLoading = () => ({
  type: ActionTypes.NEWSPAPERS_LOADING
});

//An ActionCreator of the defined type, contains error message(indicating the error occurred while fetching newspapers) in the payload
export const NewspapersFailed = (errmess) => ({
  type: ActionTypes.NEWSPAPERS_FAILED,
  payload: errmess
});

//An ActionCreator of the defined type, contains the newspapers data in the payload
export const addNewspapers = (newspapers) => ({
  type: ActionTypes.ADD_NEWSPAPERS,
  payload: newspapers
});

//MAGAZINES
//function for fetching magazines data from the server using fetch api and returning appropriate action creators based on server responses.
export const fetchMagazines = () => (dispatch) => {

  dispatch(MagazinesLoading(true));

  return fetch(baseUrl + 'magazines')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(magazines => dispatch(addMagazines(magazines)))
    .catch(error => dispatch(MagazinesFailed(error.message)));
}

//An ActionCreator of type MAGAZINES_LOADING 
export const MagazinesLoading = () => ({
  type: ActionTypes.MAGAZINES_LOADING
});

//An ActionCreator of the defined type, contains error message(indicating the error occurred while fetching magazines) in the payload 
export const MagazinesFailed = (errmess) => ({
  type: ActionTypes.MAGAZINES_FAILED,
  payload: errmess
});

//An ActionCreator of the defined type, contains the magazines data in the payload
export const addMagazines = (magazines) => ({
  type: ActionTypes.ADD_MAGAZINES,
  payload: magazines
});

//FILTER
//Returning an actioncreator of the defined type, contains selected language value, filtered magazines based on language, and total magazines in the payload
export const filterMagazinesByLanguage = (magazines, lang) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FILTER_MAGAGINES_BY_LANG,
    payload: {
      lang: lang,
      items: lang === '' ? magazines : magazines.filter((mag) => mag.language === lang),
      magazines: magazines
    }
  })
}

// Returning an actioncreator of the defined type, contains selected category value, filtered magazines based on category, 
//     and the magazines(if filter by language is already applied, then these are the filtered magazines based on language) in the payload
export const filterMagazinesByCategory = (magazines, category) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FILTER_MAGAGINES_BY_CATEGORY,
    payload: {
      category: category,
      items: category === '' ? magazines : magazines.filter((mag) => mag.category === category),
      magazines: magazines
    }
  })
}

//Returning an actioncreator of the defined type, contains selected language value and filtered newspapers based on language in the payload
export const filterNewspapersByLanguage = (newspapers, lang) => (dispatch) => {
  return dispatch({
    type: ActionTypes.FILTER_NEWSPAPERS_BY_LANG,
    payload: {
      lang: lang,
      items: lang === '' ? newspapers : newspapers.filter((newspaper) => newspaper.language === lang)
    }
  })
}

//Function which sorts newspapers based on selected sort type
export const sortNewspapers = (products, sort) => (dispatch) => {
  //sorting from lowest to highest price  
  if (sort === "lowestprice") {
    products.sort((a, b) =>
      a.price > b.price ? 1 : -1)
  }
  //sorting from highest to lowest price       
  else if (sort === "highestprice") {
    products.sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
  }
  //sorting by alphabetical order
  else if (sort === "prname") {
    products.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
  }
  //If none of sort type is selected, sorting them via ids
  else {
    products.sort((a, b) => (a._id > b._id ? 1 : -1));
  }
  //Dispatching the appropriate sorted products and sort type 
  return dispatch({
    type: ActionTypes.SORT_NEWSPAPERS,
    payload: {
      sort: sort,
      items: products
    }
  })
}

//Function which sorts magazines based on selected sort type
export const sortMagazines = (products, sort) => (dispatch) => {
  //sorting from lowest to highest price  
  if (sort === "lowestprice") {
    products.sort((a, b) =>
      a.price > b.price ? 1 : -1)
  }
  //sorting from highest to lowest price  
  else if (sort === "highestprice") {
    products.sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
  }
  //sorting by alphabetical order
  else if (sort === "prname") {
    products.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
  }
  //If none of sort type is selected, sorting them via ids
  else {
    products.sort((a, b) => (a._id > b._id ? 1 : -1));
  }
  //Dispatching the appropriate sorted products and sort type 
  return dispatch({
    type: ActionTypes.SORT_MAGAZINES,
    payload: {
      sort: sort,
      items: products
    }
  })
}

//FEEDBACK
//function to post the feedback(given by users) to the server side. url to access the 'feedback' endpoint is given to the fetch function and performing post operation to post the feedback to the server.
export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {

  const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    telnum: telnum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  };


  return fetch(baseUrl + 'feedbacks', {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(feedback => alert('Thank you for your feedback!\n' + JSON.stringify(feedback)))
    .catch(error => { console.log('Post Feedback', error.message); alert('Your Feedback could not be posted\nError: ' + error.message); });
};


//REVIEWS
// An ActionCreator of the defined type, contains newly posted review in the payload
export const addReview = (review) => ({
  type: ActionTypes.ADD_REVIEW,
  payload: review
});

//function to post the reviews(given by users) to the server side. url to access the 'reviews' endpoint is given to the fetch function and performing post operation to store the reviews in the server.
export const postReview = (itemId, rating, author, review) => (dispatch) => {

  const newReview = {
    itemId: itemId,
    rating: rating,
    author: author,
    review: review
  };
  newReview.date = new Date().toISOString();

  return fetch(baseUrl + 'reviews', {
    method: "POST",
    body: JSON.stringify(newReview),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addReview(response)))
    .catch(error => { console.log('post reviews', error.message); alert('Your review could not be posted\nError: ' + error.message); });
};

//function for fetching the stored reviews from the server using fetch api and returning appropriate action creators based on server responses.
export const fetchReviews = () => (dispatch) => {
  return fetch(baseUrl + 'reviews')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(reviews => dispatch(addReviews(reviews)))
    .catch(error => dispatch(reviewsFailed(error.message)));
};

//An ActionCreator of the defined type, contains error message(indicating the error occurred while fetching reviews) in the payload 
export const reviewsFailed = (errmess) => ({
  type: ActionTypes.REVIEWS_FAILED,
  payload: errmess
});

//An ActionCreator of the defined type, contains the available reviews in the payload
export const addReviews = (reviews) => ({
  type: ActionTypes.ADD_REVIEWS,
  payload: reviews
});

//SIGNUP
//Actioncreator to add a new user to empty array
export const adduser = (user4) => ({
  type: ActionTypes.ADD_USER,
  payload: user4
});

//Action to post to server with data obtained from signup form
export const postsignup = (username, password) => (dispatch) => {
  const newuser = {
    username: username,
    password: password
  };
  return fetch(baseUrl + 'users', {
    method: "POST",
    body: JSON.stringify(newuser),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(details => {alert("You are successfully registered, login to continue more...");adduser(details)})
    .catch(error => { console.log('Post SignUp'); alert('Your details could not be posted signup\nError: '); });
};

//Fetching users from server
export const fetchUsers = () => (dispatch) => {
  return fetch(baseUrl + 'users')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(regusers => dispatch(addUsers(regusers)))
    .catch(error => { console.log('Fetch signup'); alert('Your details could not be fetched\nError: '); });
};

//Appending new users to already existing array
export const addUsers = (regusers) => ({
  type: ActionTypes.ADD_USERS,
  payload: regusers
});

//CART



//Function which fetches all the items from the server
export const fetchItems = () => async (dispatch) => {
  //fetches newspapers
  const newspapers = await Promise.all([
    fetch(baseUrl + 'newspapers').then(response => response.json()),

  ]);
  //fetches magazines
  const magazines = await Promise.all([
    fetch(baseUrl + 'magazines').then(response_1 => response_1.json())
  ])
  //Dispatching them to getproducts function 
  return dispatch(getproducts(newspapers, magazines));

}






// addtocart action creator to add items to cart 
//it takes itemid as input and return ADD_TO_CART as type itemid as payload
export const addToCart = (itemId) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: {
      id: itemId
    }
  }
};

// removefromcart action creator to delete items from cart 
// it takes itemid as input and return type as REMOVE_FROM_CART and payload as itemid
export const removefromCart = (itemId) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemId
    }
  }
};

// adjustQty action creator to change quantity  from cart   
//it takes itemid and value as input and returns  type as ADJUST_QTY and value as quantity
export const adjustQty = (itemId, value) => {
  return {
    type: ActionTypes.ADJUST_QTY,
    payload: {
      id: itemId,
      qty: value
    }
  }
};

// load currentitem creator to load current item from cart 
export const loadCurrentItem = (item) => {
  return {
    type: ActionTypes.LOAD_CURRENT_ITEM,
    payload: item
  }
};

//Function which combine both newspapers and magazines into one array
export const getproducts = (news, mags) => {
  return {
    type: ActionTypes.GET_PRODUCTS,
    payload: news[0].concat(mags[0])
  }

};

//Function which adds an order to the already present orders
export const orderPlaced = (order) => ({
  type: ActionTypes.ORDER_PLACED,
  payload: order
});

//Function which posts an order to the server with required details
export const postOrder = (fullName, address, city, postalCode, country, NameOnCard, CreditCardNum, ExpMon, ExpYear, Cvv, cart, user, price, items) => (dispatch) => {
  //Defining new order
  const newOrder = {
    fullName: fullName,
    address: address,
    city: city,
    postalCode: postalCode,
    country: country,
    NameOnCard: NameOnCard,
    CreditCardNum: CreditCardNum,
    ExpMon: ExpMon,
    ExpYear: ExpYear,
    Cvv: Cvv,
    cart: cart,
    user: user,
    price: price,
    items: items

  };
  newOrder.date = new Date().toISOString();
  //Fetching url and using POST method to add orders into server
  return fetch(baseUrl + 'orders', {
    method: "POST",
    body: JSON.stringify(newOrder),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    //Returning response
    .then(response => {
      if (response.ok) {
        return response;
        //Error message is displayed if any error occurs in the response
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      //Throwing error
      error => {
        throw error;
      })
    .then(response => response.json())
    //Placing the order
    .then(response => { alert("Your order has been placed succesfully"); dispatch(orderPlaced(response)) })
    //Emptying the cart
    .then((dispatch({ type: ActionTypes.CART_EMPTY })))
    //Catching errors and displaying necessary message
    .catch(error => { console.log('post orders', error.message); alert('Your order could not be placed\nError: ' + error.message); });
};

//Function which fetches orders from server
export const fetchOrders = () => (dispatch) => {
  //Making api call
  return fetch(baseUrl + 'orders')
    .then(response => {
      //Returning response
      if (response.ok) {
        return response;
      }
      //Error message if any error in response
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    //Thowing error
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    //Displaying all the orders placed
    .then(orders => dispatch(ordersPlaced(orders)))
    //Catching error and calling orderFailed function
    .catch(error => dispatch(orderFailed(error.message)));
};

//Function which displays error message
export const orderFailed = (errmess) => ({
  type: ActionTypes.ORDER_FAILED,
  payload: errmess
});

//Function which displays all the orders placed
export const ordersPlaced = (orders) => ({
  type: ActionTypes.ORDERS_PLACED,
  payload: orders
});

//Function DELETES AN ORDER
export const deleteorder = (orderId) => {
  return {
    type: ActionTypes.ORDER_DELETED,
    payload: {
      id: orderId
    }
  }
};


//BLOG
//adding blog to new empty array
export const addblog = (blog) => ({
  type: ActionTypes.ADD_BLOG,
  payload: blog
});

//Saving to server with details obtained from blog form
export const postblog = (username, topic, message) => (dispatch) => {

  const newblog = {
    user: username,
    title: topic,
    message: message
  };
  return fetch(baseUrl + 'blogs', {
    method: "POST",
    body: JSON.stringify(newblog),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addblog(response)))
    .catch(error => { console.log('Post Blog'); alert('Your Blog could not be posted\nError: '); });
};

//Fetching blogs
export const fetchBlogs = () => (dispatch) => {
  return fetch(baseUrl + 'blogs')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(blogs => dispatch(addBlogs(blogs)))
    .catch(error => { console.log('Post Feedback'); alert('Your Feedback could not be posted\nError: '); });
};
//appending blogs to existing array
export const addBlogs = (blogs) => ({
  type: ActionTypes.ADD_BLOGS,
  payload: blogs
});

//TOPRATED
//An actioncreator of the defined type, contains the details of top rated newspapers(the newspapers for which average rating lies between 4 and 5) in the payload
export const getTopNewspapers = (newspapers, reviews) => (dispatch) => {
  var array = [];
  reviews.map(rev => newspapers.map(np => rev.itemId === np._id ? array.push({ ...np }) : null))
  return dispatch({
    type: ActionTypes.TOP_RATED_NEWSPAPERS,
    payload: {
      items: array
    }
  })
}

//An actioncreator of the defined type, contains the details of top rated magazines(the magazines for which average rating lies between 4 and 5) in the payload
export const getTopMagazines = (magazines, reviews) => (dispatch) => {
  var array = [];
  reviews.map(rev => magazines.map(mag => rev.itemId === mag._id ? array.push({...mag}) : null) )
  return dispatch({
      type: ActionTypes.TOP_RATED_MAGAZINES,
      payload : {
        items: array,
        magazines: magazines
      }
  })
}
