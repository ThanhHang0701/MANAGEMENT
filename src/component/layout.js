import React from 'react'
import { Header, Footer, NavMenu  } from '../component/index'
import PropTypes from 'prop-types'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class extends React.Component {
    displayName = 'Layout Component'

    static propTypes = {
        pageName: PropTypes.string,
        children: PropTypes.any.isRequired,
    }

    render() {
        return (
            <>
                <NavMenu/>
                <div className="all-content-wrapper">
                    <Header pageName={this.props.pageName}/>
                    <div className="analytics-sparkle-area">
                        {/* <ReactCSSTransitionGroup> */}
                            {this.props.children}
                        {/* </ReactCSSTransitionGroup> */}
                    </div>
                    <Footer/>
                </div>
            </>
        )
    }
}
