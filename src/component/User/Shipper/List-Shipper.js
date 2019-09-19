import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import ApiService from '../../../services/apiService';
import { connect } from 'react-redux'
import time from '../../../services/time.services'
import {withRouter} from 'react-router-dom';
import check from '../../../services/checkStatus.services'
const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class ShipperList extends Component {
    displayName = 'List Shipper'

    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            listUser: [],
            page: 1,
            totalpage: null,
            isToken: false,
            flag: false,
            notification: null,
            error: null,
            stt: 1
        }
    }

    componentDidMount(){
        const {match} = this.props;
        if(match && match.params){
            const page = match.params.page;
            this.setState({
                stt: page*10-9
            })
            this.apiService.getShippers(page, 10, this.props.user.RepositoryID, this.props.access_token).then((data)=>{
                this.setState({
                    listUser: data.Users,
                    page: data.Page,
                    totalpage: data.TotalPage
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
    }

    componentWillReceiveProps(nextProps){
        let page = nextProps.match.params.page;
        if (page !== this.props.match.params.page) {
            this.apiService.getShippers(page, 10, this.props.user.RepositoryID, this.props.access_token).then((data)=>{
                this.setState({
                    listUser: data.Users,
                    page: data.Page,
                    totalpage: data.TotalPage
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
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.flag !== prevState.flag){
            this.apiService.getShippers(this.state.page, 10, this.props.user.RepositoryID, this.props.access_token).then((data)=>{
                this.setState({
                    listUser: data.Users,
                    page: data.Page,
                    totalpage: data.TotalPage
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
    }

    handleDeleteUser(id){
        this.setState({
            flag: false,
            notification: null
        })
        this.apiService.deleteUser(id, this.props.access_token).then((data)=>{
        }).then(()=>{
            this.setState({
                notification: "Xóa thành công",
                flag: true
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
                flag: false
            })
        })
    }

    handlePreviousPage = () =>{
        this.setState({
            page: this.state.page - 1,
            stt: this.state.stt - 10
        })
    }

    handleNextPage = () =>{
        this.setState({
            page: this.state.page + 1,
            stt: this.state.stt - 10
        })
    }

    render() { 
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        let Role = localStorage.getItem('Role')
        if(Role !== "Admin"){
            return <Redirect to='/'/>
        }
        let style
        if(this.state.notification===null){
            style="none"
        }
        return (
            <div className="product-status mg-b-15">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="product-status-wrap drp-lst">
                                <h4>Danh Sách Nhân Viên Giao Hàng</h4>
                                <div className="add-product">
                                    <Link to='/NewShipper' style={{position: "absolute"}}>Thêm Mới</Link>
                                </div>
                                <div className="asset-inner">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Họ và Tên</th>
                                                <th>Giới Tính</th>
                                                <th>Ngày Sinh</th>
                                                <th>Email</th>
                                                <th>Số Điện Thoại</th>
                                                <th>Địa Chỉ</th>
                                                <th>Loại Nhân Viên</th>
                                                <th>Cài Đặt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listUser && this.state.listUser.map((item, i)=>(
                                            <tr>
                                                <td>{this.state.stt + i}</td>
                                                <td>{item.FullName}</td>
                                                <td>{item.Sex}</td>
                                                <td>{time.formatDayUTC(item.Birthday)}</td>
                                                <td>{item.Email}</td>
                                                <td>{item.Phone}</td>
                                                <td>{item.Address}</td>
                                                <td>{check.checkTypeShipper(item.Type)}</td>
                                                <td>
                                                    <Link to={`/EditShipper/${item.ID}`}><button data-toggle="tooltip" title="Edit" className="pd-setting-ed"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                                                    <button type="button" className="pd-setting-ed" data-toggle="modal" data-target={"#" + i}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                                    <div className="modal fade" id={i} role="dialog" aria-labelledby="myModalLabel">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title" id="myModalLabel">Xóa 1 Nhân Viên Giao Hàng</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                        Bạn chắc chứ?
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-default" data-dismiss="modal">Thoát</button>
                                                            <button type="button" className="btn btn-primary" onClick= {this.handleDeleteUser.bind(this, item.ID)} data-dismiss="modal">Đồng Ý </button>
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
                                <div className="custom-pagination">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            {+this.state.page > 1 ?
                                            <li className="page-item"><Link to={`/Shipper/${(+this.state.page - 1)}`}  onClick={this.handlePreviousPage}>← 10 Trước</Link></li>
                                            : null
                                            }
                                            {this.state.page < this.state.totalpage ?
                                            <li className="page-item"><Link to={`/Shipper/${(+this.state.page + 1)}`} onClick={this.handleNextPage}>Sau 10 →</Link></li>
                                            : null
                                            }
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-5" style={{display: style}}>
                                    {this.state.notification !== null ? <div className="alert alert-success" role="alert">{this.state.notification}</div>:<div className="alert alert-danger" role="alert">{this.state.error}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default withRouter(connect(mapStateToProps) (ShipperList));