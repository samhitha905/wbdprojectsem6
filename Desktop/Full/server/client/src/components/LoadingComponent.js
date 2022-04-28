import React from 'react';

//Functional Component for displaying Loading Icon while data is fetching from server.
export const Loading = () => {
    return (
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <h4 style={{fontSize:"20px"}}>Loading . . .</h4>
        </div>
    );
};