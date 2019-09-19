import React, { Component } from 'react'
import { Layout, ShipperList } from '../../../component/index'


export default class List_Shipper extends Component {

  render() {
      
    return (
        <Layout pageName="Shipper">
            <ShipperList/>
        </Layout>
    )
  }
}
