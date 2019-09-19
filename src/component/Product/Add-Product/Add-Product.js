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

class AddProduct extends Component {
    displayName = "Add product";

    constructor(props) {
        super(props);
        this.apiService = ApiService();
        this.state = {
            Name: '',
            Description: '',
            Price: 0, 
            Image: null,
            Category: [],
            CategoryB1: null,
            CategoryB2: null,
            Quantity: null,
            isSubmit: false,
            isToken: false,
            isCate: true,
            isLoading: false,
            notification: null,
            error: null,
            error1: null,
            isCate1: true
        };
    }

    componentDidMount(){
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
    }

    newProduct = (e) => {
        e.preventDefault();
        this.setState({
            isSubmit: true,
            isLoading: true,
            notification: null,
            error: null
        });
        let id = null;
        if (!this.state.Name) {
            this.setState({
                isLoading: false
            })
            return;
        }
        if (!this.state.Description) {
            this.setState({
                isLoading: false
            })
            return;
        }
        if (!this.state.Price || this.setState.Price <= 0) {
            this.setState({
                isLoading: false
            })
            return;
        }
        if (!this.state.Image) {
            this.setState({
                isLoading: false
            })
            return;
        }
        if(this.state.CategoryB1 === null){
            this.setState({
                isCate1: false,
                isLoading: false
            })
            return;
        }
        if(this.state.CategoryB1!== null && this.state.CategoryB2 !== null){
            id = this.state.CategoryB2.ID
        }
        this.apiService.postProduct({
            Name: this.state.Name,
            Description: this.state.Description,
            Price: this.state.Price,
            Image: this.state.Image,
            CategoryID: id
            }, 
            this.props.access_token
        ).then(() => {
            this.setState({
                notification: "Thêm mới thành công",
                isLoading: false
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
                isLoading: false
            })
        })
    }
    getCategoryB2OfCategoryB1 = (CategoryB1ID) => {
        let CategoryB1s = this.state.Category
        let CategoryB1Filter = CategoryB1s.filter((CategoryB1) => {
            return CategoryB1.ID === CategoryB1ID;
        })
        
        return CategoryB1Filter[0].SubCategories;
    }

    getCategoryB1ById = (CategoryB1ID) => {
        let CategoryB1s = this.state.Category
        let CategoryB1Filter = CategoryB1s.filter((CategoryB1) => {
            return CategoryB1.ID === CategoryB1ID;
        })
        return CategoryB1Filter[0];
    }
    
