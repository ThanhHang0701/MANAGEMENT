import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ApiService from '../../services/apiService';
import './process.css'

const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class Process extends Component {
    constructor(props) {
        super(props);
        this.apiService = ApiService();
        this.state = {
            isLoading: false,
            isNote: false,
            isStyle: false,
            error: null,
            isLoading1: false,
            isNote1: false,
            isStyle1: false,
            error1: null
        }
    }
    
    handleProcessingStandard = () =>{
        this.setState({
            isLoading: false,
            isStyle: true
        })
        this.apiService.Processing(0).then((data)=>{
            this.setState({
                isLoading: true,
                isNote: data
            })
        }).catch((e)=>{
            this.setState({
                isLoading: true,
                error: "Có lỗi xảy ra!!!"
            })
        }) 
    }

    handleProcessingFast = () =>{
        this.setState({
            isLoading1: false,
            isStyle1: true
        })
        this.apiService.Processing(1).then((data)=>{
            this.setState({
                isLoading1: true,
                isNote1: data
            })
        }).catch((e)=>{
            this.setState({
                isLoading1: true,
                error1: "Có lỗi xảy ra!!!"
            })
        })
        
    }

    render() {
        let Role = localStorage.getItem('Role')
        if(Role !== "Boss"){
            return <Redirect to='/'/>
        }
        let style
        if(this.state.isStyle === false){
            style = "none"
        }
        let style1
        if(this.state.isStyle1 === false){
            style1 = "none"
        }
        return (
            <div className="single-pro-review-area mt-t-30 mg-b-15">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-payment-inner-st" style={{height: 450}}>
                            <ul id="myTabedu1" className="tab-review-design">
                                <h4>ĐIỀU PHỐI</h4>
                            </ul>
                            <div className="row">
                                <div className="col-xs-6">
                                    <div className="thumbnail">
                                        <div className="caption">
                                            <h4>ĐIỀU PHỐI THƯỜNG</h4>
                                            <p>Hệ thống sẽ tự động thực hiện chức năng điều phối đơn hàng hằng ngày</p>
                                            <p>Chức năng này sẽ được thực hiện khi cần điều phối lại, hoặc hệ thống gặp trục trặc không 
                                                thể tự điều phối được!
                                            </p>
                                            <div className="centerDiv" onClick={this.handleProcessingStandard}>
                                                <button type="button" className="btn btn-primary centerbutton" >
                                                <img style={{maxWidth: '20%'}} className="icon" src="https://www.upsieutoc.com/images/2019/07/05/icons8-processor-64-1.png" alt=""/>
                                                ĐIỀU PHỐI</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: style}}>
                                        {this.state.isLoading ? 
                                            this.state.error===null?
                                            <div className="center">
                                                 {this.state.isNote ?  <div className="alert alert-success" role="alert">Điều phối thành công</div>: <div className="alert alert-danger" role="alert">Điều phối thất bại!!!</div>}
                                            </div>
                                            :   <div className="alert alert-danger" role="alert">{this.state.error}</div>
                                            :   <div className="loader"></div>
                                        }
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                <div className="thumbnail">
                                        <div className="caption">
                                            <h4>ĐIỀU PHỐI NHANH</h4>
                                            <p>Hệ thống sẽ tự động thực hiện chức năng điều phối đơn hàng nhanh</p>
                                            <p>Chức năng này sẽ được thực hiện khi cần điều phối lại, hoặc hệ thống gặp trục trặc không 
                                                thể tự điều phối được!
                                            </p>
                                            <div className="centerDiv" onClick={this.handleProcessingFast}>
                                                <button type="button" className="btn btn-primary centerbutton" >
                                                <img style={{maxWidth: '20%'}} className="icon" src="https://www.upsieutoc.com/images/2019/07/05/icons8-processor-64-1.png" alt=""/>
                                                ĐIỀU PHỐI</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: style1}}>
                                        {this.state.isLoading1 ? 
                                            this.state.error1===null?
                                            <div className="center">
                                                {this.state.isNote1 ?  <div className="alert alert-success" role="alert">Điều phối thành công</div>: <div className="alert alert-danger" role="alert">Điều phối thất bại!!!</div>}
                                            </div>
                                            :   <div className="alert alert-danger" role="alert">{this.state.error1}</div>
                                            :   <div className="loader"></div>
                                        }
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

export default connect(mapStateToProps) (Process);

