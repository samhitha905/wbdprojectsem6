import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Signup extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        //Check if username already exists
        fetch(baseUrl + "users/" + values.username).then((data) => {
            console.log(data)
            //If not exists then post to server else show error message
            if (!data.ok) {
                this.props.postsignup(values.username, values.password);
                //Push to login after signup
                this.props.history.push('login')
                this.props.resetFeedbackForm();
            }
            else{
                alert('Username already exists')
                this.props.resetFeedbackForm();
            }
        })
    }

    render() {

        return (
            <div className='sgup'>
                <div className="container">
                    <div className="row">
                        <Breadcrumb style={{ fontSize: "20px" }} className='bdcrum'>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Sign Up</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Signup</h3>
                            <hr />
                        </div>
                    </div>
                    {/* Form to register */}
                    <div style={{ paddingLeft: "300px", paddingTop: "50px", paddingBottom: '80px', paddingRight: '200px' }}>
                        <div className="row row-content" style={{ borderRadius: '14px', backgroundColor: "lightgray", backgroundImage: `url('https://motionarray.imgix.net/preview-66333Q6ixuo47Yg_0013.jpg')`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                            <div className="col-12">
                                <h2 style={{ color: "#636303" }}>Register here </h2>
                                <ul style={{ fontFamily: "Footlight MT Light", color: "#6b0947", fontWeight: "bolder", fontSize: "20px" }}>
                                    <li>User Name must be greater than 2 letters and less than 15 characters</li>
                                    <li>Password must be greater than 2 letters and less than 10 characters</li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-10" style={{ fontFamily: "cursive", fontSize: "20px" }}>
                                <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                                    {/* Username input field */}
                                    <Row className="form-group">
                                        <Label htmlFor="username" style={{ fontFamily: "Sitka Heading", fontWeight: "bold", fontSize: "25px", color: "#031d63" }}>Username</Label>
                                        <Col md={8} style={{ borderRadius: "4px" }}>
                                            <Control.text model=".username" id="username" name="username"
                                                placeholder="User Name"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                            />
                                            <Errors style={{ fontSize: "18px", fontFamily: "gadugi", fontWeight: "900", color: "#f71505" }}

                                                model=".username"
                                                show="touched"
                                                messages={{
                                                    required: 'Required, ',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    {/* Password input field */}
                                    <Row className="form-group">
                                        <Label htmlFor="password" style={{ fontFamily: "Sitka Heading", fontWeight: "bold", fontSize: "25px", color: "#031d63" }}>Password</Label>
                                        <Col md={8} style={{ borderRadius: "4px" }}>
                                            <Control.text model=".password" id="password" name="password"
                                                placeholder="Password"
                                                type='password'
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(10)
                                                }}
                                            />
                                            <Errors style={{ fontSize: "18px", fontFamily: "gadugi", fontWeight: "900", color: "#f71505" }}

                                                model=".password"
                                                show="touched"
                                                messages={{
                                                    required: 'Required, ',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 10 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    {/* Submit Button */}
                                    <Row className="form-group">
                                        <Col md={{ size: 10 }} >
                                            <div className='zoom'>
                                                <Button type="submit" color="primary" style={{ backgroundColor: "saddlebrown", border: "none", color: "whitesmoke" }}>
                                                    SignUp
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    {/* Link to login page if already registered */}
                                    <Row className="form-group">
                                        <Col md={{ size: 10 }} style={{ color: "#035203", fontFamily: "Corbel", fontWeight: "bolder", fontSize: "24px" }}>
                                            <span>If existing user click   </span>

                                            <Link to="/login" style={{ color: "#109e10" }}>
                                                Here to Login
                                            </Link>
                                        </Col>
                                    </Row>
                                    <br />
                                </Form>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}

export default Signup;
