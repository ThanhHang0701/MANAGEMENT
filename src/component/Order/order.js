import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import ApiService from '../../services/apiService';
import until from '../../services/until.curency'
import time from '../../services/time.services'
import check from '../../services/checkStatus.services'
import './order.css'
import MapContainer from '../Map/map'

var moment = require('moment');
const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

const ngay = moment().format('YYYY-MM-DD')
class Order extends Component {
    constructor(props) {
        super(props);
        this.apiService = ApiService();
        this.state = {
            dataRealMap: [],
            dataMap: [],
            addressRepository: '',
            status: true,
            shippers: [],
            shipperID: null,
            shipperFullName: null,
            date: ngay,
            listShipper: [],
            listOrder: [],
            CreatedAt: null,
            Products:[],
            Customer: null,
            ShipAddress: null, 
            ExpectedReceivedAt: null,
            TotalPrice: 0,
            isToken: false,
            isLoading: false,
            isLoading1: false
        }
    }
    
    componentDidMount(){
        this.setState({
            isLoading: true
        })
        this.apiService.getListShippers(this.props.user.RepositoryID, this.props.access_token).then((data)=>{
            this.setState({
                shippers: data
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

        this.apiService.getListShipperByOrder(this.props.user.RepositoryID, this.state.date, this.props.access_token).then((data)=>{
            this.setState({
                listShipper: data,
                isLoading: false
            })
        }).catch((e) => {
            let error = 'Có lỗi xảy ra. Vui lòng thử lại'
            if (e.status === 401) {
                error = 'Không có quyền truy cập.'
                this.setState({
                    isToken: true,
                    isLoading: false
                })
            }
            this.setState({
                error: error,
                isLoading: false
            })
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.date !== prevState.date || this.state.shipperID !== prevState.shipperID){
            this.setState({
                isLoading: true
            })
            this.apiService.getListShipperByOrder(this.props.user.RepositoryID, this.state.date, this.props.access_token).then((data)=>{
                this.setState({
                    listShipper: data
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
            
            this.apiService.getDetailListOrder(this.state.shipperID, this.state.date, this.props.access_token).then((data)=>{
                this.setState({
                    addressRepository: data.FirstLocation,
                    listOrder: data.Bills,
                    isLoading: false
                })
            }).catch((e) => {
                let error = 'Có lỗi xảy ra. Vui lòng thử lại'
                if (e.status === 401) {
                    error = 'Không có quyền truy cập.'
                    this.setState({
                        isToken: true,
                        isLoading: false
                    })
                }
                this.setState({
                    error: error,
                    isLoading: false
                })
            })
        }
    }

    handleDateChange = (event) =>{
        this.setState({
            listOrder: [],
            dataMap: [],
            dataRealMap: [],
            date: event.target.value
        })
    }

    handleShipperChange = (event) =>{
        this.setState({
            listOrder: [],
            dataMap: [],
            dataRealMap: [],
            shipperID: event.target.value
        })
    }

    handleOrder(item){
        this.setState({
            status: false,
            shipperID: item.ID,
            shipperFullName: item.FullName
        })
    }

    handlePreviousPage = () =>{
        this.setState({
            status: true
        })
    }

    handleOrderDetail(id){
        this.setState({
            isLoading1: true
        })
        this.apiService.getDetailOrder(id, this.props.access_token).then((data)=>{
            this.setState({
                CreatedAt: data.CreatedAt,
                Status: data.Status,
                Products:data.Products,
                Customer: data.Customer,
                ShipAddress: data.ShipAddress, 
                ExpectedReceivedAt: data.ExpectedReceivedAt,
                TotalPrice: data.TotalPrice,
                isLoading1: false
            })
        }).catch((e) => {
            let error = 'Có lỗi xảy ra. Vui lòng thử lại'
            if (e.status === 401) {
                error = 'Không có quyền truy cập.'
                this.setState({
                    isToken: true,
                    isLoading1: false
                })
            }
            this.setState({
                error: error,
                isLoading1: false
            })
        })
    }

    handleMapData = () =>{
        let data = []
        data.push(this.state.addressRepository)
        this.state.listOrder.map((item, i)=>(
            data.push(item.ShipAddress) 
        ))
        this.setState({
            dataMap: data
        })
    }

    handleMapRealData = () =>{
        this.apiService.getMap(this.state.shipperID, this.state.date, this.props.access_token).then((data)=>{
            this.setState({
                dataRealMap: data
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
        if(Role !== "Storekeeper"){
            return <Redirect to='/'/>
        }
        return (
            <div className="product-status mg-b-15">
                <div className="container-fluid">
                    <div className="row">
                    {this.state.status ? 
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-status-wrap drp-lst">
                        <h4>DANH SÁCH NHÂN VIÊN GIAO HÀNG TRONG NGÀY </h4>
                        <div className="option-choose">
                            <div className="form-group chooseProduct">
                                <label htmlFor="exampleInputCategory2">Ngày Giao Hàng</label>
                                <input
                                    style={{borderRadius: 4, height: 32}}
                                    name="birthday"
                                    type="date"
                                    className="form-control"
                                    placeholder="Ngày Giao Hàng"
                                    onChange={this.handleDateChange}
                                    value={time.formatDayUTC(this.state.date)}/>
                            </div>
                        </div>
                        
                        {this.state.isLoading ?  <div className="loading"></div>
                        :
                        <div className="asset-inner">
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ Tên Nhân Viên</th>
                                        <th>Số Lượng đơn hàng</th>
                                        <th>Loại Nhân Viên</th>
                                        <th>Tổng Thời Gian</th>
                                        <th>Tổng Quãng Đường</th>
                                        <th>Ngày Giao Hàng</th>
                                        <th>Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state && this.state.listShipper.map((item, i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{item.FullName}</td>
                                        <td>{item.TotalBills}</td>
                                        <td>{check.checkTypeShipper(item.Type)}</td>
                                        <td>{item.TotalDurations} s</td>
                                        <td>{item.TotalDistances} m</td>
                                        <td>{time.formatDayUTC(this.state.date)}</td>
                                        <td>
                                        <button type="button" title="Xem Chi Tiết" className="btn btn-default" onClick = {this.handleOrder.bind(this, item)}><i className="fa fa-eye" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        }
                        </div>
                    </div>
                    :
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-status-wrap drp-lst">
                        <h4>DANH SÁCH HÓA ĐƠN</h4>
                        <div className="option-choose">
                            <div className="form-group chooseCategory">
                                <label htmlFor="exampleInputCategory">Nhân Viên Giao Hàng</label>
                                <select 
                                    className="form-control option" 
                                    id="exampleInputCategory" 
                                    value={this.state.shipperID}
                                    onChange={this.handleShipperChange}
                                    defaultValue={{label: this.state.shipperFullName, value: this.state.shipperID}}>
                                    {this.state.shippers && this.state.shippers.map((item, i)=>
                                    <option defaultValue={{label: this.state.shipperFullName, value: this.state.ID}} key={i} value={item.ID} >{item.FullName}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group chooseProduct">
                                <label htmlFor="exampleInputCategory2">Ngày Giao Hàng</label>
                                <input
                                    style={{borderRadius: 4, height: 32}}
                                    name="birthday"
                                    type="date"
                                    className="form-control"
                                    placeholder="Ngày Giao Hàng"
                                    onChange={this.handleDateChange}
                                    value={this.state.date}/>
                            </div>
                            <div className="form-group chooseMap">
                                <button type="button" className="btn btn-primary centerbutton" data-toggle="modal" data-target={"#Real"+this.state.shipperID} onClick={this.handleMapRealData}>
                                <img style={{maxWidth: '12%'}} className="icon" src="https://www.upsieutoc.com/images/2019/07/07/icons8-treasure-map-64.png" alt=""/>
                                LỘ TRÌNH THỰC TẾ</button>
                                <div className="modal fade" id={"Real" + this.state.shipperID} role="dialog" aria-labelledby="myModalLabel">
                                    <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="myModalLabel">LỘ TRÌNH DI CHUYỂN</h4>
                                        </div>
                                        <div className="modal-body" style={{height: 400, position: "none", padding: 0}}>
                                            {this.state.dataRealMap.length <= 1 ? 
                                            <div className="no-map">KHÔNG CÓ LỘ TRÌNH SẴN</div>
                                            :<MapContainer center={{ lat: 10.7553411, lng: 106.4150307 }} zoom={15} data={this.state.dataRealMap}/>}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleExit}>Thoát</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group chooseMap">
                                <button type="button" className="btn btn-primary centerbutton" data-toggle="modal" data-target={"#"+this.state.shipperID} onClick={this.handleMapData}>
                                <img style={{maxWidth: '12%'}} className="icon" src="https://www.upsieutoc.com/images/2019/07/07/icons8-treasure-map-64.png" alt=""/>
                                LỘ TRÌNH ĐIỀU PHỐI</button>
                                <div className="modal fade" id={this.state.shipperID} role="dialog" aria-labelledby="myModalLabel">
                                    <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="myModalLabel">LỘ TRÌNH DI CHUYỂN</h4>
                                        </div>
                                        <div className="modal-body" style={{height: 400, position: "none", padding: 0}}>
                                            {this.state.dataMap.length <= 1 ? 
                                            <div className="no-map">KHÔNG CÓ LỘ TRÌNH SẴN</div>
                                            :<MapContainer center={{ lat: 10.7553411, lng: 106.4150307 }} zoom={15} data={this.state.dataMap}/>}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleExit}>Thoát</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.isLoading ? <div className="loading"></div>
                        :
                        <div className="asset-inner">
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>DS Sản Phẩm</th>
                                        <th>Tổng Tiền</th>
                                        <th>Ngày Đặt Hàng</th>
                                        <th>Thời Gian Dự Kiến</th>
                                        <th>Trạng Thái</th>
                                        <th>Địa Chỉ Giao</th>
                                        <th>Hình Thức Giao Hàng</th>
                                        <th>Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state && this.state.listOrder.map((item, i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{item.Products}
                                        </td>
                                        <td>{until.showVNDCurrency(item.TotalPrice)}</td>
                                        <td>{time.formatDayUTC(item.CreatedAt)}</td>
                                        <td>{time.formatHourUTC(item.ExpectedReceivedAt)}</td>
                                        <td style={check.checkStyle(item.Status)}>{check.checkStatus(item.Status)}</td>
                                        <td>{item.ShipAddress}</td>
                                        <td style={check.checkStyleDeliveryMethod(item.DeliveryMethod)}>{check.checkDeliveryMethod(item.DeliveryMethod)}</td>
                                        <td>
                                            <button type="button" title="Xem Chi Tiết" className="pd-setting-ed" data-toggle="modal" data-target={"#"+item.ID} onClick={this.handleOrderDetail.bind(this, item.ID)}><i className="fa fa-eye" aria-hidden="true"></i></button>
                                            <div className="modal fade" id={item.ID} role="dialog" aria-labelledby="myModalLabel">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title" id="myModalLabel">Chi Tiết Hóa Đơn</h4>
                                                        </div>
                                                        {this.state.isLoading1 ? <div className="loading1"></div>
                                                        :
                                                        <div className="modal-body">
                                                            <h5>Hóa Đơn: <span style={{color: 'green'}}>{i+1}</span></h5>
                                                            <h5>Ngày tạo: <span>{time.formatDayUTC(this.state.CreatedAt)}</span></h5>
                                                            <div>
                                                                <h5>Danh sách sản phẩm</h5>
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>STT</th>
                                                                            <th>Tên Sản Phẩm</th>
                                                                            <th>Giá</th>
                                                                            <th>Số lượng</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.Products.map((item, i)=>(
                                                                        <tr key={i}>
                                                                            <td>{i+1}</td>
                                                                            <td>{item.Product}</td>
                                                                            <td>{until.showVNDCurrency(item.Price)}</td>
                                                                            <td>{item.Quantity} Sản Phẩm</td>
                                                                        </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <h5>Địa Chỉ Giao Hàng: <span>{this.state.ShipAddress}</span></h5>
                                                            <h5>Tên Khách Hàng: <span>{this.state.Customer}</span></h5>
                                                            <h5>Tổng Tiền: <span>{until.showVNDCurrency(this.state.TotalPrice)}</span></h5>
                                                        </div>
                                                        }
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleExit}>Thoát</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        }
                        <div className="custom-pagination">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><Link onClick={this.handlePreviousPage}>← Xem Danh Sách Nhân Viên</Link></li>
                                </ul>
                            </nav>
                        </div>
                        </div>
                    </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps) (Order);
