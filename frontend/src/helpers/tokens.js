export const getAuthUserData = () => {
	const data = localStorage.getItem('token')

	return data
}

export const getRefreshToken = () => {
	const data = localStorage.getItem('refreshToken')

	return data
}

export const setToken = (data) => {
	localStorage.setItem('token', data.token)
	localStorage.setItem('refreshToken', data.refreshToken)
}

export const clearToken = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('refreshToken')
}
