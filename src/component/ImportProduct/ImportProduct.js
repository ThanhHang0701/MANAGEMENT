import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import './ImportProduct.css'
import ApiService from '../../services/apiService';
import until from '../../services/until.curency'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    access_token: state.access_token
  }
}

class ImportProduct extends Component {

  constructor(props) {
    super(props);
    this.apiService = ApiService();
    this.state = {
      categories: [],
      CategoryB1: null,
      CategoryB2: null,
      products: null,
      listProduct: [],
      newProduct: null,
      listNewProduct: [],
      quantity: 0,
      quantityChange: 0,
      isToken: false,
      isCate: true,
      isLoading: false,
      notification: null,
      notification1: false,
      error: null,
      isSubmit: false,
      errorCate: true
    }
  }

  componentDidMount(){
    this.apiService.getCategory(this.props.access_token).then((data)=>{
      this.setState({
        categories: data
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

  getCategoryB2OfCategoryB1 = (CategoryB1ID) => {
    let CategoryB1s = this.state.categories
    let CategoryB1Filter = CategoryB1s.filter((CategoryB1) => {
        return CategoryB1.ID === CategoryB1ID;
    })
    return CategoryB1Filter[0].SubCategories;
  }

  getCategoryB1ById = (CategoryB1ID) => {
    let CategoryB1s = this.state.categories
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
      this.apiService.getListProductByCategory(SubCategories[0].ID, this.props.access_token).then((data)=>{
        this.setState({
          products: data,
          newProduct: data[0]
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
    }else{
      this.setState({
          CategoryB1: null,
          CategoryB2: null,
          isCate: true
      });
      let idCategory = event.target.value
      this.apiService.getListProductByCategory(idCategory, this.props.access_token).then((data)=>{
        this.setState({
          products: data
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
  }

  handleCategoryB2Change = (event)=>{
    const selectedCategoryB2ID = event.target.value;
    const selectedCategoryB2 = this.getCategoryB2ById(selectedCategoryB2ID);
    this.setState({
        CategoryB2: selectedCategoryB2
    });
    this.apiService.getListProductByCategory(selectedCategoryB2ID, this.props.access_token).then((data)=>{
      this.setState({
        products: data,
        newProduct: data[0]
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

  handleProductChange = (event) => {
    let idProduct = event.target.value
    this.state.products.map((item)=>{
      if(item.ID === idProduct){
        this.setState({
          newProduct: item
        })
      }
      return 1;
    })
  }

  handleNewProduct = () =>{
    this.setState({
      isSubmit: true,
      error: null,
      notification: null
    })

    if(this.state.CategoryB1 === null ){
      this.setState({
        errorCate: false
      })
      return
    }else{
      this.setState({
        errorCate: true
      })
    }

    if(this.state.quantity <=0){
      this.setState({
        error: "Nhập số lượng lớn hơn 0"
      })
      return
    }

    this.setState(prevState => ({
      listProduct: [...prevState.listProduct, 
        {
          ID: this.state.newProduct.ID, 
          Name: this.state.newProduct.Name,
          Category: this.state.newProduct.Category,
          Price: this.state.newProduct.Price,
          Quantity: this.state.quantity,
          Image: this.state.newProduct.Image,
          Description: this.state.newProduct.Description
        }
      ],
      listNewProduct: [...prevState.listNewProduct,
        {
          productID: this.state.newProduct.ID,
          quantity: this.state.quantity
        }
      ]
    }))
  }

  handleNumberChange = (event) =>{
    this.setState({
      quantity:  event.target.value
    })
  }

  handleNumberProductChange = (event) =>{
    this.setState({
      quantityChange: event.target.value
    })
  }

  handleEditProduct(id){
    let pro = this.state.listProduct
    let newpro = this.state.listNewProduct
    if(pro.length>0){
      for(let i = 0; i < pro.length; i++) {
        if(pro[i].ID === id) {
          pro[i].Quantity = this.state.quantityChange
          newpro[i].quantity = this.state.quantityChange
          break;
        }
      }
    } 
    this.setState({
      listProduct : pro,
      listNewProduct: newpro
    })
  }

  handleDeleteProduct(id){
    let pro = this.state.listProduct
    let newpro = this.state.listNewProduct
    if(pro.length>0){
      for(let i = 0; i < pro.length; i++) {
        if(pro[i].ID === id) {
          pro.splice(i, 1);
          newpro.splice(i, 1);
          break;
        }
      }
    } 
    this.setState({
      listProduct : pro,
      listNewProduct: newpro
    })
  }

  handleImport = () =>{
    if(this.state.listNewProduct.length > 0){
      this.setState({
        isLoading: true,
        notification: null,
        notification1: false,
        error: null
      })
      let importerID = this.props.user.ID
      this.apiService.importProduct(
        {
          importerID: importerID,
          repositoryID: this.props.user.RepositoryID,
          ProductImports: this.state.listNewProduct
        },
        this.props.access_token
      ).then(()=>{
        this.setState({
          notification1: false,
          notification: "Nhập kho thành công",
          isLoading: false,
          listNewProduct: [],
          listProduct: [],
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
          notification1: false,
          notification: error,
          isLoading: false,
          listNewProduct: [],
          listProduct: [],
        })
      })
    }else{
      this.setState({
        notification1: true,
        notification: "Không có sản phẩm để nhập kho",
        isLoading: false,
        listNewProduct: [],
        listProduct: [],
      })
    }
  }

  render() {
    if(this.state.isToken === true){
      return <Redirect to='/Login'/>
    }

    let Role = localStorage.getItem('Role')
    if(Role !== "Storekeeper"){
      return <Redirect to='/'/>
    }

    let stylebtn
    if(this.state.notification===null){
      stylebtn="none"
    }
    let selectedCategoryB1 = this.state.CategoryB1;
    let categoryB2 = <option />;
    if (selectedCategoryB1 && selectedCategoryB1.SubCategories.length > 0) {
        categoryB2 = selectedCategoryB1.SubCategories.map((t, i) => (
          <option key={t.ID} value={t.ID}>
            {t.Name}
          </option>
        ));
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

    return(
      <div className="product-status mg-b-15">
        <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="product-status-wrap drp-lst">
                  <h4>NHẬP KHO </h4>
                  <div className="option-choose">
                    <div className="form-group chooseCategory">
                      <label htmlFor="exampleInputCategory">Danh Mục Bậc 1</label>
                      <select className="form-control option" id="exampleInputCategory" onChange={this.handleCategoryB1Change}>
                      <option>Chọn...</option>
                        {this.state.categories && this.state.categories.map((item, i)=>
                          <option key={i} value={item.ID} >{item.Name}</option>
                        )}
                      </select>
                      {(!this.state.errorCate) && (
                          <div className="notify-box">
                          <p className="error">
                              {"Hãy chọn danh mục cho sản phẩm"}
                          </p>
                          </div>
                      )}
                    </div>
                    <div className="form-group chooseProduct" style={styleCateB2}>
                        <label htmlFor="exampleInputCategory2">Danh Mục Bậc 2</label>
                        <select className="form-control option" id="exampleInputCategory2" onChange={this.handleCategoryB2Change}>
                            {categoryB2}
                        </select>
                    </div>
                    <div className="form-group chooseProduct" style={styleCateB2}>
                      <label htmlFor="exampleInputProduct">Sản Phẩm</label>
                      <select className="form-control option" id="exampleInputProduct" onChange={this.handleProductChange}>
                      {this.state.products && this.state.products.map((temp, i)=>(
                          <option key={temp.ID} value={temp.ID} >{temp.Name}</option>
                      ))}
                      </select>
                    </div>
                    <div className="form-group chooseProduct" style={styleCateB2}>
                      <label htmlFor="exampleNumberProduct">Số Lượng</label>
                      <input type="number" className="form-control option" id="exampleNumberProduct" onChange={this.handleNumberChange}/>
                      {(this.state.isSubmit) && (
                          <div className="notify-box">
                              <p className="error">
                                  {this.state.error }
                              </p>
                          </div>
                      )}
                    </div>
                    <div className="form-group chooseProduct" style={styleCateB2}>
                      <Link className="newProduct" onClick = {this.handleNewProduct} >Thêm Mới</Link>
                    </div>
                  </div>
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
                          <th>Cài đặt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.listProduct && this.state.listProduct.map((temp, i)=>
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{temp.Name}</td>
                          <td>{temp.Category}</td>
                          <td>{until.showVNDCurrency(temp.Price)}</td>
                          <td>{temp.Quantity}</td>
                          <td>
                              <img src={temp.Image} className="img-responsive" alt=""/>
                          </td>
                          <td>{temp.Description}</td>
                          <td>
                            <button type="button" className="pd-setting-ed" data-toggle="modal" data-target={"#"+temp.ID}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <div className="modal fade" id={temp.ID} role="dialog" aria-labelledby="myModalLabel">
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                      <h4 className="modal-title" id="myModalLabel">Chỉnh Sửa Sản Phẩm</h4>
                                  </div>
                                  <div className="modal-body">
                                    <label htmlFor="exampleNumberProductChange">Nhập Số Lượng</label>
                                    <input type="number" className="form-control option" id="exampleNumberProductChange" onChange={this.handleNumberProductChange}/>
                                  </div>
                                  <div className="modal-footer">
                                      <button type="button" className="btn btn-default" data-dismiss="modal">Thoát</button>
                                      <button type="button" className="btn btn-primary" onClick= {this.handleEditProduct.bind(this, temp.ID)} data-dismiss="modal">Đồng Ý </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button type="button" className="pd-setting-ed" data-toggle="modal" data-target={"#"+i}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                            <div className="modal fade" id={i} role="dialog" aria-labelledby="myModalLabel">
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                      <h4 className="modal-title" id="myModalLabel">Xóa 1 Sản Phẩm</h4>
                                  </div>
                                  <div className="modal-body"> Bạn chắc chứ? </div>
                                  <div className="modal-footer">
                                      <button type="button" className="btn btn-default" data-dismiss="modal">Thoát</button>
                                      <button type="button" className="btn btn-primary" onClick= {this.handleDeleteProduct.bind(this, temp.ID)} data-dismiss="modal">Đồng Ý </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                    )}
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                  <div className="payment-adress"> 
                      <div className="col-xs-6 col-md-1">
                          <button type="submit" className="btn btn-primary waves-effect waves-light" onClick={this.handleImport}>
                          {this.state.isLoading ? <><span style={{width: '80%', height: '90%'}} className="loader"></span>Lưu</> : 'Lưu'}
                          </button>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-5" style={{display: stylebtn}}>
                          {this.state.notification !== null ? 
                          this.state.notification1 ? <div className="alert alert-danger" role="alert">{this.state.notification}</div>
                          : <div className="alert alert-success" role="alert">{this.state.notification}</div>
                          :<div className="alert alert-danger" role="alert">{this.state.error}</div>}
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps) (ImportProduct);

