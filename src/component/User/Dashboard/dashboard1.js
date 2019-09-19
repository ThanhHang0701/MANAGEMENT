import React, { Component } from 'react';
import ApiService from '../../../services/apiService';
import {Redirect} from 'react-router'

class Dashboard1 extends Component {
    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            admins: 0,
            products: 0,
            isToken: false
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
            this.apiService.getDashboardBoss(Token).then((data)=>{
                this.setState({
                    admins: data.admins,
                    products: data.products
                })
            }).catch((e) => {
                let error = 'Có lỗi sảy ra. vui lòng thử lại'
                if (e.status === 401) {
                    error = 'Không có quyền truy cập'
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
        }else{
            this.setState({
                isToken: true
            })
        }
    }

   
    render() {
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        return (
        <div className="container-fluid">
            <div className="dashboard" style={{height: 450}}>
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div className="analytics-sparkle-line reso-mg-b-30">
                            <div className="analytics-content">
                                <h5>Quản Lý Kho</h5>
                                <h2><span className="counter">{this.state.admins}</span> <span className="tuition-fees">Nhân Viên</span></h2>
                                <div className="progress m-b-0">
                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}}> <span className="sr-only"></span> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div className="analytics-sparkle-line reso-mg-b-30">
                            <div className="analytics-content">
                                <h5>Tổng Số Loại Sản Phẩm</h5>
                                <h2><span className="counter">{this.state.products}</span> <span className="tuition-fees">Sản phẩm</span></h2>
                                <div className="progress m-b-0">
                                <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}}> <span className="sr-only"></span> </div>
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

export default Dashboard1;