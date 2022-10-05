import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import 'prismjs'
import './index.scss'
import './prism.css'
import './prism-line-numbers.css'
import App from './App'

import configureStore, { history } from './redux/configureStore'

import { refreshToken, unsetAuth } from './ducks/auth'
import { isTokenExpired } from './helpers/auth'

const store = configureStore()
let token = localStorage.getItem('token')
const rtoken = localStorage.getItem('refreshToken')

if (!isTokenExpired(token)) {
	store.dispatch(refreshToken(rtoken))
	token = localStorage.getItem('token')

	axios.defaults.headers.common = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
	}
} else {
	store.dispatch(unsetAuth())
}

ReactDOM.render(
	<Provider store={store}>
		<App history={history} />
	</Provider>,
	document.getElementById('root')
)
