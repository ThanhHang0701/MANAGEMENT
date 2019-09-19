import React, { Component } from 'react';
import ApiService from '../../services/apiService'
import { connect } from 'react-redux'
import Categories from './Categories'
import { Redirect } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class ListCategory extends Component {
    displayName = "Add Category";

    constructor(props) {
        super(props);
        this.apiService = ApiService();
        this.state = {
            categories: [],
            isToken: false
        };   
    }

    componentDidMount(){
        this.apiService.getCategory(this.props.access_token).then((data)=>{
            this.setState({
                categories: data
            })
        }).catch((e) => {
            let error = 'Có lỗi xảy ra. Vui lòng thử lại'
            if (e.status === 401) {
                error = 'Không có quyền truy cập.'
                this.setState({
                    isToken: true
                })
            }
            this.setState({
                error: error
            })
        })
    }

    render() {
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        let Role = localStorage.getItem('Role')
        if(Role !== "Boss"){
            return <Redirect to='/'/>
        }
        let categories = this.state.categories;
        let categoriesList = categories && categories.length > 0 ? 
            (<Categories categories={categories}></Categories>)
            :
            '';
		
        return (
            <div className="product-status mg-b-15">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ul>
                            {categoriesList}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default connect(mapStateToProps) (ListCategory);

