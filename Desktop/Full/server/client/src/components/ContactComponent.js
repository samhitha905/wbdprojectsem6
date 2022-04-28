import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import Flash from 'react-reveal/Flash';
import Fade from 'react-reveal/Fade';
import Jump from 'react-reveal/Jump';
//Validators
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // Save in server
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree, values.contactType, values.message);
        this.props.resetFeedbackForm();
    }

    render() {
        return (
            <div className='cu'>
                <div className="container" style={{ color: "white" }}>
                    <div className="row">
                        <Breadcrumb style={{ fontSize: "20px" }} className='bdcrum'>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            
                            <h3 style={{ color: "white" }}>Contact Us</h3>
                            
                            <hr />
                        </div>
                    </div>
                    <Fade right>
                    <div className="row row-content" style={{ float: 'right', margin: '0px', paddingTop: '150px', width: "450px" }}>
                        <div className="col-12">
                            <h3 style={{ color: "white" }}>Location Information</h3>
                        </div>
                        <Row>
                            <Col md={5}>
                                {/* Address*/}
                                <h5 style={{ color: "white" }}>Our Address</h5>
                                <address style={{ color: "white" }}>
                                    Kukatpally<br />
                                    Hyderabad<br />
                                    INDIA<br />
                                    <i className="fa fa-phone"></i>: +852 1234 5678<br />
                                    <i className="fa fa-fax"></i>: +852 8765 4321<br />
                                    <i className="fa fa-envelope"></i>: <a href="mailto:newspapersandmagazines@news.net">newspapersandmagazines@news.net</a>
                                </address>
                                <br />
                                <br />
                                <div className="btn-group" role="group">

                                    <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                                    <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                                    <a role="button" className="btn btn-success" href="mailto:newspapersandmagazines@news.net"><i className="fa fa-envelope-o"></i> Email</a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    </Fade>
                    <Jump>
                    <div className="row row-content" style={{ borderRadius: '6px', margin: '0px', paddingLeft: '0px' }}>
                        <div className="col-12">
                            <h3 style={{color:'white'}}>Send us your Feedback</h3>
                        </div>
                        <br />
                        {/* Feedback form */}
                        <div className="col-12 col-md-12" style={{ backgroundImage: `url('https://images.hdqwalls.com/download/dark-material-design-bx-2560x1440.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                                {/* First name field */}
                                <Row className="form-group" style={{ paddingTop: '10px' }}>
                                    <Label htmlFor="firstname" md={2} style={{ fontWeight: "bold" }}>First Name</Label>
                                    <Col md={9} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".firstname" id="firstname" name="firstname"
                                            placeholder="First Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            style={{ fontSize: '15px', backgroundColor: 'lightgray' }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".firstname"
                                            show="touched"
                                            messages={{
                                                required: 'Required, ',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                            style={{ fontSize: '18px', fontWeight: "800" }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Last name field */}
                                <Row className="form-group">
                                    <Label htmlFor="lastname" md={2} style={{ fontWeight: "bold" }}>Last Name</Label>
                                    <Col md={9} style={{ borderRadius: "4px", color: 'pink' }}>
                                        <Control.text model=".lastname" id="lastname" name="lastname"
                                            placeholder="Last Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            style={{ fontSize: '15px', backgroundColor: 'lightgray' }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".lastname"
                                            show="touched"
                                            messages={{
                                                required: 'Required, ',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                            style={{ fontSize: '18px', fontWeight: "800" }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Phone number field */}
                                <Row className="form-group">
                                    <Label htmlFor="telnum" md={2} style={{ fontWeight: "bold" }}>Contact Tel.</Label>
                                    <Col md={9} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".telnum" id="telnum" name="telnum"
                                            placeholder="Tel. number"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(10), maxLength: maxLength(10), isNumber
                                            }}
                                            style={{ fontSize: '15px', backgroundColor: 'lightgray' }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".telnum"
                                            show="touched"
                                            messages={{
                                                required: 'Required, ',
                                                minLength: 'Must be equal to 10 digits, ',
                                                maxLength: 'Must be equal to 10 digits',
                                                isNumber: 'Must be a number'
                                            }}
                                            style={{ fontSize: '18px', fontWeight: "800" }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Email field */}
                                <Row className="form-group">
                                    <Label htmlFor="email" md={2} style={{ fontWeight: "bold" }}>Email</Label>
                                    <Col md={9} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".email" id="email" name="email"
                                            placeholder="Email"
                                            className="form-control"
                                            validators={{
                                                required, validEmail
                                            }}
                                            style={{ fontSize: '15px', backgroundColor: 'lightgray' }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".email"
                                            show="touched"

                                            messages={{
                                                required: 'Required, ',
                                                validEmail: 'Invalid Email Address'
                                            }}
                                            style={{ fontSize: '18px', fontWeight: "800" }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Check box */}
                                <Row className="form-group">
                                    <Col md={{ size: 6, offset: 2 }}>
                                        <div className="form-check">
                                            <Label check >
                                                <Control.checkbox model=".agree"
                                                    name="agree"
                                                    className="form-check-input"
                                                    style={{ backgroundColor: 'lightgray' }}
                                                /> {' '}
                                                <strong>May we contact you?</strong>
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md={{ size: 2, offset: 1 }}>
                                        <Control.select model=".contactType" name="contactType"
                                            className="form-control" style={{ backgroundColor: 'lightgray' }}>
                                            <option>Tel.</option>
                                            <option>Email</option>

                                        </Control.select>
                                    </Col>
                                </Row>
                                <br />
                                {/* Feedback field */}
                                <Row className="form-group">
                                    <Label htmlFor="message" md={2} style={{ fontWeight: "bold" }}>Your Feedback</Label>
                                    <Col md={9}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="6"
                                            className="form-control"
                                            style={{ fontSize: '15px', backgroundColor: 'lightgray' }}
                                            validators={{
                                                required
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".message"
                                            show="touched"

                                            messages={{
                                                required: 'Required',
                                            }}
                                            style={{ fontSize: '18px', fontWeight: "800" }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Submit button */}
                                <Row className="form-group">
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="primary">
                                            Send Feedback
                                        </Button>
                                    </Col>
                                </Row>
                                <br />
                            </Form>
                        </div>
                        <br></br>
                    </div>
                    </Jump>
                </div>
            </div>

        );
    }
}

export default Contact;