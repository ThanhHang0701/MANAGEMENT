import React from 'react'
import ApiService from '../services/apiService'
import { authLogin, logout } from '../actions/index'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './error.css'
import { Link } from 'react-router-dom'
// var crypto = require('crypto-js')
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logout, authLogin},dispatch); 
}
class Login extends React.Component {
    displayName = 'Login Page'

    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            username: '',
            password: '',
            account: null,
            submit: false,
            isLogout: false,
            isRedirect: false,
            isLoading: false
        }
    }

    componentWillMount(){
        let ID = localStorage.getItem('ID')
        let Token = localStorage.getItem('Token')
        let RepositoryID = localStorage.getItem('RepositoryID')
        let Role = localStorage.getItem('Role')
        if(ID !== null && Token !== null && Role !== null && RepositoryID !== null){
            this.apiService.getUser(ID, Token).then((data)=>{
                this.setState({
                    isLogout: true,
                    account: data
                })
            }).catch((e) => {
                let error = 'Có lỗi sảy ra. vui lòng thử lại'
                if (e.status === 400) {
                    error = 'Tài khoản không tồn tại hoặc mật khẩu không đúng'
                }
                if (e.status === 401) {
                    error = 'Không có quyền truy cập'
                    this.setState({
                        isRedirect: true
                    })
                }
                this.setState({
                    error: error
                })
            })
        }
        else{
            
            this.setState({
                isLogout: true,
                isRedirect: true
            })
        }
    }

    emailLogin(e) {
        
        e.preventDefault()
        this.setState({
            submit: true,
            isLoading: true
        })
        if (!this.state.username) {
            this.setState({
                isLoading: false
            })
            return
        }
        if (!this.state.password) {
            this.setState({
                isLoading: false
            })
            return
        }
        let { history } = this.props;
        this.apiService.emailLogin(this.state.username, this.state.password).then((user) => {
            this.setState({
                isLoading: false
            })
            this.props.authLogin(user)
            // let access_token = crypto.AES.encrypt(user.access_token, 'HTEAM123').toString()
            localStorage.setItem('ID', user.ID )
            localStorage.setItem('Token', user.access_token )
            localStorage.setItem('Role', user.Role )
            localStorage.setItem('RepositoryID', user.RepositoryID)
            history.push({ pathname: '/' })
        }).catch((e) => {
            let error = 'Có lỗi xảy ra. vui lòng thử lại'
            if (e.status === 400) {
                error = 'Tài khoản không tồn tại hoặc mật khẩu không đúng'
            } 
            this.setState({
                error: error,
                isLoading: false
            })
        })
    }

    handleUsernameChange(event) {
        this.setState({
            error: '',
            username: event.target.value
        })
    }

    handlePwdChange(event) {
        this.setState({
            error: '',
            password: event.target.value
        })
    }

    handleLogout= (e)=> {
        e.preventDefault()
        this.props.logout()
        localStorage.removeItem('Token')
        localStorage.removeItem('ID')
        localStorage.removeItem('Role')
        localStorage.removeItem('RepositoryID')
        this.setState({
            isRedirect: true
        })
    }

    render() {
    if(this.state.isRedirect === true){
        return (
            <div className="error-pagewrap">
                <div className="error-page-int isLogin">
                    <div className="text-center m-b-md custom-login">
                        <h3>XIN MỜI ĐĂNG NHẬP</h3>
                    </div>
                    <div className="content-error">
                        <div className="hpanel">
                            <div className="panel-body">
                                <form onSubmit={this.emailLogin.bind(this)} id="loginForm">
                                    <div className="form-group">
                                        <label className="control-label" for="username">Tên Đăng Nhập</label>
                                        <input 
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleUsernameChange.bind(this)}
                                            placeholder="example@gmail.com"
                                            title="Please enter you username" 
                                            id="username"
                                            className="form-control"/>
                                            {
                                                (this.state.submit & !this.state.username || this.state.error) &&
                                                <div className="notify-box">
                                                    <p className="error">{this.state.error || 'Vui lòng nhập email của bạn'}</p>
                                                </div>
                                            }
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" for="password">Mật Khẩu</label>
                                        <input 
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.handlePwdChange.bind(this)}
                                            title="Please enter your password"
                                            placeholder="******"
                                            name="password"
                                            id="password"
                                            className="form-control"/>
                                            {
                                                this.state.submit && !this.state.password &&
                                                <div className="notify-box">
                                                    <p className="error">Vui lòng nhập mật khẩu của bạn</p>
                                                </div>
                                            }
                                    </div>
                                    <button className="btn btn-success btn-block loginbtn">
                                        {this.state.isLoading ? <><span className="loader"></span>Đăng Nhập</> : 'Đăng Nhập'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
    else{
            return(
                <>
                {this.state.isLogout ?
                    <div className="error-pagewrap">
                    <div className="error-page-int isLogin">
                        <div className="text-center m-b-md custom-login">
                            <h3 style={{ textAlign: "left", paddingLeft: 20}}>Xác Nhận</h3>
                        </div>
                        <div className="hpanel bodyhpanel">
                            <div className="panel-body">
                                    <div className="form-group">
                                        <p style={{fontWeight:"bold"}}>Bạn vừa đăng nhập vào tài khoản {this.state.account.FullName},
                                        hãy đăng xuất nếu muốn đăng nhập vào tài khoản khác.</p>
                                    </div>
                            </div>
                        </div>
                        <div className="btnExit">
                            <button type="button" className="btn btn-primary btnLogout" onClick= {this.handleLogout}>Thoát</button>
                            <button type="button" className="btn btn-default btnCancle"><Link to='/'>Hủy Bỏ</Link></button>
                        </div>
                    </div>   
                </div>
                :
                <div className="error-pagewrap">
                <div className="error-page-int isLogin">
                    <div className="text-center m-b-md custom-login">
                        <h3>XIN MỜI ĐĂNG NHẬP</h3>
                    </div>
                    <div className="content-error">
                        <div className="hpanel">
                            <div className="panel-body">
                                <form onSubmit={this.emailLogin.bind(this)} id="loginForm">
                                    <div className="form-group">
                                        <label className="control-label" for="username">Tên Đăng Nhập</label>
                                        <input 
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleUsernameChange.bind(this)}
                                            placeholder="example@gmail.com"
                                            title="Please enter you username" 
                                            id="username"
                                            className="form-control"/>
                                            {
                                                (this.state.submit & !this.state.username || this.state.error) &&
                                                <div className="notify-box">
                                                    <p className="error">{this.state.error || 'Vui lòng nhập email của bạn'}</p>
                                                </div>
                                            }
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" for="password">Mật Khẩu</label>
                                        <input 
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.handlePwdChange.bind(this)}
                                            title="Please enter your password"
                                            placeholder="******"
                                            name="password"
                                            id="password"
                                            className="form-control"/>
                                            {
                                                this.state.submit && !this.state.password &&
                                                <div className="notify-box">
                                                    <p className="error">Vui lòng nhập mật khẩu của bạn</p>
                                                </div>
                                            }
                                    </div>
                                    <button className="btn btn-success btn-block loginbtn">
                                    {this.state.isLoading ? <><span className="loader"></span>Đăng Nhập</> : 'Đăng Nhập'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
            }
            </>
        )
    }
  }
}
export default connect(undefined, mapDispatchToProps) (Login)
