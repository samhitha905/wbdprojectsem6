import React, { useState } from 'react';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';


function Searchc({ items }) {
  // initially we set searchfield to empty

  const [searchField, setSearchField] = useState("")
  


  //filter items based on searchfield

  const filteredItems = items.filter(

    (item) => {
      return (
        item
          .name
          .toLowerCase()
          .includes(searchField.toLowerCase())
      );
    }
  );

  // search field gets changed automatically based on value entered by user in search bar

  const handleChange = (e) => {
    setSearchField(e.target.value);

  };


  //below function renders filtered items as cards for display

  function RenderItem({ item }) {
    return (
      <div className="zoom">
        <Card>
          <Link to={`/searchc/${item._id}`}>
            
            <CardImg width="400px" height="400px" src={baseUrl + item.image} alt={item.name} style={{ overflow: "hidden" }}
              onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
              onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}/>
            <div className='hg'>
            <CardHeader><h4>{item.name}</h4></CardHeader>
            </div>
          </Link>
        </Card>
      </div>

    );
  }


  //we call above render item function for each and every filtered item

  const display = filteredItems.map((item) => {
    if (searchField !== "") {

      return (
        <div style={{ width: 250 }}>
          <RenderItem item={item} />
        </div>
      );
    }
  });


  return (
    <div className='ser'>
      <section className='garamound'>

        <div className="center">

          {/* we take input from user  */}
          <input
            className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
            type="search"
            placeholder="Search for desired newspapers or magazines"
            onChange={handleChange}
            style={{width:"40%",padding:"5px",margin:"5px"}}
          />
          <span style={{ backgroundColor: "whitesmoke", fontSize: "30px",padding:"5px" }} className="fa fa-search"></span>
        </div>

        <div className='row' style={{ paddingLeft: "180px" }}>
          <div className="row" style={{ width: "100%", float: "right" }}>
            {display}
          </div>
        </div>

      </section>
    </div>
  );
}

export default Searchc;