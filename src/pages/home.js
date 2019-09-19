import React, { Component } from "react";
import { Layout, Dashboard, Dashboard1, Dashboard2 } from "../component/index";
import { Redirect} from 'react-router-dom'
export default class Home extends Component {
  render() {
    let Role = localStorage.getItem('Role')
    if(Role !== null){
      if(Role === "Admin"){
        return (
          <Layout pageName="Dashboard">
            <Dashboard />
          </Layout>
        );
      }
      else{
        if(Role === "Boss"){
          return (
            <Layout pageName="Dashboard">
              <Dashboard1/>
            </Layout>
          );
        }else{
          return (
            <Layout pageName="Dashboard">
              <Dashboard2/>
            </Layout>
          );
        }
      }
    }
    else{
      return <Redirect to='/Login'/>
    }
  }
}
