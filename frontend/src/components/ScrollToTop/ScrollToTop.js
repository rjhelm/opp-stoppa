import React from 'react';
import withRouter from '../../services/withRouter';

export class ScrollToTop extends React.Component{
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location && window) {
            window.scrollTo(0, 0);
        }
    }
    render () {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);