    getCategoryB2ById = (CategoryB2Id) => {
        let CategoryB2s = this.state.CategoryB1.SubCategories;
        let CategoryB2Filter = CategoryB2s.filter((CategoryB2) => {
            return CategoryB2.ID === CategoryB2Id;
        })
        return CategoryB2Filter[0];
    }
    handleCategoryB1Change = (event)=>{
        const selectedCategoryB1ID = event.target.value;
        if (selectedCategoryB1ID !== 'Chọn...'){
            const selectedCategoryB1 = this.getCategoryB1ById(selectedCategoryB1ID);
            let SubCategories = this.getCategoryB2OfCategoryB1(selectedCategoryB1ID);
            this.setState({
                CategoryB1: selectedCategoryB1,
                CategoryB2: SubCategories[0],
                isCate: false
            });
        }else{
            this.setState({
                CategoryB1: null,
                CategoryB2: null,
                isCate: true
            });
        }
    }
    handleCategoryB2Change = (event)=>{
        const selectedCategoryB2ID = event.target.value;
        const selectedCategoryB2 = this.getCategoryB2ById(selectedCategoryB2ID);
        this.setState({
            CategoryB2: selectedCategoryB2
        });
    }
    handleNameChange = (event)=>{
        this.setState({
            error: "",
            Name: event.target.value
          });
    }
    handlePriceChange = (event)=>{
        if(event.target.value <= 0){
            this.setState({
                error1: "Giá phải lớn hơn 0"
            })
        }else{
            this.setState({
                error: "",
                Price: event.target.value
              });
        }
    }
    handleDescriptionChange = (event)=>{
        this.setState({
            error: "",
            Description: event.target.value
          });
    }
    handleImageChange = (event)=>{
        this.setState({
            error: "",
            Image: event.target.value
          });
    }
    render() {
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        let Role = localStorage.getItem('Role')
        if(Role !== "Boss"){
            return <Redirect to='/'/>
        }
        let styleCateB2;
        if(this.state.isCate === false){
            styleCateB2 = { 
                display: 'block' 
            };
        }
        else {
            styleCateB2 = { 
                display: 'none' 
            };
        }
        let selectedCategoryB1 = this.state.CategoryB1;
        let categoryB2 = <option />;
        if (selectedCategoryB1 && selectedCategoryB1.SubCategories.length > 0) {
            categoryB2 = selectedCategoryB1.SubCategories.map((t, i) => (
              <option key={i} value={t.ID}>
                {t.Name}
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
                        <a href="#description">Thêm Mới Sản Phẩm</a>
                    </li>
                    </ul>
                    <div id="myTabContent" className="tab-content custom-product-edit">
                    <div className="product-tab-list tab-pane fade active in"  id="description" >
                        <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="review-content-section">
                            <form onSubmit={this.newProduct}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputNameProduct">Tên Sản Phẩm</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputNameProduct" 
                                                placeholder="Name"
                                                onChange={this.handleNameChange}
                                                value={this.state.Name}/>
                                                {(this.state.isSubmit & !this.state.Name ||
                                                    this.state.error) && (
                                                    <div className="notify-box">
                                                    <p className="error">
                                                        {this.state.error ||
                                                        "Vui lòng nhập tên sản phẩm"}
                                                    </p>
                                                    </div>
                                                )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPrice">Giá </label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="exampleInputPrice" 
                                                placeholder="Price"
                                                onChange={this.handlePriceChange}
                                                value={this.state.Price}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputCategory1">Danh Mục Bậc 1</label>
                                            <select className="form-control option" id="exampleInputCategory1" onChange={this.handleCategoryB1Change.bind(this)}>
                                                <option>Chọn...</option>
                                                {this.state.Category && this.state.Category.map((item, i)=>
                                                    <option key={i} value={item.ID} >{item.Name}</option>
                                                )}
                                            </select>
                                            {(!this.state.isCate1) && (
                                                <div className="notify-box">
                                                <p className="error">
                                                    {"Hãy chọn danh mục cho sản phẩm"}
                                                </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group" style={styleCateB2}>
                                            <label htmlFor="exampleInputCategory2">Danh Mục Bậc 2</label>
                                            <select className="form-control option" id="exampleInputCategory2" onChange={this.handleCategoryB2Change.bind(this)}>
                                                {categoryB2}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputDescription">Mô Tả</label>
                                            <textarea 
                                                className="form-control" 
                                                id="exampleInputDescription" 
                                                placeholder="Description" 
                                                rows="3"
                                                onChange={this.handleDescriptionChange}
                                                value={this.state.Description} />
                                                {(this.state.isSubmit & !this.state.Description ||
                                                    this.state.error) && (
                                                    <div className="notify-box">
                                                    <p className="error">
                                                        {this.state.error ||
                                                        "Vui lòng nhập mô tả sản phẩm"}
                                                    </p>
                                                    </div>
                                                )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">Hình Ảnh</label>
                                            <input 
                                                type="text" 
                                                id="exampleInputFile"
                                                className="form-control" 
                                                placeholder="Image" 
                                                onChange={this.handleImageChange}
                                                value={this.state.Image}/>
                                                {(this.state.isSubmit & !this.state.Image ||
                                                    this.state.error) && (
                                                    <div className="notify-box">
                                                    <p className="error">
                                                        {this.state.error ||
                                                        "Vui lòng nhập hình ảnh sản phẩm"}
                                                    </p>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div> 
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

export default connect(mapStateToProps) (AddProduct);
