import fetchCached, {httpPostLogin, httpDelete,  httpPost, httpPut } from './cached-json-fetch'
const baseURL = `https://hteamrepositorymanagementwebapi.azurewebsites.net/api/`
const baseURLProcess = `https://hteamprocessingbillserver.azurewebsites.net/api/`
// const baseURL = `http://localhost:60642/api/`
// const baseURLProcess = `http://localhost:50045/api/`

export default () => {
	let services = {
		// Login API
		emailLogin(username, password) {
			return httpPostLogin(baseURL + `login`, username, password)
		},
		// User API
        getUser: (id, token) => {
            return fetchCached(baseURL + `User/${id}`, token, true)
		},
		putChangePass: (data, token) =>{
			return httpPut(baseURL + `changepassword`, data, token)
		},
		getStorekeepers: (page, perPage, repositoryID, token) =>{
			return fetchCached(baseURL + `storekeepers?page=${page}&perPage=${perPage}&repositoryID=${repositoryID}`, token, true) 
		},
		getShippers: (page, perPage, repositoryID, token) =>{
			return fetchCached(baseURL + `shippers?page=${page}&perPage=${perPage}&repositoryID=${repositoryID}`, token, true) 
		},
		getListShippers: (repositoryID, token) =>{
			return fetchCached(baseURL + `listshippers?repositoryID=${repositoryID}`, token, true) 
		},
		getAdmin: (page, perPage, repositoryID, token) =>{
			return fetchCached(baseURL + `admins?page=${page}&perPage=${perPage}&repositoryID=${repositoryID}`, token, true)
		},
		postUser: (data, token) => {
			return httpPost(baseURL + `User`, data, token)
		},
		putUser: (id, data, token) => {
			return httpPut(baseURL + `User/${id}`, data, token)
		},
		deleteUser: (id, token)=> {
			return httpDelete(baseURL + `User/${id}`, token)
		},
		// Repository API
		getListRepository: (token)=>{
			return fetchCached(baseURL + `Repository`, token, true)
		},
		getRepository: (id, token)=>{
			return fetchCached(baseURL + `Repository/${id}`, token, true)
		},
		postRepository: (data, token) => {
			return httpPost(baseURL + `Repository`, data, token)
		},
		putRepository: (id, data, token)=> {
			return httpPut(baseURL + `Repository/${id}`, data, token)
		},
		deleteRepository: (id, token)=>{
			return httpDelete(baseURL + `Repository/${id}`, token)
		},
		// Product API
		getListProduct: (page, perPage, categoryID, token) =>{
			return fetchCached(baseURL + `allproducts?page=${page}&perPage=${perPage}&categoryID=${categoryID}`, token, true)
		},
		getListProductRepository:(page, perPage, categoryID, token)=>{
			return fetchCached(baseURL + `productinrepository?page=${page}&perPage=${perPage}&categoryID=${categoryID}`, token, true)
		},
		getListProductByCategory: (categoryID, token) =>{
			return fetchCached(baseURL + `allproducts?categoryID=${categoryID}`, token, true)
		},
		getProduct: (id, token)=>{
			return fetchCached(baseURL + `Product/${id}`, token, true)
		},
		putProduct: (id, data, token) =>{
			return httpPut(baseURL + `Product/${id}`, data, token)
		},
		postProduct: (data, token) => {
			return httpPost(baseURL + `Product`, data, token)
		}, 
		deleteProduct: (id, token) => {
			return httpDelete(baseURL + `Product/${id}`, token)
		},
		// Category API
		getCategory:(token)=>{
			return fetchCached(baseURL + `Category`, token, true)
		},
		postCategory: (data, token) =>{
			return httpPost(baseURL + `Category`, data, token)
		},
		putCategory: (id, data, token) =>{
			return httpPut(baseURL + `Category/${id}`, data, token)
		},
		deleteCategory: (id, token) =>{
			return httpDelete(baseURL + `Category/${id}`, token)
		},
		// Address API
		getListAddress: (token) =>{
			return fetchCached(baseURL + `Address`, token, true)
		},
		getAddress: (id, token) =>{
			return fetchCached(baseURL + `Address/${id}`, token, true)
		},
		postAddress: (data, token)=>{
			return httpPost(baseURL + `Address`, data, token)
		},
		putAddress: (id, data, token) =>{
			return httpPut(baseURL + `Address/${id}`, data, token)
		},
		deleteAddress: (id, token) =>{
			return httpDelete(baseURL + `Address/${id}`, token)
		},
		// Import API
		importProduct: (data, token) =>{
			return httpPost(baseURL + `Import`, data, token)
		},
		// Export API
		exportProduct: (data, token) =>{
			return httpPost(baseURL + `Export`, data, token)
		},
		// Order API
		getListShipperByOrder: (idRepository, time, token) =>{
			return fetchCached(baseURL + `bill?repositoryID=${idRepository}&time=${time}`, token, true)
		},
		getDetailListOrder: (shipperID, time, token)=>{
			return fetchCached(baseURL + `billbyshipper?shipperID=${shipperID}&time=${time}`, token, true)
		},
		getDetailOrder: (id, token) =>{
			return fetchCached(baseURL + `bill?id=${id}`, token, true)
		},
		// Dashboard api
		getDasshboardAdmin: (token)=>{
			return fetchCached(baseURL + `admindashboard`, token, true)
		},
		getDashboardBoss: (token) =>{
			return fetchCached(baseURL + `bossdashboard`, token, true)
		},
		getDashboardStorekeeper: (token) =>{
			return fetchCached(baseURL + `countproductinrepository`, token, true)
		},
		// Processing API
		// Điều phối thường: deliverytype = 0
		// Điều phối nhanh: deliverytype = 1
		Processing: (deliverytype)=>{
			return fetchCached(baseURLProcess + `adminprocessing?deliverytype=${deliverytype}`)
		},
		// Map API
		getMap: (shipperID, time, token)=>{
			return fetchCached(baseURL + `shipperlocations?shipperID=${shipperID}&time=${time}`, token, true)
		}
	}
	return services
}



// export const codeResponse = {
//     OK: 0,
//     ACTIVATION_REQUEST: 100,
//     ORDER_PER_DAY_EXCEEDED: 101,
//     REGISTERED_ACCOUNT_REQUEST_ORDER: 102,
//     INACTIVE_ACCOUNT: 103,
//     NO_SOCIAL_NETWORK: 104,
//     NO_AUTHORIZATION_CODE: 105,
//     INVALID_IMAGE_EXTENSION: 106,
//     INVALID_ID: 107,
//     INVALID_TOP_OBJECT_TYPE: 108,
//     NOT_SET_PASSWORD: 109,
//     REQUIRED_AUTH: 403,
//     EXPIRED_COUPON: 200,
//     INACTIVE_COUPON: 201,
//     APPLIED_COUPON_CODE: 202,
//     STARTED_COUPON: 203,
//     NOT_YET_STARTED_COUPON: 204,
//     ORDER_INSUFFICIENT_ACCOUNT_POINT: 206,
//     ORDER_REWARD_OUT_OF_STOCK: 207,
// 		LIMIT_SIZE_UPLOAD: 205,
// 		NOT_FOUND: 404,
// 		LIMIT_NUMBER_REVIEW: 209
// }

