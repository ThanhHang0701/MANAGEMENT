import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../pages/home';
import ListStorekeeper from '../pages/User/Storekeeper/list-storekeepers'
import AddStorekeeper from '../pages/User/Storekeeper/add-storekeeper'
import EditStorekeeper from '../pages/User/Storekeeper/edit-storekeeper'
import ListShipper from '../pages/User/Shipper/list-shipper'
import AddShipper from '../pages/User/Shipper/add-shipper'
import EditShipper from '../pages/User/Shipper/edit-shipper'
import Login from '../pages/login'
import ListProduct from '../pages/Product/list-product'
import AddProduct from '../pages/Product/add-product'
import EditProduct from '../pages/Product/edit-product'
import AddCategory from '../pages/Category/add-category'
import ListCategory from '../pages/Category/list-category'
import ListAdmin from '../pages/User/Admin/list-admin'
import AddAdmin from '../pages/User/Admin/add-admin'
import EditAdmin from '../pages/User/Admin/edit-admin'
import ListRepository from '../pages/Repository/list-repository'
import AddRepository from '../pages/Repository/add-repository'
import ImportProduct from '../pages/Product/import-product'
import ExportProduct from '../pages/Product/export-product'
import Order from '../pages/Order/list-order'
import ProductRepository from '../pages/Product-Repository/list-product-repository'
import Account from '../pages/Account/account'
// import ErrorBoundary from '../pages/ErrorBoundary'
import Error from '../pages/Error'
import Process from '../pages/Process/process'

class RouterURL extends Component {

    render() {
        return (
            <div>
            {/* <ErrorBoundary> */}
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/Login' component = {Login} />
                <Route path='/Account' component = {Account} />
                <Route path ='/Processing' component={Process}/>

                {/* <Route path='/Admin/:page' component={ListAdmin}/> */}
                <Route path='/Admin/:page' render={(props, match) => <ListAdmin {...props} match={match}/>}/>
                <Route path='/NewAdmin' component={AddAdmin}/>
                <Route path='/EditAdmin/:id' component={EditAdmin}/>

                {/* <Route path='/Storekeeper/:page' component={ListStorekeeper}/> */}
                <Route path='/Storekeeper/:page' render={(props, match) => <ListStorekeeper {...props} match={match}/>}/>
                <Route path='/NewStorekeeper' component={AddStorekeeper}/>
                <Route path='/EditStorekeeper/:id' component={EditStorekeeper}/>

                {/* <Route path='/Shipper/:page' component={ListShipper}/> */}
                <Route path='/Shipper/:page' render={(props, match) => <ListShipper {...props} match={match}/>}/>
                <Route path='/NewShipper' component={AddShipper}/>
                <Route path='/EditShipper/:id' component={EditShipper}/>

                {/* <Route path='/Product/:page' component={ListProduct}/> */}
                <Route path='/Product/:page' render={(props, match) => <ListProduct {...props} match={match}/>}/>
                <Route path='/NewProduct' component={AddProduct}/>
                <Route path='/EditProduct/:id' component={EditProduct}/>
                
                <Route path='/Category' component={ListCategory}/>
                <Route path='/NewCategory' component={AddCategory}/>

                <Route path='/Repository' component={ListRepository}/>
                <Route path='/NewRepository' component={AddRepository}/>

                <Route path='/Import' component={ImportProduct}/>
                <Route path='/Export' component={ExportProduct}/>

                <Route path='/Order' component={Order}/>
                {/* <Route path='/ProductRepository/:page' component={ProductRepository}/> */}
                <Route path='/ProductRepository/:page' render={(props, match) => <ProductRepository {...props} match={match}/>   }/>
                <Route component={Error}></Route>
            </Switch>
            {/* </ErrorBoundary> */}

            </div>
        );
    }
}
export default RouterURL;