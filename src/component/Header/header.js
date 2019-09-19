import React, { Component } from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout, authLogin } from '../../actions/index'
import ApiService from '../../services/apiService'
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logout, authLogin},dispatch); 
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        accessToken: state.accessToken
    }
}

class Header extends Component {
    displayName = 'Header Component'

    static propTypes = {
        dispatch: PropTypes.func,
        pageName: PropTypes.string,
    }

    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
          User: '',
          isLogout: false,
          isToken: false
        }
    }

    async getToken(callback) {
        try {
          let Token = await localStorage.getItem('Token')
          callback(Token)
        } catch (err) {
          console.log(`The error is: ${err}`)
        }
    }

    componentWillMount(){
        this.setState({
            isToken: false
        })
        let ID = localStorage.getItem('ID')
        let Token = localStorage.getItem('Token')
        let RepositoryID = localStorage.getItem('RepositoryID')
        let Role = localStorage.getItem('Role')
        if(ID !== null && Token !== null && Role !== null && RepositoryID !== null){
            this.apiService.getUser(ID, Token).then((data)=>{
                this.props.authLogin(data)
                this.setState({
                    User: data
                })
            }).catch((e) => {
                let error = 'Có lỗi sảy ra. vui lòng thử lại'
                if (e.status === 401) {
                    error = 'Không có quyền truy cập'
                    this.props.logout()
                    localStorage.removeItem('Token')
                    localStorage.removeItem('ID')
                    localStorage.removeItem('Role')
                    localStorage.removeItem('RepositoryID')
                    this.setState({
                        isToken: true
                    })
                }
                this.setState({
                    error: error
                })
            })
        }
        else{
            this.setState({
                isLogout: true
            })
        }
    }

    handleLogout (e) {
        e.preventDefault()
        this.props.logout()
        localStorage.removeItem('Token')
        localStorage.removeItem('ID')
        localStorage.removeItem('Role')
        localStorage.removeItem('RepositoryID')
        this.setState({
            isLogout: true
        })
    }

    render() {
        if(this.state.isLogout === true){
            return <Redirect to='/Login'/>
        }
        
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        return (
            <>
                <div className="container-fluid" style={{height: 60}}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="logo-pro">
                                <Link to='/'><img className="main-logo" src="img/logo/logo.png" alt="" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-advance-area">
                    <div className="header-top-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="header-top-wraper">
                                        <div className="row">
                                            <div className="col-lg-1 col-md-0 col-sm-1 col-xs-12">
                                                <div className="menu-switcher-pro">
                                                    <button type="button" id="sidebarCollapse" className="btn bar-button-pro header-drl-controller-btn btn-info navbar-btn">
                                                        <i className="educate-icon educate-nav"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                                                <div className="header-right-info">
                                                    <ul className="nav navbar-nav mai-top-nav header-right-menu">
                                                        {/* <li className="nav-item"><a  data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><i className="educate-icon educate-bell" aria-hidden="true"></i><span className="indicator-nt"></span></a>
                                                            <div role="menu" className="notification-author dropdown-menu animated zoomIn">
                                                                <div className="notification-single-top">
                                                                    <h1>Notifications</h1>
                                                                </div>
                                                                <ul className="notification-menu">
                                                                    <li>
                                                                        <a>
                                                                            <div className="notification-icon">
                                                                                <i className="educate-icon educate-checked edu-checked-pro admin-check-pro" aria-hidden="true"></i>
                                                                            </div>
                                                                            <div className="notification-content">
                                                                                <span className="notification-date">16 Sept</span>
                                                                                <h2>Advanda Cro</h2>
                                                                                <p>Please done this project as soon possible.</p>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                                <div className="notification-view">
                                                                    <a>View All Notification</a>
                                                                </div>
                                                            </div>
                                                        </li> */}
                                                        <li className="nav-item">
                                                            <Link  data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
                                                                <img src="https://www.upsieutoc.com/images/2019/07/03/user2.jpg" alt="" />
                                                                <span className="admin-name" style={{marginRight: 5}}>{this.state.User.FullName}</span>
                                                                <i className="fa fa-angle-down edu-icon edu-down-arrow"></i>
                                                            </Link>
                                                            <ul role="menu" className="dropdown-header-top author-log dropdown-menu animated zoomIn">
                                                                <li><Link to='/Account'><span className="edu-icon edu-locked author-log-ic"></span>Tài Khoản</Link></li>
                                                                <li><Link onClick={this.handleLogout.bind(this)}><span className="edu-icon edu-locked author-log-ic"></span>Thoát</Link></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Breadcum-menu -->  */}
                    <Breadcrumb pageName={this.props.pageName}/>
                    {/* <!-- Breadcum-menu end-->  */}
                </div>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)