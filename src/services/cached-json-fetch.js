import lscache from 'lscache'
import fetch from 'isomorphic-fetch'
// var crypto = require('crypto-js')
const TTL_MINUTES = 4

function parseJSON(response) {
	if (response.status === 204 || response.status === 205) {
		return null
	}
	return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	}
	return response.json().then((data) => {
		let error = new Error(data.message)
		error.response = response
		error.status = response.status
		error.result = data.result
		throw error
	})
}

export default async function(url, token, force = false) {
	// var bytes = crypto.AES.decrypt(token, 'HTEAM123')
	// var Token = bytes.toString(crypto.enc.Utf8);
	// We don't cache anything when server-side rendering.
	// That way if users refresh the page they always get fresh data.
	let authorization = (token) ? ('bearer ' + token) : '';
	let options = {
		method: 'GET',
		headers:{
			'Content-Type': 'application/json',
			'Authorization': authorization
		}
	}
	if (force || typeof window === 'undefined') {
		return fetch(url, options).then(checkStatus)
			.then(parseJSON)
	}

	let cachedResponse = lscache.get(url)
	// If there is no cached response,
	// do the actual call and store the response
	if (cachedResponse === null) {
		cachedResponse = await fetch(url, options).then(response =>
			response.json()
		)
		lscache.set(url, cachedResponse, TTL_MINUTES)
	}

	return cachedResponse
}

export function httpPostLogin(url, username,  password) {
	return fetch(url,
		{
		method: 'POST',
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body:  "username=" + username + "&password=" + password + "&grant_type=password",
	}).then(checkStatus)
	.then(parseJSON)
}

export function httpPost(url, data, token) {
	// var bytes = crypto.AES.decrypt(token, 'HTEAM123')
	// var Token = bytes.toString(crypto.enc.Utf8);
	let authorization = (token) ? ('bearer ' + token) : '';
	return fetch(url, {
		method: 'POST',
		headers:{
			'Content-Type': 'application/json',
			'Authorization': authorization
		},
		body: JSON.stringify(data)
	}).then(checkStatus)
		
}

export function httpPut(url, data, token) {
	// var bytes = crypto.AES.decrypt(token, 'HTEAM123')
	// var Token = bytes.toString(crypto.enc.Utf8);
	let authorization = (token) ? ('bearer ' + token) : '';
	return fetch(url, {
		method: 'PUT',
		headers:{
			'Content-Type': 'application/json',
			'Authorization': authorization
		},
		body: JSON.stringify(data)
	}).then(checkStatus)
		.then(parseJSON)
}

export function httpDelete(url, token) {
	// var bytes = crypto.AES.decrypt(token, 'HTEAM123')
	// var Token = bytes.toString(crypto.enc.Utf8);
	let authorization = (token) ? ('bearer ' + token) : '';
	return fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': authorization
		}
	})
		.then(checkStatus)
		// .then(parseJSON)
}

