import React, { Component } from 'react'
import { Layout, AddStorekeeper } from '../../../component/index'

export default class Add_Storekeeper extends Component {
  render() {  
    return (
        <Layout pageName="Thủ Kho Mới">
            <AddStorekeeper/>
        </Layout>
    )
  }
}
