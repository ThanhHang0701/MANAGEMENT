import React, { Component } from 'react'
import { Layout, ListRepository } from '../../component/index'

export default class List_Repository extends Component {

  render() {
      
    return (
        <Layout pageName="Kho Hàng">
            <ListRepository/>
        </Layout>
    )
  }
}
