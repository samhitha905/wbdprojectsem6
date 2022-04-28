import React, { useState } from 'react';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem, Button, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import ReactPaginate from "react-paginate";
import "./paginate.css";
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Flash from 'react-reveal/Flash';
import ReactStars from 'react-stars';

//Displaying the item with image and name in the form of card
function RenderItem({ item, rating }) {

  return (
    <div className="zoom">
      <Card>
        <Link to={`/newspapers/${item._id}`}>
          <Pulse duration={1000}>
            <CardImg width="400px" height="400px" src={baseUrl + item.image} alt={item.name} style={{ overflow: "hidden" }}
              onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
              onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })} />
            <div className='hg'>
              <CardHeader><h4>{item.name}</h4></CardHeader>
              <CardBody>
               <CardTitle><ReactStars count={5} size={24} value={rating} color2={'#ffd700'} edit={false} /></CardTitle>
               <CardText><h5 style={{fontSize:"20px"}}>Rs.{item.price}</h5></CardText>
              </CardBody>
            </div>
          </Pulse>
        </Link>

      </Card>
    </div>
  );
}


const NewspapersMain = (props) => {

  //calculating average rating for all newspapers and storing them in an array along with newspaper ids
  var items_reviews = [];
  var item_review = {};
  var len = props.newspapers.newspapers.length;
  var data = props.newspapers.newspapers;

  for (var i = 0; i < len; i++) {
    var sum = 0, avg = 0;
    item_review.itemId = data[i]._id;
    var revs = props.reviews.filter(rev => rev.itemId === data[i]._id);
    if (revs.length) {
      sum = revs.map(rev => rev.rating).reduce((r1, r2) => r1 + r2, 0);
      avg = sum / revs.length;
    }
    item_review.avgRating = avg;
    items_reviews.push({ ...item_review });
  }
  console.log(items_reviews)

  // In an array, storing the average rating values along with ids of only those newspapers for which average rating lies between 4 and 5.
  var filtered_revs = items_reviews.filter(rev => rev.avgRating >= 4 && rev.avgRating <= 5);



  //Sending each newspaper to RenderItem function 
  const items = props.newspapers.filteredItems.map((item) => {
    var review = items_reviews.filter(rev => rev.itemId === item._id)
    return (
      <div key={item._id}>
        <RenderItem item={item} rating={review[0].avgRating} />
        <br />
      </div>
    )
  }
  )

  const [papers, setPapers] = useState(items);
  const [pageNumber, setPageNumber] = useState(0);

  const papersPerPage = 4;
  const pagesVisited = pageNumber * papersPerPage;
  const pageCount = Math.ceil(papers.length / papersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayPapers = papers
    .slice(pagesVisited, pagesVisited + papersPerPage)
    .map((paper) => {
      return (
        <div style={{ width: 250 }}>
          {paper}
        </div>
      );
    });

  //Calling the loading component when newspapers are loading
  if (props.newspapers.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  //Displaying error message if newspapers are failed to load 
  else if (props.newspapers.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.newspapers.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }

  //Displaying newspapers in the form of card
  else {
    return (
      <div className="np">
        <div style={{ paddingLeft: "70px", paddingRight: "15px" }}>
          <div className="row">
            {/* Displaying breadcrum to navigate easily to home page */}
            <Breadcrumb style={{ fontSize: "20px" }} className='bdcrum'>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Newspapers</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <Flash>
                <h3 style={{ color: "white" }}>NEWSPAPERS</h3>
              </Flash>
              <hr />
            </div>
          </div>
          <br />
          <div className="row">
            <div style={{ width: "17%", float: "left", paddingRight: "0px", fontSize: "20px" }}>

              {/* providing language filter by giving language select options in the form of a dropdown menu */}
              <div style={{ padding: "10px" }}>
                <label style={{ color: "#e39b98", fontFamily: "cursive" }}>Filter By Language:</label>
                <select className="form-control" value={props.newspapers.language}
                  onChange={(e) => props.filterByLanguage(props.newspapers.newspapers, e.target.value)}>
                  <option value="">ALL</option>
                  <option value="English">English</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
              {/* Sorting the newspapers by price and name by calling sort_newspapers function */}

              <div style={{ padding: "10px" }}>
                <label style={{ color: "#e39b98", fontFamily: "cursive", fontSize: "20px" }}>
                  Sort by:</label>
                <select className="form-control"
                  value={props.newspapers.sort}
                  onChange={(e) => props.sort_newspapers(props.newspapers.filteredItems, e.target.value)}>
                  <option value="">ALL</option>
                  <option value="lowestprice">Low to high price</option>
                  <option value="highestprice">High to low price</option>
                  <option value="prname">Name</option>
                </select>
              </div>
              <br />
              <br />
              <br />

              {/* Created a button for displaying top rated newspapers(newspapers for which average rating lies between 4 and 5)  */}
              <div style={{ padding: "10px" }} className='zoom'>
                <Button onClick={() => props.topNewspapers(props.newspapers.newspapers, filtered_revs)}><h3 style={{ fontSize: "17px", color: "white", fontFamily: "cursive", fontWeight: "bolder" }}>
                  Top Rated Newspapers</h3></Button>
              </div>
            </div>

            <div className="row" style={{ width: "80%", float: "right" }} >
              <Fade right>

                {/* we call pagination for total newspapers */}
                {displayPapers}
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />

              </Fade>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewspapersMain;