import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Card, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import { user } from './HeaderComponent';
import Pulse from 'react-reveal/Pulse';
import Jump from 'react-reveal/Jump';

let blogs
const required = (val) => val && val.length;

class Blog extends Component {
    constructor(props) {
        super(props);
        console.log(user)
        //storing blogs in blogs array
        blogs = props.blogs.blogs
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        //If user logged in then submit blog else redirect to login page
        if (user) {
            console.log('Current State is: ' + JSON.stringify(values));
            this.props.postblog(user, values.topic, values.message);
            this.props.resetFeedbackForm();
        }
        else {
            this.props.history.push('/signup')
        }
    }
    render() {
        return (
            <div className='cdblog'>
                <div className="container">
                    <div className="row">
                        <Breadcrumb style={{ fontSize: "20px", padding: "3px" }} className='bdcrum'>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Blog</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Jump>
                    
                    <div className="row align-items-start" style={{ paddingLeft: '5px', paddingTop: '5px' }}>
                        {/* Displaying blogs written by previous users */}
                        {blogs.map
                            (blog =>
                                <div className="col-4" >
                                    <Card style={{ backgroundColor: '#f2eeed' }}>
                                        <CardBody >
                                            <CardText><h2 style={{ fontFamily: 'Posterama', color: 'darkolivegreen', fontWeight: '550' }}>{blog.title}</h2></CardText>
                                            <CardText ><h4 style={{ fontFamily: 'Dubai', color: 'purple', fontSize: '20px' }}>{blog.message}</h4></CardText>
                                            <CardText ><h6 style={{ fontFamily: 'Maiandra GD', float: 'right', color: 'chocolate', fontSize: '18px' }}>-{blog.user}</h6></CardText>
                                        </CardBody>
                                    </Card>
                                    <br />
                                </div>
                            )
                        }
                        <br />
                    </div>
                    
                    </Jump>
                    <br />
                    <div className="row row-content" style={{ borderRadius: '14px', backgroundImage: `url('https://image.made-in-china.com/202f0j00gcylePHGlnqm/High-Quality-Plant-Simple-Design-Non-Woven-Country-Style-Mural-Living-Room-3D-Wallpaper.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '500px', width: '800px', margin: '0px' }}>
                        <div className="col-8 col-md-9" style={{ fontFamily: "cursive", fontSize: "20px" }}>
                            {/* Form to write new blogs */}
                            <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                                {/* Username field which is taken automatically from login details */}
                                <Row className="form-group">
                                    <Label htmlFor="username" style={{ color: "#e39b98", fontFamily: "cursive", fontSize: "20px" }}></Label>
                                    <Col md={12} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".username" id="username" name="username"
                                            placeholder="User Name"
                                            className="form-control"
                                            value={user}
                                            hidden
                                        />
                                    </Col>
                                </Row>
                                {/* Topic field*/}
                                <Row className="form-group">
                                    <Label htmlFor="topic" style={{ fontFamily: "Trebuchet MS", fontSize: "27px", fontWeight: '600', color: '#717300' }}>Topic</Label>
                                    <Col md={12} style={{ borderRadius: "4px" }}>
                                        <Control.text model=".topic" id="topic" name="topic"
                                            placeholder="Topic"
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                            style={{ fontFamily: 'Californian FB', fontWeight: 'bold', backgroundColor: 'snow', fontSize: '17px' }}
                                        />
                                        <Errors style={{ fontSize: "18px", fontFamily: "gadugi", fontWeight: "900", color: "#f71505", paddingLeft: '10px' }}
                                            model=".topic"
                                            show="touched"
                                            messages={{
                                                required: 'Required'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Field for writing blog */}
                                <Row className="form-group">
                                    <Label htmlFor="message" style={{ fontFamily: "Trebuchet MS", fontSize: "27px", fontWeight: '600', color: '#717300' }}>Your Blog</Label>
                                    <Col md={16} style={{ borderRadius: "4px" }}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="7"
                                            className="form-control"
                                            placeholder='Write your post here.....'
                                            validators={{
                                                required
                                            }}
                                            style={{ fontFamily: 'Californian FB', fontWeight: 'bold', backgroundColor: 'snow' }}
                                        />
                                        <Errors style={{ fontSize: "18px", fontFamily: "gadugi", fontWeight: "900", color: "#f71505", paddingLeft: '10px' }}
                                            model=".topic"
                                            show="touched"
                                            messages={{
                                                required: 'Required'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                {/* Submit button */}
                                <Row className="form-group">
                                    <Col md={{ size: 8 }} >
                                        <Button type="submit" color="primary" style={{ backgroundColor: "saddlebrown", border: "none", color: "whitesmoke", fontFamily: 'Segoe Print', fontWeight: 'bold' }}>
                                            Post Blog
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}

export default Blog;


