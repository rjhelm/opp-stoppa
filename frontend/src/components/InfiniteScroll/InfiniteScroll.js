import React from 'react';
import { Waypoint } from 'react-waypoint';
import './InfiniteScroll.scss'

const InfiniteScroll = (props) => {
    return (
        <React.Fragment>
            {props.children}
            <Waypoint onEnter={props.bottomReachedCallback}>
                <div className="loader-container">
                    {/* <Loader active={props.showLoader} inline='centered' /> */}
                </div>
            </Waypoint>
        </React.Fragment>
    );
}

export default InfiniteScroll;