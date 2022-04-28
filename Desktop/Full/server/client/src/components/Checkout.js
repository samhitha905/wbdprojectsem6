import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { user } from "./HeaderComponent";
import { price, items } from "./Cart";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
//Required validators
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const Length = (len) => (val) => val && (val.length === len);
const isNumber = (val) => !isNaN(Number(val));

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //Calling postOrder function with required elements which posts orders to server
    handleSubmit(values) {
        this.props.postOrder(values.fullName, values.address, values.city, values.postalCode,
            values.country, values.NameOnCard, values.CreditCardNum, values.ExpMon, values.ExpYear, values.Cvv,
            this.props.cart, user, price, items);
        //Resetting checkout form
        this.props.resetCheckoutForm();

    }
    render() {
        console.log((this.props.cart).length)
        return (

            //Checkout form with shipping address and payment details
            <div className="row row-content" style={{ backgroundImage: `url("https://w0.peakpx.com/wallpaper/909/359/HD-wallpaper-black-lines-material-design-creative-geometric-shapes-lollipop-lines-black-material-design-strips-geometry-black-backgrounds.jpg")`, paddingLeft: "8%", paddingRight: "7%" }} >
                <Breadcrumb style={{ fontSize: "20px" }} className='bdcrum'>
                    <BreadcrumbItem><Link to="/cart">Cart</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Checkout</BreadcrumbItem>
                </Breadcrumb>
                <br />
                <br />
                <div className='chout'>
                    <div className="col-12 col-md-11" >
                        <Form model="order" onSubmit={(values) => this.handleSubmit(values)} style={{ paddingTop: "10px" }}>
                            <div style={{ float: "left", width: "48%" }}>
                                <h3>Shipping Address</h3>
                                <br />
                                {/* Label FullName with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="fullName" md={3} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>Full Name</h4></Label>
                                    <Col md={9} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".fullName" id="fullName" name="fullName"
                                            placeholder="Enter full name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".fullName"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Label Address with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="address" md={3} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>Address</h4></Label>
                                    <Col md={9} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".address" id="address" name="address"
                                            placeholder="Enter address"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".address"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Label City with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="city" md={3} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>City</h4></Label>
                                    <Col md={9} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".city" id="city" name="city"
                                            placeholder="Enter city"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".city"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Label PostalCode with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="postalCode" md={3} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>Postal Code</h4></Label>
                                    <Col md={9} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".postalCode" id="postalCode" name="postalCode"
                                            placeholder="Enter postalCode"
                                            className="form-control"
                                            validators={{
                                                required, isNumber, Length: Length(6)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".postalCode"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                isNumber: 'Must be a number',
                                                Length: 'Must be a 6 digit code'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Label Country with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="country" md={3} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>Country</h4></Label>
                                    <Col md={9} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".country" id="country" name="country"
                                            placeholder="Enter country"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".country"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',

                                            }}
                                        />
                                    </Col>
                                </Row>

                                <br />
                            </div >
                            <div style={{ float: "right", width: "50%", paddingLeft: "20px" }}>
                                <h3>Payment Details</h3>
                                <br />
                                {/* Label Name on card with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="NameOnCard" md={4} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>Name On Card</h4></Label>
                                    <Col md={8} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".NameOnCard" id="NameOnCard" name="NameOnCard"
                                            placeholder="Enter Name On Card"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".NameOnCard"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',

                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Label Credit card number with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="CreditCardNum" md={4} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>Credit Card Number</h4></Label>
                                    <Col md={8} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".CreditCardNum" id="CreditCardNum" name="CreditCardNum"
                                            placeholder="Enter Credit Card Number"
                                            className="form-control"
                                            validators={{
                                                required, Length: Length(16), isNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".CreditCardNum"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                Length: 'Must be a 16 digits number',
                                                isNumber: 'Must be a number'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Label Expiry month with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="ExpMon" md={4} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>Expiry Month</h4></Label>
                                    <Col md={8} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".ExpMon" id="ExpMon" name="ExpMon"
                                            placeholder="Enter Expiry Month"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(1), maxLength: maxLength(2), isNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".ExpMon"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 1 number',
                                                maxLength: 'Must be 2 numbers or less',
                                                isNumber: 'Must be a number'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Label Expiry year with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="ExpYear" md={4} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>Expiry Year</h4></Label>
                                    <Col md={8} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".ExpYear" id="ExpYear" name="ExpYear"
                                            placeholder="Enter Expiry Year"
                                            className="form-control"
                                            validators={{
                                                required, Length: Length(4), isNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".ExpYear"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                isNumber: 'Must be a number',
                                                Length: 'Must be a 4 digit number'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Label CVV with required validators and error messages*/}
                                <Row className="form-group">
                                    <Label htmlFor="Cvv" md={4} style={{ fontWeight: "bold" }}><h4 style={{ fontSize: "20px", color: "#2d034f" }}>CVV</h4></Label>
                                    <Col md={8} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".Cvv" id="Cvv" name="Cvv"
                                            placeholder="Enter CVV"
                                            className="form-control"
                                            validators={{
                                                required, Length: Length(3), isNumber
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".Cvv"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                isNumber: 'Must be a number',
                                                Length: 'Must be a 3 digit number'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                            </div>
                            {/* Clicking button places order  */}
                            <Row >
                                <Col md={{ size: 10, offset: 5 }}>
                                    <div className="zoom">
                                        <Button type="submit" style={{ backgroundColor: "#05657d" }}>
                                            <h4>Place Subscription</h4>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <br />

                        </Form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Checkout;