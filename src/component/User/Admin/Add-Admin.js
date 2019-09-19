import React, { Component } from "react";
import ApiService from '../../../services/apiService';
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    access_token: state.access_token
  }
}

class AddAdmin extends Component {
  displayName = "Add new admin";

  constructor(props) {
    super(props);
    this.apiService = ApiService();
    this.state = {
      idRepository: '',
      Repository: [],
      firstName: "",
      lastName: "",
      sex: '',
      birthday: "",
      phone: null,
      email: "",
      address: "",
      role: 1,
      status: 1,
      image: null,
      submit: false,
      notification: null,
      isLoading: false,
      error: null
    };
  }

  componentDidMount(){
    this.apiService.getListRepository(this.props.access_token).then((data)=>{
      this.setState({
        Repository: data,
        idRepository: data[0].ID
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

  newUser = (e) => {
    e.preventDefault();
    this.setState({
      submit: true,
      notification: null,
      isLoading: true
    });

    if (!this.state.firstName) {
      this.setState({
        isLoading: false
      })
      return;
    }
    if (!this.state.lastName) {
      this.setState({
        isLoading: false
      })
      return;
    }
    if (!this.state.sex) {
      this.setState({
        isLoading: false
      })
      return;
    }
    if (!this.state.birthday) {
      this.setState({
        isLoading: false
      })
      return;
    }
    if (!this.state.phone) {
      this.setState({
        isLoading: false
      })
      return;
    }
    if (!this.state.address) {
      this.setState({
        isLoading: false
      })
      return;
    }
    if (!this.state.email) {
      this.setState({
        isLoading: false
      })
      return;
    }
    if(!this.state.idRepository){
      this.setState({
        isLoading: false
      })
      return;
    }
    this.apiService.postUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        sex: this.state.sex,
        birthday: this.state.birthday,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
        role: this.state.role,
        image: this.state.image,
        status: this.state.status,
        repositoryID: this.state.idRepository
        },
        this.props.access_token
      ).then(()=>{
        this.setState({
          notification: "Thêm mới thành công",
          isLoading: false,
          idRepository: '',
          firstName: "",
          lastName: "",
          sex: '',
          birthday: "",
          phone: '',
          email: "",
          address: "",
          role: 1,
          status: 1,
          image: null,
          submit: false
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
            isLoading: false,
            idRepository: '',
            firstName: "",
            lastName: "",
            sex: '',
            birthday: "",
            phone: '',
            email: "",
            address: "",
            role: 1,
            status: 1,
            image: null,
            submit: false
        })
    })
      
  }

  handleFirstNameChange = (event) => {
    this.setState({
      error: "",
      firstName: event.target.value
    });
  }

  chooseRepository = (event) =>{
    this.setState({
      idRepository: event.target.value
    })
  }

  handleLastNameChange = (event) => {
    this.setState({
      error: "",
      lastName: event.target.value
    });
  }

  handleSexChange = (value) => {
    this.setState({
      error: "",
      sex: value
    });
  }
  handleBirthdayChange = (event) => {
    this.setState({
      error: "",
      birthday: event.target.value
    });
  }
  handlePhoneChange = (event) => {
    this.setState({
      error: "",
      phone: event.target.value
    });
  }
  handleEmailChange = (event) => {
    this.setState({
      error: "",
      email: event.target.value
    });
  }
  handleAddressChange = (event) => {
    this.setState({
      error: "",
      address: event.target.value
    });
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
                  <li className="active">
                    <a href="#description">Thêm mới Admin</a>
                  </li>
                </ul>
                <div
                  id="myTabContent"
                  className="tab-content custom-product-edit"
                >
                  <div
                    className="product-tab-list tab-pane fade active in"
                    id="description"
                  >
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="review-content-section">
                          <form
                            onSubmit={this.newUser}
                            id="add-storekeepers"
                            action="#"
                            className="add-storekeepers"
                          >
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                  <input
                                    name="FirstName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Họ và tên đệm"
                                    onChange={this.handleFirstNameChange}
                                    value={this.state.firstName}
                                  />
                                  {(this.state.submit & !this.state.firstName ||
                                    this.state.error) && (
                                    <div className="notify-box">
                                      <p className="error">
                                        {this.state.error ||
                                          "Vui lòng nhập họ và tên đệm của bạn"}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="form-group">
                                  <input
                                    name="LastName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên"
                                    onChange={this.handleLastNameChange}
                                    value={this.state.lastName}
                                  />
                                  {(this.state.submit & !this.state.lastName ||
                                    this.state.error) && (
                                    <div className="notify-box">
                                      <p className="error">
                                        {this.state.error ||
                                          "Vui lòng nhập tên của bạn"}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="form-group">
                                  <input
                                    name="birthday"
                                    type="date"
                                    className="form-control"
                                    placeholder="Ngày sinh"
                                    onChange={this.handleBirthdayChange}
                                    value={this.state.birthday}
                                  />
                                  {(this.state.submit & !this.state.birthday ||
                                    this.state.error) && (
                                    <div className="notify-box">
                                      <p className="error">
                                        {this.state.error ||
                                          "Vui lòng chọn ngày sinh của bạn"}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="form-group">
                                  <RadioGroup
                                    onChange={this.handleSexChange}
                                    horizontal
                                    value={this.state.sex}
                                  >
                                    <RadioButton value="Nam">Nam</RadioButton>
                                    <RadioButton value="Nữ">Nữ</RadioButton>
                                  </RadioGroup>
                                </div>
                                <div
                                  classname="form-group"
                                  style={{ display: "none" }}
                                >
                                  <input
                                    name="type"
                                    type="number"
                                    className="form-control"
                                    value={this.state.type}
                                  />
                                </div>
                                <div
                                  classname="form-group"
                                  style={{ display: "none" }}
                                >
                                  <input
                                    name="status"
                                    type="number"
                                    className="form-control"
                                    value={this.state.status}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                  <input
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    placeholder="Địa chỉ"
                                    onChange={this.handleAddressChange}
                                    value={this.state.address}
                                  />
                                  {(this.state.submit & !this.state.address ||
                                    this.state.error) && (
                                    <div className="notify-box">
                                      <p className="error">
                                        {this.state.error ||
                                          "Vui lòng nhập địa chỉ của bạn"}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="form-group">
                                  <input
                                    name="phone"
                                    type="text"
                                    className="form-control"
                                    placeholder="Số điện thoại"
                                    onChange={this.handlePhoneChange}
                                    value={this.state.phone}
                                  />
                                  {(this.state.submit & !this.state.phone ||
                                    this.state.error) && (
                                    <div className="notify-box">
                                      <p className="error">
                                        {this.state.error ||
                                          "Vui lòng nhập SDT của bạn"}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="form-group">
                                  <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={this.handleEmailChange}
                                    value={this.state.email}
                                  />
                                  {(this.state.submit & !this.state.email ||
                                    this.state.error) && (
                                    <div className="notify-box">
                                      <p className="error">
                                        {this.state.error ||
                                          "Vui lòng nhập email của bạn"}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="form-group">
                                  <select style={{height: 52}} className="form-control option" id="exampleSelect1" onChange={this.chooseRepository}>
                                  {this.state.Repository && this.state.Repository.map((item, i)=>
                                      <option key={i} value={item.ID} >{item.Name}</option>
                                  )}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                  <div className="payment-adress"> 
                                    <div className="col-xs-6 col-md-1">
                                      <button type="submit" className="btn btn-primary waves-effect waves-light" >
                                      {this.state.isLoading ? <><span style={{width: '80%', height: '90%'}} className="loader"></span>Lưu</> : 'Lưu'}
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
    );
  }
}
export default connect(mapStateToProps) (AddAdmin);