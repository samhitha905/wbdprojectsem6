import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import { Link } from 'react-router-dom';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem, Button, Row, Col } from 'reactstrap';

export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            sitems: [],
            currentName: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }
    searchName() {
        this.setState({
            currentName: null,
            currentIndex: -1

        });
        console.log(this.state.searchName)
        axios.get("http://localhost:8983/solr/wlslog/select?q=name:" + "*" + this.state.searchName + "*")
            .then(response => {
                console.log(response.data.response.docs);
                this.setState({
                    sitems: response.data.response.docs
                });

            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName, sitems } = this.state;

        return (


            <div className="ser">

                <div className="col-md-8">
                    <div className="center">
                        <input
                            type="search"
                            className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                <span style={{ backgroundColor: "whitesmoke", fontSize: "30px",padding:"5px" }} className="fa fa-search"></span>
                            </button>
                        </div>
                    </div>
                </div>


                {sitems.length > 0 ?
                    <div className='row' style={{ paddingLeft: "180px" }}>
                        <div className="row" style={{ width: "100%", float: "right" }}>
                            {sitems &&
                                sitems.map((item) => (

                                    <div style={{ width: 250 }}>

                                        <div className="zoom">
                                            <Card>
                                                <Link to={`/search/${item._id}`}>

                                                    <CardImg width="400px" height="400px" src={baseUrl + item.image} alt={item.name} style={{ overflow: "hidden" }}
                                                        onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
                                                        onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })} />
                                                    <div className='hg'>
                                                        <CardHeader><h4>{item.name}</h4></CardHeader>
                                                    </div>
                                                </Link>
                                            </Card>
                                        </div>
                                    </div>
                                ))}

                        </div>
                    </div>:<div><h2 style={{color:'white'}}><br/>No such newspapers and magazines</h2></div>
                }

            </div>
        );
    }
}