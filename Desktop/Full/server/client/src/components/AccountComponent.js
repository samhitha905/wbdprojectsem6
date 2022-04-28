import React from 'react';
import user_icon from './usericon.jpg';
import { Card, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump'

let filter_review, items_newspaper, items_magazines, items
let user;
if(localStorage.getItem('login')){
      const tokenDetailsString = localStorage.getItem('login');
      let tokenDetails = '';
      tokenDetails = JSON.parse(tokenDetailsString)
      console.log(tokenDetails)
      user = tokenDetails.user
}
//My account function
function Account(props) {
    if(localStorage.getItem('login')){
        const tokenDetailsString = localStorage.getItem('login');
        let tokenDetails = '';
        tokenDetails = JSON.parse(tokenDetailsString)
        console.log(tokenDetails)
        user = tokenDetails.user
  }
    
    console.log(props.reviews.reviews)
    filter_review = props.reviews.reviews
    //Filtering reviews based on user_name
    filter_review = filter_review.filter((review) => review.author === user)
    items_newspaper = props.newspapers.newspapers
    console.log(items_newspaper)
    items_magazines = props.magazines.magazines
    //Storing both newspapers and magazines in a array
    items = items_newspaper.concat(items_magazines)
    //Logout function
    const Logout = () => {
        //Redirecting to page after logout
        localStorage.removeItem('login')
        window.location.href = '/'
    }
    return (
        <div className='acc'>
            <div className='container' style={{ display: 'inline-block' }}>
                <Breadcrumb style={{ fontSize: "20px", padding: "5px" }} className='bdcrum'>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>My account</BreadcrumbItem>
                </Breadcrumb>
                <div style={{ float: 'left' }}>
                    <img src={user_icon} alt='user icon image' />
                    <Zoom>
                        <h1 style={{ color: 'goldenrod', fontFamily: 'Maiandra GD' }}> Welcome back {user}</h1>
                    </Zoom>
                    {/* If user logged in then display logout button else no */}
                    {user ?
                        <div className='zoom'>
                            <h2 style={{ paddingLeft: '20px' }}>
                                <Button style={{ font: 'bold', width: "30%", fontSize: '15px', fontWeight: 'bold', backgroundColor: 'burlywood', color: 'black' }} onClick={Logout}>Logout</Button>
                            </h2>
                        </div>
                        :
                        <div></div>
                    }
                </div>
                <div>
                    
                    {user ?
                        <div>
                            <h1 style={{ fontSize: '39px', color: 'steelblue', fontFamily: 'High Tower Text' }}><li>Your reviews</li></h1>
                            
                            {filter_review.length !== 0 ?
                                <div style={{ paddingLeft: '0px', width: "1300px" }}>
                                    <h2 style={{ fontSize: '35px', color: 'lightpink', fontFamily: 'Gabriola', fontWeight: '500' }}>No.of reviews: {filter_review.length}</h2>
                                    <div className='row align-items-end '>
                                        {filter_review.map
                                            (rev =>
                                                <div className='col-4'>
                                                    <Card style={{ width: '300px', backgroundColor: '#f2f2f2' }}>
                                                        <CardBody>
                                                            
                                                            {items.map
                                                                (ite =>
                                                                    <div>
                                                                        {rev.itemId === ite._id ?
                                                                            <CardText style={{ fontSize: '27px', fontFamily: 'Tw Cen MT', color: 'purple',fontWeight:'lighter' }}>Name: {ite.name}</CardText>
                                                                            : <div></div>
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                            <CardText style={{ fontSize: '23px', paddingLeft: '0px', fontFamily: 'Tw Cen MT', color: 'teal',fontWeight:'lighter' }}>Review: {rev.review}</CardText>
                                                        </CardBody>
                                                    </Card>
                                                    <br />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                :
                                <div><h2 style={{ fontSize: '40px', color: 'lightyellow', fontFamily: 'Gabriola', fontWeight: '500' }}>No reviews given yet</h2></div>
                            }
                        </div> :
                        <div>
                            <Jump>
                                <h1 style={{ color: 'snow', fontFamily: 'Maiandra GD' }}>Login to view more</h1>
                            </Jump>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Account;