import React, { Component } from 'react'
import ApiService from '../../../services/apiService';
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import time from '../../../services/time.services'
const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class EditAdmin extends Component {
    displayName = 'Edit Admin'

    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            id: null, 
            idRepository: null,
            firstName: '',
            lastName: '',
            sex: '',
            birthday:null,
            phone: '',
            email: '', 
            address: '',
            image: null,
            isSubmit: false,
            isToken: false,
            notification: null,
            error: null,
            isLoading: false
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
    }

    getIDFromURL(url)
    {
        let temp = url.split("/");
        let lenOfTemp = temp.length;
        let id = temp[lenOfTemp - 1];
        return id;
    }

    componentDidMount(){
        let url = window.location.href;
        let id = this.getIDFromURL(url);
        this.apiService.getUser(id, this.props.access_token).then((data)=>{
            this.setState({
                id: data.ID,
                firstName: data.FirstName,
                lastName: data.LastName,
                sex:data.Sex,
                birthday:data.Birthday,
                phone: data.Phone,
                email: data.Email, 
                address: data.Address,
                idRepository: data.RepositoryID
            })
        }).catch((e) => {
            let error = 'Có lỗi xảy ra. vui lòng thử lại'
            if (e.status === 401) {
                error = 'Không có quyền truy cập'
                this.setState({
                    isToken: true
                })
            }
            this.setState({
                error: error
            })
        }) 
    }
    editUser(e) {
        this.setState({
            notification: null,
            isLoading: true,
            error: null,
            isSubmit: true
        })
        e.preventDefault()
        let url = window.location.href;
        let id = this.getIDFromURL(url);
        this.apiService.putUser(id, {
            id: id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            sex: this.state.sex,
            birthday: this.state.birthday,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            role: 1 
            }, 
            this.props.access_token
         ).then(() => {
            this.setState({
                notification: "Cập nhật thành công",
                isLoading: false
            })
        }).catch((e) => {
            let error = 'Có lỗi xảy ra. vui lòng thử lại'
            if (e.status === 401) {
                error = 'Không có quyền truy cập'
                this.setState({
                    isToken: true
                })
            }
            this.setState({
                error: error,
                isLoading: false
            })
        })
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value
        })
    }
    
    handleSexChange(value) {
        this.setState({
          sex: value
        })
    }

    handleBirthdayChange(event) {
        this.setState({
            birthday: event.target.value
        })
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.target.value
        })
    }

    handleAddressChange(event) {
        this.setState({
            address: event.target.value
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
        let style
        if(this.state.notification === null){
        style="none"
        }
        return (
            <div className="single-pro-review-area mt-t-30 mg-b-15">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="product-payment-inner-st">
                                    <ul id="myTabedu1" className="tab-review-design">
                                        <li className="active"><a href="#description">Chỉnh Sửa Admin</a></li>
                                    </ul>
                                    <div id="myTabContent" className="tab-content custom-product-edit">
                                        <div className="product-tab-list tab-pane fade active in" id="description">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="review-content-section">
                                                        <form onSubmit = {this.editUser.bind(this)}>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="devit-card-custom">
                                                                    <div className="form-group">
                                                                    <input 
                                                                        name="FirstName" 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        onChange={this.handleFirstNameChange}
                                                                        value = {this.state.firstName}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input 
                                                                        name="LastName" 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        onChange={this.handleLastNameChange}
                                                                        value={this.state.lastName}/>
                                                                </div>
                                                                <div className="form-group">
                                                                <RadioGroup
                                                                    onChange={this.handleSexChange}
                                                                    horizontal
                                                                    value={this.state.sex}>
                                                                    <RadioButton value="Nam">Nam</RadioButton>
                                                                    <RadioButton value="Nữ">Nữ</RadioButton>
                                                                </RadioGroup>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input 
                                                                        name="birthday" 
                                                                        type="date" 
                                                                        className="form-control"
                                                                        onChange={this.handleBirthdayChange}
                                                                        value = {time.formatDayUTC(this.state.birthday)}/>
                                                                </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="devit-card-custom">
                                                                    <div className="form-group">
                                                                    <input
                                                                        name="address" 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        onChange={this.handleAddressChange}
                                                                        value={this.state.address}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input 
                                                                        name="phone" 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        onChange={this.handlePhoneChange}
                                                                        value={this.state.phone}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input 
                                                                        name="email" 
                                                                        type="email" 
                                                                        className="form-control" 
                                                                        disabled
                                                                        value={this.state.email}/>
                                                                </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="payment-adress"> 
                                                                        <div className="col-xs-6 col-md-1">
                                                                            <button type="submit" className="btn btn-primary waves-effect waves-light" >
                                                                            {this.state.isLoading ? <><span style={{width: '80%', height: '90%'}} className="loader"></span>Cập Nhật</> : 'Cập Nhật'}
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-xs-12 col-sm-6 col-md-5" style={{display: style}}>
                                                                            {this.state.notification !== null ? <div className="alert alert-success" role="alert">{this.state.notification}</div>:<div className="alert alert-danger" role="alert">{this.state.error}</div>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default  connect(mapStateToProps) (EditAdmin)