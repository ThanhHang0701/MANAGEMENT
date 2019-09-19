import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Search} from '../index'
class Breadcrumb extends Component {
    render() {
        return (
            <div className="breadcome-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="breadcome-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <Search/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <ul className="breadcome-menu">
                                            <li><Link to="/">Trang Chủ</Link> <span className="bread-slash">/</span>
                                            </li>
                                            <li><span className="bread-blod">{this.props.pageName}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;
