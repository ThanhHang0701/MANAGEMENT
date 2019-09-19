import React, { Component } from 'react';
import { connect } from 'react-redux'
import ApiService from '../../../services/apiService';
import { Redirect} from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class EditProduct extends Component {

    displayName = "Add product";

    constructor(props) {
        super(props);
        this.apiService = ApiService();
        this.state = {
            Name: '',
            Description: '',
            Price: null, 
            Image: null,
            isSubmit: false,
            isToken: false,
            isLoading: false,
            notification: null,
            error: null
        };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
    }

    getIDFromURL(url)
    {
        let temp = url.split("/");
        let lenOfTemp = temp.length;
        let id = temp[lenOfTemp - 1];
        return id;
    }

    componentDidMount(){
        let url = window.location.href;
        let id = this.getIDFromURL(url);
        this.apiService.getProduct(id, this.props.access_token).then((data)=>{
            this.setState({
                Name: data.Name,
                Price: data.Price,
                Description: data.Description,
                Image: data.Image
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

    editProduct = (e) => {
        e.preventDefault();
        this.setState({
            isSubmit: true,
            isLoading: true,
            notification: null,
            error: null
        });
        let url = window.location.href;
        let id = this.getIDFromURL(url);
        this.apiService.putProduct(id, {
            ID: id,
            Name: this.state.Name,
            Description: this.state.Description,
            Price: this.state.Price,
            Image: this.state.Image
            }, 
            this.props.access_token
        ).then(() => {
            this.setState({
                isLoading: false,
                notification: "Cập nhật thành công"
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
            })
        })
    }

    handleNameChange(event){
        this.setState({
            Name: event.target.value
          });
    }
    handlePriceChange(event){
        this.setState({
            Price: event.target.value
          });
    }
    handleDescriptionChange(event){
        this.setState({
            Description: event.target.value
          });
    }
    handleImageChange(event){
        this.setState({
            Image: event.target.value
          });
    }
    
    render() {
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        let Role = localStorage.getItem('Role')
        if(Role  !== "Boss"){
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
                                <li className="active"><a href="#description">Chỉnh Sửa Sản Phẩm</a></li>
                            </ul>
                            <div id="myTabContent" className="tab-content custom-product-edit">
                                <div className="product-tab-list tab-pane fade active in" id="description">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="review-content-section">
                                                <form onSubmit={this.editProduct}>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="form-group">
                                                                <label for="exampleInputNameProduct">Tên Sản Phẩm</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control" 
                                                                    id="exampleInputNameProduct" 
                                                                    placeholder="Name"
                                                                    onChange={this.handleNameChange}
                                                                    value={this.state.Name}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label for="exampleInputPrice">Giá</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control" 
                                                                    id="exampleInputPrice" 
                                                                    placeholder="Price"
                                                                    onChange={this.handlePriceChange}
                                                                    value={this.state.Price}/>
                                                            </div>
                                                            {/* <div className="form-group">
                                                                <label for="exampleInputTotal">Total Product</label>
                                                                <input type="number" class="form-control" id="exampleInputTotal" placeholder="Total"/>
                                                            </div>
                                                            <div class="dropdown">
                                                                <label for="exampleInputType" style={{paddingRight: 10}}>Type Product  </label>
                                                                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                                    Choose Type
                                                                    <span class="caret"></span>
                                                                </button>
                                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                                                    <li><a href="#">Type 1</a></li>
                                                                    <li><a href="#">Type 2</a></li>
                                                                    <li><a href="#">Type 3</a></li>
                                                                    <li><Link to="/AddCategory" href="#">New Type ...</Link></li>
                                                                </ul>
                                                            </div> */}
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="form-group">
                                                                <label for="exampleInputDescription">Mô Tả</label>
                                                                <textarea 
                                                                    class="form-control" 
                                                                    id="exampleInputDescription" 
                                                                    placeholder="Description" 
                                                                    rows="3"
                                                                    onChange={this.handleDescriptionChange}
                                                                    value={this.state.Description}></textarea>
                                                            </div>
                                                            <div className="form-group">
                                                                <label for="exampleInputFile">Hình Ảnh</label>
                                                                <input 
                                                                    type="text" 
                                                                    id="exampleInputFile"
                                                                    class="form-control" 
                                                                    placeholder="Image" 
                                                                    onChange={this.handleImageChange}
                                                                    value={this.state.Image}/>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="payment-adress"> 
                                                                <div className="col-xs-6 col-md-1">
                                                                    <button type="submit" className="btn btn-primary waves-effect waves-light" >
                                                                    {this.state.isLoading ? <><span style={{width: '80%', height: '90%'}} className="loader"></span>Cập Nhật</> : 'Cập Nhật'}
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

export default connect(mapStateToProps) (EditProduct);
