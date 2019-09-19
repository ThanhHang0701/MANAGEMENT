import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Search extends Component {
    render() {
        return (
            <div className="breadcome-heading">
                <form role="search" className="sr-input-func" style={{display: "none"}}>
                    <input type="text" placeholder="Search..." className="search-int form-control"/>
                    <Link href="#"><i className="fa fa-search"></i></Link>
                </form>
            </div>
        );
    }
}

export default Search;
