import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import ApiService from '../../services/apiService'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class ListRepository extends Component {
    displayName = 'List Repository'

    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            Repository: [],
            isToken: false
        }
    }

    componentDidMount(){
        this.apiService.getListRepository(this.props.access_token).then((data)=>{
            this.setState({
                Repository: data
            })
        }).catch((e) => {
            let error = 'Có lỗi sảy ra. vui lòng thử lại'
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

    // handleDeleteRepository(id){
    //     let Token = localStorage.getItem('Token')
    //     this.apiService.deleteRepository(id, Token).then(()=>{
    //     }).then(()=>{
    //         alert("Xóa thành công", "Phản hồi")
    //     }).catch((e) => {
    //         let error = 'Có lỗi sảy ra. vui lòng thử lại'
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
                                <h4>Danh Sách Kho</h4>
                                <div className="add-product">
                                    <Link to='/NewRepository'>Thêm Mới Kho</Link>
                                </div>
                                <div className="asset-inner">
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên Kho</th>
                                            <th>Địa Chỉ</th>
                                        </tr>
                                        {this.state.Repository && this.state.Repository.map((item, i)=>(
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.Address}</td>
                                        </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default connect(mapStateToProps) (ListRepository);