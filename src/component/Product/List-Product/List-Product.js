import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom'
import './List-Product.css';
import { connect } from 'react-redux'
import ApiService from '../../../services/apiService'
import until from '../../../services/until.curency'
import {withRouter} from 'react-router-dom';
const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class ListProduct extends Component {
    displayName = "List product";
    
    constructor(props) {
    super(props);
        this.apiService = ApiService();
        this.state = {
            Product: null,
            Category: [],
            Page: 1,
            TotalPage: null,
            categoryID: null,
            isToken: false,
            stt: 1,
            isLoading: false
        };
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        this.apiService.getCategory(this.props.access_token).then((data)=>{
            this.setState({
                Category: data
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

        const {match} = this.props;
        if(match && match.params){
            const page = match.params.page;
            this.setState({
                stt: page*10-9
            })
            this.apiService.getListProduct(page, 10, this.state.categoryID, this.props.access_token).then((data)=>{
                this.setState({
                    Product: data.Products,
                    Page: data.Page,
                    TotalPage: data.TotalPage,
                    isLoading: false
                })
            }).catch((e) => {
                let error = 'Có lỗi xảy ra. vui lòng thử lại'
                if (e.status === 401) {
                    error = 'Không có quyền truy cập'
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

    componentWillReceiveProps(nextProps){
        let page = nextProps.match.params.page;
        if (page !== this.props.match.params.page) {
            this.setState({
                isLoading: true
            })
            this.apiService.getListProduct(page, 10, this.state.categoryID, this.props.access_token).then((data)=>{
                this.setState({
                    Product: data.Products,
                    Page: data.Page,
                    TotalPage: data.TotalPage,
                    isLoading: false
                })
            }).catch((e) => {
                let error = 'Có lỗi xảy ra. vui lòng thử lại'
                if (e.status === 401) {
                    error = 'Không có quyền truy cập'
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
    
    componentDidUpdate(prevProps, prevState){
        if(this.state.categoryID!==prevState.categoryID){
            this.setState({
                isLoading: true
            })
            this.apiService.getListProduct(this.state.Page, 10, this.state.categoryID, this.props.access_token).then((data)=>{
                this.setState({
                    Product: data.Products,
                    Page: data.Page,
                    TotalPage: data.TotalPage,
                    isLoading: false
                })
            }).catch((e) => {
                let error = 'Có lỗi xảy ra. vui lòng thử lại'
                if (e.status === 401) {
                    error = 'Không có quyền truy cập'
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

    chooseCategory = (e)=>{
        if (e.target.value === "Chọn Loại"){
            this.setState({
                Product: null,
                categoryID: null
            })
        }
        else{
            this.setState({
                Product: null,
                categoryID: e.target.value
            })
        }
    }

    handlePreviousPage = ()=>{
        this.setState({
            Page: this.state.Page - 1,
            stt: this.state.stt - 10
        })
    }

    handleNextPage= ()=>{
        this.setState({
            Page: this.state.Page + 1,
            stt: this.state.stt + 10
        })
    }

    // handleDeleteProduct(id){
    //     let Token = localStorage.getItem('Token')
    //     this.apiService.deleteProduct(id, Token).then(()=>{
    //     }).then(()=>{
    //         alert("Xóa thành công", "Phản hồi")
    //     }).catch((e) => {
    //         let error = 'Có lỗi xảy ra. vui lòng thử lại'
    //         if (e.status === 401) {
    //             error = 'Không có quyền truy cập'
    //             this.setState({
    //                 isToken: true
    //             })
    //         }
    //         this.setState({
    //             error: error
    //         })
    //     })
    // }

  
    render() {
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        let Role = localStorage.getItem('Role')
        if(Role !== "Boss"){
            return <Redirect to='/'/>
        }
        return (
            <div className="product-status mg-b-15">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="product-status-wrap drp-lst">
                            <h4>DANH SÁCH SẢN PHẨM</h4>
                            <div className="add-product">
                                <Link to="/NewProduct">Thêm Mới</Link>
                            </div>
                            <div className="form-group choose">
                                <select className="form-control option" id="exampleSelect1" onChange={this.chooseCategory}>
                                <option >Chọn Loại</option>
                                {this.state.Category && this.state.Category.map((item, i)=>
                                    <option key={i} value={item.ID} >{item.Name}</option>
                                )}
                                </select>
                            </div>
                            {this.state.isLoading ?  <div className="loading"></div>
                            :
                            <>
                            <div className="asset-inner">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên Sản Phẩm</th>
                                            <th>Loại</th>
                                            <th>Giá</th>
                                            <th>Số Lượng</th>
                                            <th>Hình Ảnh</th>
                                            <th>Mô Tả</th>
                                            <th>Cài Đặt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.Product && this.state.Product.map((temp, i)=>
                                        <tr key={i}>
                                            <td>{this.state.stt + i}</td>
                                            <td>{temp.Name}</td>
                                            <td>{temp.Category}</td>
                                            <td>{until.showVNDCurrency(temp.Price)}</td>
                                            <td>{temp.Quantity}</td>
                                            <td>
                                                <img src={temp.Image} className="img-responsive" alt=""/>
                                            </td>
                                            <td>{temp.Description}</td>
                                            <td>
                                                <Link to={`/EditProduct/${temp.ID}`}><button data-toggle="tooltip" title="Edit" className="pd-setting-ed"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>

                                                {/* <button type="button" className="pd-setting-ed" data-toggle="modal" data-target={"#"+i}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                                <div className="modal fade" id={i} role="dialog" aria-labelledby="myModalLabel">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title" id="myModalLabel">Xóa 1 Sản Phẩm</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                    Bạn chắc chứ?
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-default" data-dismiss="modal">Thoát</button>
                                                        <button type="button" className="btn btn-primary" onClick= {this.handleDeleteProduct.bind(this, temp.ID)} data-dismiss="modal">Đồng Ý </button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div> */}
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="custom-pagination">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {+this.state.Page > 1 ?
                                        <li className="page-item"><Link to={`/Product/${(+this.state.Page - 1)}`}  onClick={this.handlePreviousPage}>← 10 Trước</Link></li>
                                        : null
                                        }
                                        {this.state.Page < this.state.TotalPage ?
                                        <li className="page-item"><Link to={`/Product/${(+this.state.Page + 1)}`} onClick={this.handleNextPage}> Sau 10 →</Link></li>
                                        : null
                                        }
                                    </ul>
                                </nav>
                            </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(connect(mapStateToProps) (ListProduct));
