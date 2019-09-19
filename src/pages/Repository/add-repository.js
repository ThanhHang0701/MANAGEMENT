import React, { Component } from 'react'
import { Layout, AddRepository } from '../../component/index'

export default class Add_Repository extends Component {

  render() {
      
    return (
        <Layout pageName="Kho Hàng Mới">
            <AddRepository/>
        </Layout>
    )
  }
}
