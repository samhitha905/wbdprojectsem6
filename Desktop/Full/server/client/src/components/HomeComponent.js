import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';

//Functional Component to render each featured newspaper in a reactstrap Card.
function RenderNewspaper({ item }) {
    return (
        <div className="zoom">
            {/* Applied FadeTransform animation to the reactstrap Card by giving tansformProps */}
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <Link to={`/newspapers/${item._id}`}>            {/* linking each featured newspaper to it's details page */}
                        <CardImg width="100%" height="400px" src={baseUrl + item.image} alt={item.name} />
                        <div className='hg'>
                            <CardHeader><h4>{item.name}</h4></CardHeader>
                        </div>
                    </Link>
                </Card>
            </FadeTransform>
        </div>
    );
}

//Funtional component to render each featured magazine in a reactstrap Card
function RenderMagazine({ item }) {
    console.log(item)
    return (
        <div className="zoom">
            {/* Applied FadeTransform animation to the reactstrap Card by giving tansformProps */}
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <Link to={`/magazines/${item._id}`}>            {/* linking each featured magazine to it's details page */}
                        <CardImg width="100%" height="400px" src={baseUrl + item.image} alt={item.name} />
                        <div className='hg'>
                            <CardHeader><h4>{item.name}</h4></CardHeader>
                        </div>
                    </Link>
                </Card>
            </FadeTransform>
        </div>
    );
}

function Home(props) {

    //Rendering the featured newspapers
    //Calling the render newspaper function for each featured newspaper

    const newspapers = props.newspapers.map((newspaper) => {
        return (
            <div className="col-12 col-md-3" key={newspaper._id}>
                <RenderNewspaper item={newspaper} />
            </div>

        );
    });

    //Rendering the featured magazines
    //Calling the render magazine function for each featured magazine
    const magazines = props.magazines.map((magazine) => {
        return (
            <div className="col-12 col-md-3" key={magazine._id}>
                <RenderMagazine item={magazine} />
            </div>

        );
    });


    //condition for displaying loading icon while fetching the data from the json-server.
    if (props.newspapersLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    //condition for displaying error message when the data are failed to fetch from the (mock)server.
    else if (props.newspapersErrMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="center">
                        <h4>{props.newspapersErrMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    //else returning the newspapers and magazines 
    else {
        return (
            <div className="hm">
                <div className="container" >
                    {/* To render the featured newspapers in a row */}
                    <div className="row row-content">
                        {newspapers}
                    </div>
                    {/* To Render the featured magazines in the next row */}
                    <div className="row row-content">
                        {magazines}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;