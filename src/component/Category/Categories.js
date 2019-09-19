import React, {Component} from 'react';
import Category from './Category'
import './Category.css'

export default class Categories extends Component{
    constructor(props) {
        super(props)
        this.state = {
            categories: this.props.categories
        }
    }

    render() {
        let {categories} = this.state;
        var children = [];
        if (categories) {
            categories.forEach((node, index) => {
                children.push(
                <Category 
                    key={index}
                    category={node}
                    level={1}
                    visible={true}
                />);
            });
        }

        return (
            <div id='categories' className='categories' style={{background: "white"}}>
                <h4 style={{paddingTop:20, marginLeft: 20}}>DANH MỤC</h4>
                <ul className='list-group'>
                    {children}
                </ul>
            </div>
        );
    }
};


