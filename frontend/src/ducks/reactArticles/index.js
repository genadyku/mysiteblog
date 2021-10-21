import { take, call, put, all } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'

import { authAxios } from '../../helpers/api'

export const moduleNameR = 'reactarticles'

export const FETCH_REACT = `FETCH_REACT`
export const FETCH_REACT_SUCCESS = `FETCH_REACT_SUCCESS`
export const FETCH_REACT_FAILURE = `FETCH_REACT_FAILURE`

export const FETCH_REACTS = `FETCH_REACTS`
export const FETCH_REACTS_SUCCESS = `FETCH_REACTS_SUCCESS`
export const FETCH_REACTS_FAILURE = `FETCH_REACTS_FAILURE`

export const ADD_REACT_REQUEST = `ADD_REACT_REQUEST`
export const ADD_REACT_SUCCESS = `ADD_REACT_SUCCESS`
export const ADD_REACT_FAILURE = `ADD_REACT_FAILURE`

const INITIAL_STATE = {
	posts: [],
	post: {},
	loading: false,
	error: null,
}
export default function reducer(state = INITIAL_STATE, action) {
	let error
	const { type, payload } = action
	switch (type) {
		case FETCH_REACTS:
			return {
				...state,
				posts: [],
				loading: true,
				error: payload,
			}
		case FETCH_REACTS_SUCCESS:
			return {
				...state,
				posts: payload.data.articles,
				loading: false,
				error: null,
			}
		case FETCH_REACTS_FAILURE:
			error = payload
			return {
				...state,
				posts: null,
				loading: false,
				error,
			}
		case FETCH_REACT:
			return {
				...state,
				post: null,
				loading: true,
			}
		case FETCH_REACT_SUCCESS:
			return {
				...state,
				post: payload.data.article,
				error: null,
				loading: false,
			}
		case FETCH_REACT_FAILURE:
			// error = payload || { message: payload.message };
			error = payload
			return {
				...state,
				post: null,
				error,
				loading: false,
			}

		default:
			return state
	}
}

export const fetchAllArticlesReact = function () {
	return {
		type: FETCH_REACTS,
	}
}

export function fetchArticleReactId(slug) {
	return {
		type: FETCH_REACT,
		payload: { slug },
	}
}

export const addReactArticle = function (data) {
	return {
		type: ADD_REACT_REQUEST,
		payload: data,
	}
}

export const fetchArticlesReact = () => authAxios.get(`/api/reacts`)
export function fetchArticlesReactSuccess(articles) {
	return {
		type: FETCH_REACTS_SUCCESS,
		payload: articles,
	}
}

export function fetchArticlesReactFailure(error) {
	return {
		type: FETCH_REACTS_FAILURE,
		payload: error,
	}
}
export const fetchReactArticle = (slug) => authAxios.get(`/api/react/${slug}`)

export function fetchArticleReactSuccess(articles) {
	return {
		type: FETCH_REACT_SUCCESS,
		payload: articles,
	}
}
export function fetchArticleReactFailure(error) {
	return {
		type: FETCH_REACT_FAILURE,
		payload: error,
	}
}
export const fetchArticlesReactSaga = function* () {
	while (true) {
		try {
			yield take(FETCH_REACTS)
			const resp = yield call(fetchArticlesReact)
			yield put(fetchArticlesReactSuccess(resp.data))
		} catch (err) {
			yield put({ type: FETCH_REACTS_FAILURE, payload: err.response.data })
		}
	}
}
export const fetchArticleIdReactSaga = function* () {
	while (true) {
		try {
			const action = yield take(FETCH_REACT)
			const resp = yield call(fetchReactArticle, action.payload.slug)
			yield put(fetchArticleReactSuccess(resp.data))
		} catch (err) {
			yield put({ type: FETCH_REACT_FAILURE, payload: err.response.data })
		}
	}
}

export const addReactArticleSaga = function* () {
	while (true) {
		const action = yield take(ADD_REACT_REQUEST)

		try {
			const response = yield axios.post(`/api/addreactarticle`, action.payload)

			yield put({
				type: ADD_REACT_SUCCESS,
				payload: { response },
			})

			yield put(push('/artreact'))
		} catch (err) {
			yield put({ type: ADD_REACT_FAILURE, payload: err.response })
		}
	}
}

export function* saga() {
	yield all([
		fetchArticlesReactSaga(),
		fetchArticleIdReactSaga(),
		addReactArticleSaga(),
	])
}
