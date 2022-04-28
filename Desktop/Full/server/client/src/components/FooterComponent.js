import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className="foo"  >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <br />
                        <h5 style={{ fontSize: "20px" }}>Links</h5>
                        {/* All links in our app */}
                        <ul className="list-unstyled">
                            <li><Link to='/home'><h4 style={{ fontSize: "17px", color: "rgb(30, 10, 214)" }}>Home</h4></Link></li>
                            <li><Link to='/newspapers'><h4 style={{ fontSize: "17px", color: "rgb(30, 10, 214)" }}>Newspapers</h4></Link></li>
                            <li><Link to='/magazines'><h4 style={{ fontSize: "17px", color: "rgb(30, 10, 214)" }}>Magazines</h4></Link></li>
                            <li><Link to='/aboutus'><h4 style={{ fontSize: "17px", color: "rgb(30, 10, 214)" }}>About Us</h4></Link></li>
                            <li><Link to='/contactus'><h4 style={{ fontSize: "17px", color: "rgb(30, 10, 214)" }}>Contact Us</h4></Link></li>
                            <li><Link to='/imgUpload'><h4 style={{ fontSize: "17px", color: "rgb(30, 10, 214)" }}>Upload Image</h4></Link></li>
                        </ul>
                    </div>
                    {/* Address details */}
                    <div className="col-7 col-sm-5">
                        <br />
                        <h5 style={{ fontSize: "20px", color: "brown" }}>Our Address</h5>
                        <address>
                            <h5 style={{ fontSize: "17px", color: "black" }}>Kukatpally</h5>
                            <h5 style={{ fontSize: "17px", color: "black" }}>Hyderabad</h5>
                            <h5 style={{ fontSize: "17px", color: "black" }}>INDIA</h5>
                            <h5 style={{ fontSize: "15px", color: "black" }}><i className="fa fa-phone fa-lg"></i>: +852 1234 5678</h5>
                            <h5 style={{ fontSize: "15px", color: "black" }}><i className="fa fa-fax fa-lg"></i>: +852 8765 4321</h5>
                            <h5 style={{ fontSize: "15px" }}><i className="fa fa-envelope fa-lg"></i>: <a href="mailto:newspapersandmagazines@news.net">
                                newspapersandmagazines@news.net</a></h5>
                        </address>
                    </div>
                    {/* Contact means */}
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto" style={{ color: "black" }}>
                        <p>© Copyright 2021 Newspapers And Magazines</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;