import React, { Component } from 'react';
import { connect } from 'react-redux'
import ApiService from '../../services/apiService'
import { Redirect } from 'react-router'

const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class AddRepository extends Component {
    displayName = "Add Repository";

    constructor(props) {
        super(props);
        this.apiService = ApiService();
        this.state = {
            name: '',
            street: '',
            town:'',
            district: '',
            province:'',
            listTown:[],
            listAddress: [],
            isSubmit: false,
            isToken: false,
            isLoading: false,
            notification: null,
            error: null
        }
        
    }

    componentDidMount(){
        this.apiService.getListAddress(this.props.access_token).then((data)=>{
            this.setState({
                listAddress: data
            })
        }).catch((e) => {
            let error = 'Có lỗi sảy ra. vui lòng thử lại'
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

    newRepository(e){
        e.preventDefault()
        this.setState({
            isSubmit: true,
            notification: null, 
            isLoading: true,
            error: null
        })
        if (!this.state.name) {
            this.setState({
                isLoading: false
            })
            return;
        }
        if (!this.state.street) {
            this.setState({
                isLoading: false
            })
            return;
        }
        if (!this.state.town) {
            this.setState({
                isLoading: false
            })
            return;
        }
        this.apiService.postRepository({
            Name: this.state.name,
            Address: {
                CustomAddress: this.state.street,
                TownID: this.state.town,
                }
            }, 
            this.props.access_token
         ).then(() => {
            this.setState({
                notification: "Thêm mới thành công",
                isLoading: false
            })
        }).catch((e) => {
            let error = 'Có lỗi sảy ra. vui lòng thử lại'
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

    getTownsOfDistrict = (districtID) => {
        let districts = this.state.listAddress[0].Districts
        let districtFilter = districts.filter((district) => {
            return district.ID === districtID;
        })
        return districtFilter[0].Towns;
    }

    getDistrictById = (districtID) => {
        let districts = this.state.listAddress[0].Districts
        let districtFilter = districts.filter((district) => {
            return district.ID === districtID;
        })
        return districtFilter[0];
    }
    
    getTownById = (townId) => {
        let towns = this.state.district.Towns;
        let townFilter = towns.filter((town) => {
            return town.ID === townId;
        })
        return townFilter[0];
    }
    
    handleDistrictChange= (event)=>{
        const selectedDistrictID = event.target.value;
        const selectedDistrict = this.getDistrictById(selectedDistrictID);
        let towns = this.getTownsOfDistrict(selectedDistrictID);
        this.setState({
            district: selectedDistrict,
            town: towns[0],
        });
    }
    handleProvincetChange= (event)=>{
        this.setState({
            province: event.target.value
        })
    }
    handleNameChange= (event)=>{
        this.setState({
            error: "",
            name: event.target.value
        })
    }
    handleStreetChange= (event)=>{
        this.setState({
            error: "",
            street: event.target.value
        })
    }
    handleTownChange = (event)=>{
        const selectedTownID = event.target.value;
        const selectedTown = this.getTownById(selectedTownID);
        this.setState({
            town: selectedTown.ID
        });
    }

    render() {
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        if(this.props.user.Role !== "Boss"){
            return <Redirect to='/'/>
        }
        let selectedDistrict = this.state.district;
        let towns = <option />;
        if (selectedDistrict && selectedDistrict.Towns.length > 0) {
            towns = selectedDistrict.Towns.map((town, i) => (
              <option key={i} value={town.ID}>
                {town.Name}
              </option>
            ));
          }
        let style
        if(this.state.notification===null){
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
                                        <a href="#description">Thêm Mới Kho</a>
                                    </li>
                                </ul>
                                <div id="myTabContent" className="tab-content custom-product-edit">
                                    <div className="product-tab-list tab-pane fade active in"  id="description" >
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="review-content-section">
                                                    <form onSubmit={this.newRepository.bind(this)}>
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <div className="form-group">
                                                                    <label for="exampleInputNameRepository">Tên Kho</label>
                                                                    <input 
                                                                        type="text" 
                                                                        class="form-control" 
                                                                        id="exampleInputNameRepository" 
                                                                        onChange={this.handleNameChange}
                                                                        value={this.state.name}
                                                                    />
                                                                    {(this.state.isSubmit & !this.state.name ||
                                                                        this.state.error) && (
                                                                        <div className="notify-box">
                                                                            <p className="error">
                                                                                {this.state.error ||
                                                                                "Vui lòng tên của kho"}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label for="exampleInputStreet">Số nhà - Tên đường</label>
                                                                    <input
                                                                        id="exampleInputStreet"
                                                                        name="address"
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Vd: 225 Nguyễn Văn Cừ"
                                                                        onChange={this.handleStreetChange}
                                                                        value={this.state.street}
                                                                    />
                                                                    {(this.state.isSubmit & !this.state.street ||
                                                                        this.state.error) && (
                                                                        <div className="notify-box">
                                                                            <p className="error">
                                                                                {this.state.error ||
                                                                                "Vui lòng nhập sô nhà - tên đường của kho"}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {this.state.listAddress && this.state.listAddress.map((item, i)=>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <div className="form-group">
                                                                    <label for="exampleInputCity">Thành Phố</label>
                                                                    <input
                                                                        id="exampleInputCity"
                                                                        name="city"
                                                                        type="text"
                                                                        className="form-control"
                                                                        disabled
                                                                        onChange={this.handleProvincetChange}
                                                                        value={item.Name}
                                                                    />
                                                                </div>
                                                                <div class="form-group" style={{float: "left"}}>
                                                                    <label for="exampleInputDistrict">Quận</label>
                                                                        <select class="form-control option" id="exampleInputDistrict" onChange={this.handleDistrictChange} style={{height:40}}>
                                                                            {item.Districts && item.Districts.map((temp, i)=>
                                                                                <option value={temp.ID}>{temp.Name}</option>
                                                                            )}
                                                                        </select>
                                                                </div>
                                                                <div class="form-group" style={{float: "left", paddingLeft:20, width:162}}>
                                                                    <label for="exampleInputTown">Phường</label>
                                                                    <select class="form-control option" id="exampleInputTown" onChange={this.handleTownChange} style={{height:40}}>
                                                                        {towns}
                                                                    </select>
                                                                </div>
                                                            </div> 
                                                            )}
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

export default connect(mapStateToProps) (AddRepository);
