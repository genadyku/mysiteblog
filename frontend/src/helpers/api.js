import axios from 'axios'

import { getAuthUserData, getRefreshToken, setToken } from './tokens'

export const authAxios = axios.create({})

authAxios.interceptors.request.use(
	(config) => {
		const token = getAuthUserData()
		config.headers.Authorization = `Bearer ${token}`
		return config
	},
	(error) => Promise.reject(error)
)

authAxios.interceptors.response.use(
	(response) => response,
	(error) => {
		const origReq = error.config
		const code = error && error.response ? error.response.status : 0

		if (origReq._rentry) {
			console.log('rentry', origReq._rentry)
		}
		if (code === 401 || !origReq._rentry) {
			origReq._rentry = true
			//	const refreshToken = getRefreshToken()
			// console.log('111111')

			const refreshToken = getRefreshToken()
			return axios.post(`/api/refresh`, { token: refreshToken }).then((res) => {
				if (res.status === 201) {
					setToken(res.data)
					console.log('erff:', res.data)
					const token = getAuthUserData()
					authAxios.defaults.headers.Authorization = `Bearer ${token}`
					return authAxios(origReq)
				}
			})
		}
		return Promise.reject(error)
	}
)
