import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ApiService from '../../services/apiService';
import time from '../../services/time.services'

const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class Account extends Component {
    constructor(props) {
        super(props);
        this.apiService = ApiService();
        this.state = {
            Account:'',
            isToken: false,
            pass: null,
            error: null,
            isSubmit: false,
            notification: null
        }
    }
    
    componentDidMount(){
        this.apiService.getUser(this.props.user.ID, this.props.access_token).then((data)=>{
            this.setState({
                Account: data
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

    handleChange = (e)=>{
        this.setState({
            pass: e.target.value
        })
    }

    handleSubmitPass = (e) =>{
        this.setState({
            isSubmit: true
        })
        if(this.state.pass !== null && this.state.pass !== ''){
            this.apiService.putChangePass({UserID: this.props.user.ID, Password: this.state.pass}, this.props.access_token).then(()=>{
                this.setState({
                    notification: 'Thay đổi mật khẩu thành công'
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
                })
            })
        }
        else{
            let error = 'Vui lòng nhập mật khẩu mới khác rỗng và kĩ tự trắng'
            this.setState({
                error: error
            })
        }
    }
    
    render() {
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        let style;
        if(this.state.isSubmit || this.state.error){
            style="modal"
        }
        else{
            style=""
        }
        return (
            <div className="single-pro-review-area mt-t-30 mg-b-15">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-payment-inner-st">
                            <h4>THÔNG TIN TÀI KHOẢN</h4>
                            <div id="myTabContent" className="tab-content custom-product-edit" >
                                <div className="product-tab-list tab-pane fade active in" id="description" >
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="review-content-section">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="form-group">
                                                                <label>Họ và Tên</label>
                                                                <input
                                                                    name="FullName"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="FullName"
                                                                    value={this.state.Account.FullName}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Ngày Sinh</label>
                                                                <input
                                                                    name="Birthday"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Birthday"
                                                                    value={time.formatDayUTC(this.state.Account.Birthday)}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="form-group" >
                                                                <label>Giới Tính</label>
                                                                <input
                                                                    name="Sex"
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={this.state.Account.Sex}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Số Điện Thoại</label>
                                                                <input
                                                                    name="Phone"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Phone"
                                                                    value={this.state.Account.Phone}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="form-group" >
                                                                <label>Nhân Viên Kho</label>
                                                                <input
                                                                    name="RepositoryName"
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={this.state.Account.RepositoryName}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Địa Chỉ</label>
                                                                <input
                                                                    name="Address"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Address"
                                                                    value={this.state.Account.Address}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Email</label>
                                                                <input
                                                                    name="email"
                                                                    type="email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    value={this.state.Account.Email}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="form-group" style={{marginTop: 40}}>
                                                                <button type="button" className="pd-setting-ed" data-toggle="modal" data-target="#pass"><i className="fa fa-pencil-square-o" aria-hidden="true">Thay Đổi Mật Khẩu</i></button>
                                                                <div className="modal fade" id="pass" role="dialog" aria-labelledby="myModalLabel">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h4 className="modal-title" id="myModalLabel">Nhập Mật Khẩu Mới</h4>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <input onChange={this.handleChange} className="form-control" type="password" />
                                                                                {
                                                                                    (this.state.isSubmit  || this.state.error) &&
                                                                                    <div className="notify-box">
                                                                                        <p className="error">{this.state.error || 'Vui lòng nhập mật khẩu của bạn'}</p>
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-default" data-dismiss="modal">Thoát</button>
                                                                                <button type="button" className="btn btn-primary" onClick= {this.handleSubmitPass} data-dismiss={style} >Đồng Ý </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {this.state.notification !== null ? <div class="alert alert-success" role="alert">{this.state.notification}</div>: null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                {this.state.error!==null ? <div class="alert alert-success" role="alert">{this.state.error}</div>: null}
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

export default connect(mapStateToProps) (Account);
