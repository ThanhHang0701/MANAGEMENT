import React, { Component } from "react";
import ApiService from '../../services/apiService'
import { Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
      user: state.user,
      access_token: state.access_token
    }
}

class Category extends Component {
    constructor(props) {
        super(props);
        this.apiService = ApiService()
        this.state = {
        expanded: false,
        category: this.props.category,
        isSaved: true,
        isToken: false,
        nameChange: '',
        expandIcon: "glyphicon glyphicon-plus pointer",
        collapseIcon: "glyphicon glyphicon-minus pointer"
        };
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    toggleExpanded(event) {
        this.setState({ expanded: !this.state.expanded });
        event.stopPropagation();
    }

    handleEditClick = () => {
        this.setState({
            isSaved: false
        });
    };

    handleCancelClick = () => {
        this.setState({
            isSaved: true
        })
    }

    handleInputChange(event){
        this.setState({
            nameChange: event.target.value
        })
    }

    handleSaveClick (id){
        this.apiService.putCategory(id, {iD: id, name: this.state.nameChange}, this.props.access_token).then(()=>{
            
        }).then(()=>{
            //success thì set state
            let {category} = this.state;
            // -> gán giá trị của value input vào category.Name để sửa lại tên nha
            category.Name = this.state.nameChange
            this.setState({
                category: category,
                isSaved: true
            });
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

    handleDeleteClick(id){
        this.apiService.deleteCategory(id, this.props.access_token).then(()=>{  
            this.setState({
                isSaved: true
            });
        }).then(()=>{
            alert("Xóa thành công", "Phản hồi")
            let {history} = this.props
            history.push({ pathname: '/Category' })
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

    render() {
        if(this.state.isToken === true){
            return <Redirect to='/Login'/>
        }
        let { category } = this.state;
        let style;
        if (!this.props.visible) {
            style = { 
                display: 'none' 
            };
        }
        else {
            style = {
                    // color: '#FFFFFF',
                    // backgroundColor: '#428bca',
            }
        } 

        let indents = [];
        for (let i = 0; i < this.props.level - 1; i++) {
            indents.push(<span key={i} className="indent" />);
        }

        let expandCollapseIcon;
        if (
            category &&
            category.SubCategories &&
            category.SubCategories.length > 0
        ) {
        if (!this.state.expanded) {
            expandCollapseIcon = (
            <span
                className={this.state.expandIcon}
                onClick={this.toggleExpanded.bind(this)}
            />
            );
        } else {
            expandCollapseIcon = (
            <span
                className={this.state.collapseIcon}
                onClick={this.toggleExpanded.bind(this)}
            />
            );
        }
        } else {
        expandCollapseIcon = (
            <span className="icon">
                <i className="" />
            </span>
        );
        }

        let nodeIcon = (
            <span className="icon">
                <i className="" />
            </span>
        );

        let children = [];
        if (category.SubCategories && category.SubCategories.length > 0) {
        category.SubCategories.forEach(node => {
            children.push(
            <Category
                key={node.ID}
                category={node}
                level={this.props.level + 1}
                visible={this.state.expanded && this.props.visible}
            />
            );
        });
        }
        let name = <></>
        const isSaved = this.state.isSaved;
        if (isSaved) {
            name = (
                <>
                    <span>{category.Name}</span>
                    <span
                        onClick={this.handleEditClick}
                        data-toggle="tooltip"
                        title="Sửa"
                        className="pd-setting-ed pointer icon">
                        <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </span>
                    <span 
                        type="button" 
                        data-toggle="modal"
                        title="Xóa" 
                        data-target={'#' + category.ID}
                        className="pd-setting-ed pointer">
                        <i className="fa fa-trash-o" aria-hidden="true" />
                    </span>
                    <div className="modal fade" id={category.ID} role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" style={{color: "black"}}>
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title" id="myModalLabel">Xóa 1 Category</h4>
                                </div>
                                <div className="modal-body">
                                    Bạn muốn xóa loại {category.Name} phải không?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Thoát</button>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        onClick={this.handleDeleteClick.bind(this, category.ID)}
                                        data-dismiss="modal">Đồng Ý
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
            return (
            <li className="list-group-item" style={style}>
                {indents}
                {expandCollapseIcon}
                {nodeIcon}
                {name}
                {children}
            </li>)
        }
        else {
            let editingName = <></>
            editingName = (
                <>
                    <input
                        type="text" 
                        className="editing"
                        value={this.state.nameChange}
                        onChange = {this.handleInputChange}/>
                    <button 
                        onClick={this.handleSaveClick.bind(this, category.ID)}
                        type="submit" 
                        className="btn btn-xs btn-success">
                        Lưu
                    </button>
                    <button 
                        onClick={this.handleCancelClick}
                        type="submit" 
                        className="btn btn-xs btn-danger">
                        Hủy
                    </button>
                </>
            )
            return (
            <li className="list-group-item" style={style}>
                {indents}
                {expandCollapseIcon}
                {nodeIcon}
                {editingName}
                {children}
            </li>
            )
        }
    }
}

export default connect(mapStateToProps) (Category);
