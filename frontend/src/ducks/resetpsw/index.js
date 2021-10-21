import { take, put, all, fork } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'

export const moduleNameSet = 'resetpsw'

export const FORGOT_PASSWORD = `FORGOT_PASSWORD`
export const FORGOT_PASSWORD_SUCCESS = `FORGOT_PASSWORD_SUCCESS`
export const FORGOT_PASSWORD_FAILURE = `FORGOT_PASSWORD_FAILURE`

export const RESET_PASSWORD = `RESET_PASSWORD`
export const RESET_PASSWORD_SUCCESS = `RESET_PASSWORD_SUCCESS`
export const RESET_PASSWORD_FAILURE = `RESET_PASSWORD_FAILURE`

const INITIAL_STATE = {
	resetPassword: null,
	error: null,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD:
			return {
				...state,
				resetPassword: false,
				error: null,
			}
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				resetPassword: true,
				error: null,
			}
		case FORGOT_PASSWORD_FAILURE:
			console.log('red1', action.payload.error.statusCode)
			return {
				...state,
				resetPassword: false,
				error: {
					statusCode: action.payload.error.statusCode,
					message: action.payload.message,
				},
			}

		case RESET_PASSWORD:
			return {
				...state,
				resetPassword: false,
				error: null,
			}
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPassword: true,
				error: null,
			}
		case RESET_PASSWORD_FAILURE:
			return {
				...state,
				resetPassword: false,
				error: action.payload.data.error,
			}

		default:
			return state
	}
}

export const forgot = function (data) {
	console.log('act-frog', data)
	return {
		type: FORGOT_PASSWORD,
		payload: data,
	}
}

export const setpassw = function (data) {
	console.log('setpassw:', data)
	return {
		type: RESET_PASSWORD,
		payload: data,
	}
}

export const forgotSaga = function* () {
	while (true) {
		const action = yield take(FORGOT_PASSWORD)

		try {
			const response = yield axios.post(`/api/forgot`, action.payload)
			console.log('FORGOT', response.data)
			yield put({
				type: FORGOT_PASSWORD_SUCCESS,
				payload: { response },
			})

			yield put(push('/resetpassword/status'))
		} catch (err) {
			console.log('FORGOT-err', err.response.data)
			yield put({ type: FORGOT_PASSWORD_FAILURE, payload: err.response.data })
		}
	}
}

export const setpasswSaga = function* () {
	while (true) {
		const action = yield take(RESET_PASSWORD)

		try {
			console.log('setpassw', action.payload)
			const response = yield axios.post(`/api/setpassword`, action.payload)
			console.log('setpassw', response)
			yield put({
				type: RESET_PASSWORD_SUCCESS,
				payload: { response },
			})

			yield put(push('/signin'))
		} catch (err) {
			yield put({ type: RESET_PASSWORD_FAILURE, payload: err.response })
		}
	}
}

export function* saga() {
	yield all([fork(forgotSaga), fork(setpasswSaga)])
}
