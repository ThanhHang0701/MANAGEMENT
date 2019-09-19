import React, { Component } from 'react'
import { Layout, AddProduct } from '../../component/index'

export default class Add_Product extends Component {

  render() {
      
    return (
        <Layout pageName="Sản Phẩm Mới">
            <AddProduct/>
        </Layout>
    )
  }
}
