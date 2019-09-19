import React, { Component } from 'react'
import { Layout, EditProduct } from '../../component/index'

export default class Edit_Product extends Component {

  render() {
      
    return (
        <Layout pageName="Chỉnh Sửa Sản Phẩm">
            <EditProduct/>
        </Layout>
    )
  }
}
