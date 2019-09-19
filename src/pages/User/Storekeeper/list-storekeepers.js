import React, { Component } from 'react'
import { Layout, StorekeepersList } from '../../../component/index'

export default class Storekeepers_List extends Component {

  render() {
      
    return (
        <Layout pageName="Thủ Kho">
            <StorekeepersList/>
        </Layout>
    )
  }
}
