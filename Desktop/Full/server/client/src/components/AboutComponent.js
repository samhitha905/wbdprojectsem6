import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import Jump from 'react-reveal/Jump';
import LightSpeed from 'react-reveal/LightSpeed';
import HeadShake from 'react-reveal/HeadShake';

//About the app
function About(props) {

    return (
        <div className='au'>
            <div className="container">
                <div className="row">
                    {/* Breadcrum */}
                    <Breadcrumb style={{ fontSize: "20px" }} className='bdcrum'>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3 style={{ color: "#e39b98" }}>About Us</h3>
                        <hr />
                    </div>
                </div>
                {/* Description about our app */}
                <div className="row row-content">
                    <Jump>
                        <div className="col-12 col-md-7" style={{ color: "white" }}>

                            <h2></h2>
                            <p>- In this react application, One can subscribe to their desired newspapers and magazines even if they are not available in their localities.</p>
                            <p>- Instead of contacting a particular distributor for each type of newspaper and magazine, it is easy to find various kinds of popular newspapers and magazines at one place.</p>
                            <p>- In this app we provide famous and well known newspapers of two languages(English and Telugu), magazines of two languages(English and Telugu) and of four different categories that seem to be more preferred by magazine readers.</p>
                            <p>- Users can extend their subscription plan of a desired newspaper and magazine for a period of time.
                                Users can subscribe to multiple newspapers and magazines at a time by adding them to cart and can place the order.
                            </p>
                        </div>
                    </Jump>
                    {/* Developers of our app */}
                    <div className="col-12 col-md-5" >
                        <HeadShake>
                            <Card >
                                <CardHeader style={{ backgroundColor: "#72e9ed" }} ><h4 style={{ color: "brown", fontSize: "20px" }}>Project Management Team</h4></CardHeader>
                                <CardBody style={{ backgroundColor: "#abbaba" }}>
                                    <dl className="row p-1" style={{ color: "black" }} >
                                        <dt className="col-6">R. Bhagya Sree</dt>
                                        <dt className="col-6">P.V. Nandhini</dt>
                                        <dt className="col-6">B.G. Jaya Samhitha</dt>
                                        <dt className="col-6">I. Bhanu Aswitha</dt>
                                        <dt className="col-6">T. Swetha</dt>
                                        <dt className="col-6">K. Sadguna</dt>

                                    </dl>
                                </CardBody>
                            </Card>
                        </HeadShake>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default About;    