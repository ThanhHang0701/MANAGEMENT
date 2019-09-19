import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Can} from '../../component/index'
import './nav-menu.css'

class Navmenu extends Component {
  render() {
    const role = localStorage.getItem('Role');
    return (
      <div className="left-sidebar-pro">
        <nav id="sidebar" className="">
          <div className="sidebar-header">
            <a>
              <img className="main-logo" src="https://www.upsieutoc.com/images/2019/07/03/hteam.png" alt="" />
            </a>
            <strong>
              <a>
                <img src="https://www.upsieutoc.com/images/2019/07/03/hteam.png" alt="" />
              </a>
            </strong>
          </div>
          <div className="left-custom-menu-adp-wrap comment-scrollbar">
            <nav className="sidebar-nav left-sidebar-menu-pro">
              <ul className="metismenu" id="menu1">
                <Can 
                  role={role}
                  perform="dashboard-page:visit"
                  yes={()=>(
                    <li className="active">
                      <Link to="/">
                        <img className="icon" src="https://i.imgur.com/VhWlXiP.png" alt=""/>
                        <span className="mini-click-non icon-home">Dashboard</span>
                      </Link>
                    </li>
                  )}
                />
                <Can
                  role={role}
                  perform="user-processing-page: create"
                  yes={() => (
                    <li className="active">
                        <Link to='/Processing'>
                          <img className="icon" src="https://www.upsieutoc.com/images/2019/07/05/icons8-processor-64.png" alt=""/>
                          <span className="mini-click-non icon-admin">Điều Phối</span>
                        </Link>
                    </li>
                  )}
                />
                <Can
                  role={role}
                  perform="user-admin-page: list"
                  yes={() => (
                    <li className="active">
                        <Link data-toggle="collapse" data-target="#admin" className="has-arrow">
                          <img className="icon" src="https://i.imgur.com/YthkhWf.png" alt=""/>
                          <span className="mini-click-non icon-admin">Admin</span>
                        </Link>
                        <ul id="admin" className="collapse dropdown-header-top">
                          <li><Link to='/Admin/1' title="List Admin" ><span className="mini-sub-pro">Danh Sách Admin</span></Link></li>
                          <li><Link to='/NewAdmin' title="New Admin" ><span className="mini-sub-pro">Admin Mới</span></Link></li>
                        </ul>
                    </li>
                  )}
                />
                <Can
                  role={role}
                  perform="user-storekeeper-page: list"
                  yes={() => (
                    <li className="active">
                        <Link data-toggle="collapse" data-target="#storekeeper" className="has-arrow">
                          <img className="icon" src="https://i.imgur.com/95j0R8T.png" alt=""/>
                          <span className="mini-click-non icon-storekeeper">Thủ Kho</span>
                        </Link>
                        <ul id="storekeeper" className="collapse dropdown-header-top">
                          <li><Link to='/Storekeeper/1' title="List Storekeepers" ><span className="mini-sub-pro">Danh Sách Thủ Kho</span></Link></li>
                          <li><Link to='/NewStorekeeper' title="New Storekeepers" ><span className="mini-sub-pro">Thủ Kho Mới</span></Link></li>
                        </ul>
                    </li>
                  )}
                />
                <Can
                  role={role}
                  perform="user-shipper-page: list"
                  yes={() => (
                    <li className="active">
                      <Link data-toggle="collapse" data-target="#shipper" className="has-arrow">
                        <img className="icon" src="https://i.imgur.com/Fj2mXcH.png" alt=""/>
                        <span className="mini-click-non icon-shipper">Shipper</span>
                      </Link>
                      <ul id="shipper" className="collapse dropdown-header-top">
                          <li><Link to='/Shipper/1' title="List Shipper" ><span className="mini-sub-pro">Danh Sách Shipper</span></Link></li>
                          <li><Link to='/NewShipper' title="New Shipper" ><span className="mini-sub-pro">Shipper Mới</span></Link></li>
                      </ul>
                  </li>
                  )}
                />
                {/* <Can
                  role={role}
                  perform="repository-page: list"
                  yes={() => (
                    <li className="active">
                      <Link
                        data-toggle="collapse"
                        data-target="#repository"
                        className="has-arrow"
                      >
                        <img className="icon" src="https://i.imgur.com/OAECgy9.png" alt="" />{"     "}
                        <span className="mini-click-non icon-product">Kho</span>
                      </Link>
                      <ul id="repository" className="collapse dropdown-header-top">
                        <li>
                          <Link to="/Repository" title="List Repository">
                            <span className="mini-sub-pro">Danh Sách Kho</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/NewRepository" title="New Repository">
                            <span className="mini-sub-pro">Kho Mới</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                /> */}
                <Can
                  role={role}
                  perform="product-page: list"
                  yes={() => (
                    <li className="active">
                      <Link
                        data-toggle="collapse"
                        data-target="#products"
                        className="has-arrow"
                      >
                        <img className="icon" src="https://i.imgur.com/QWHMmzb.png" alt=""/>{" "}
                        <span className="mini-click-non icon-product">Sản Phẩm</span>
                      </Link>
                      <ul id="products" className="collapse dropdown-header-top">
                        <li>
                          <Link to="/Product/1" title="List Product">
                            <span className="mini-sub-pro">Danh Sách Sản Phẩm</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/NewProduct" title="Add Product">
                            <span className="mini-sub-pro">Sản Phẩm Mới</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                />
                <Can
                  role={role}
                  perform="product-repository-page: list"
                  yes={() => (
                    <li className="active">
                      <Link
                        data-toggle="collapse"
                        data-target="#products"
                        className="has-arrow"
                      >
                        <img className="icon" src="https://i.imgur.com/QWHMmzb.png" alt=""/>{" "}
                        <span className="mini-click-non icon-product">Sản Phẩm</span>
                      </Link>
                      <ul id="products" className="collapse dropdown-header-top">
                        <li>
                          <Link to="/ProductRepository/1" title="List Product">
                            <span className="mini-sub-pro">Danh Sách Sản Phẩm</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                />
                <Can
                  role={role}
                  perform="category-page: list"
                  yes={() => (
                    <li className="active">
                      <Link
                        data-toggle="collapse"
                        data-target="#category"
                        className="has-arrow"
                      >
                        <img className="icon" src="https://i.imgur.com/huwAl5B.png" alt=""/>{" "}
                        <span className="mini-click-non icon-category">Danh Mục</span>
                      </Link>
                      <ul id="category" className="collapse dropdown-header-top">
                        <li>
                          <Link to="/Category" title="List Category">
                            <span className="mini-sub-pro">Danh Sách Danh Mục</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/NewCategory" title="Add Category">
                            <span className="mini-sub-pro">Danh Mục Mới</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                />

                <Can role={role}
                perform="import-page: list"
                yes={() => (
                <li className="active">
                  <Link to = '/Import' >
                    <img className="icon" src="https://i.imgur.com/4G3HLrp.png" alt=""/>
                    <span className="mini-click-non icon-import">Nhập Kho</span>
                  </Link>
                </li>
                )} />
                <Can role={role}
                perform="export-page: list"
                yes={() => (
                <li className="active">
                  <Link to = '/Export'>
                    <img className="icon" src="https://i.imgur.com/Jku1jic.png" alt=""/>
                    <span className="mini-click-non icon-export">Xuất Kho</span>
                  </Link>
                </li>
                )} />
                <Can role={role}
                perform="order-page: list"
                yes={() => (
                <li className="active">
                  <Link to = '/Order'>
                    <img className="icon" src="https://i.imgur.com/tPbHVpu.png" alt=""/>
                    <span className="mini-click-non icon-export">Đơn Hàng</span>
                  </Link>
                </li>
                )} />
              </ul>
            </nav>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navmenu;
