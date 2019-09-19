import React, { Component } from 'react'
import { Layout, ListAdmin } from '../../../component/index'


export default class List_Admin extends Component {

  render() {
      
    return (
        <Layout pageName="Quản Lý">
            <ListAdmin/>
        </Layout>
    )
  }
}
