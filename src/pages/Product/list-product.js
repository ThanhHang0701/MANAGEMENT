import React, { Component } from 'react'
import { Layout, ListProduct } from '../../component/index'

export default class List_Product extends Component {

  render() {
      
    return (
        <Layout pageName="Sản Phẩm">
            <ListProduct/>
        </Layout>
    )
  }
}
