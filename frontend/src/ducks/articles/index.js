import { take, call, put, all } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import axios from 'axios'

export const moduleName = 'articles'
export const SEARCH_ARTICLE = `SEARCH_ARTICLE`

export const FETCH_ARTICLE = `FETCH_ARTICLE`
export const FETCH_ARTICLE_SUCCESS = `FETCH_ARTICLE_SUCCESS`
export const FETCH_ARTICLE_FAILURE = `FETCH_ARTICLE_FAILURE`

export const FETCH_ARTICLES = `FETCH_ARTICLES`
export const FETCH_ARTICLES_SUCCESS = `FETCH_ARTICLES_SUCCESS`
export const FETCH_ARTICLES_FAILURE = `FETCH_ARTICLES_FAILURE`

export const ADD_ARTICLE_REQUEST = `ADD_ARTICLE_REQUEST`
export const ADD_ARTICLE_SUCCESS = `ADD_ARTICLE_SUCCESS`
export const ADD_ARTICLE_FAILURE = `ADD_ARTICLE_FAILURE`

export const DELETE_ARTICLE_REQUEST = `DELETE_ARTICLE_REQUEST`
export const DELETE_ARTICLE_SUCCESS = `DELETE_ARTICLE_SUCCESS`
export const DELETE_ARTICLE_FAILURE = `DELETE_ARTICLE_FAILURE`

export const UPDATE_ARTICLE_REQUEST = `UPDATE_ARTICLE_REQUEST`
export const UPDATE_ARTICLE_SUCCESS = `UPDATE_ARTICLE_SUCCESS`
export const UPDATE_ARTICLE_FAILURE = `UPDATE_ARTICLE_FAILURE`

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
		case FETCH_ARTICLE:
			return {
				...state,
				post: null,
				loading: true,
			}
		case FETCH_ARTICLE_SUCCESS:
			return {
				...state,
				post: payload.data.article,
				error: null,
				loading: false,
			}
		case FETCH_ARTICLE_FAILURE:
			error = payload
			return {
				...state,
				post: null,
				error,
				loading: false,
			}
		case FETCH_ARTICLES:
			return {
				...state,
				posts: [],
				loading: true,
				error: payload,
			}
		case FETCH_ARTICLES_SUCCESS:
			return {
				...state,

				posts: payload.articles,
				error: null,
				loading: false,
			}
		case FETCH_ARTICLES_FAILURE:
			error = payload
			return {
				...state,
				posts: null,
				error,
				loading: false,
			}

		case UPDATE_ARTICLE_SUCCESS:
			return {
				...state,
				post: payload.data.post,
				error: null,
				loading: false,
			}

		case DELETE_ARTICLE_REQUEST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
				error: null,
				loading: false,
			}
		case DELETE_ARTICLE_FAILURE:
			error = payload
			return {
				...state,
				posts: null,
				error,
				loading: false,
			}

		default:
			return state
	}
}

export function SearchArticles() {
	return {
		type: SEARCH_ARTICLE,
	}
}

export function fetchArticleId(slug) {
	return {
		type: FETCH_ARTICLE,
		payload: { slug },
	}
}

export function fetchArticleUpd(slugg) {
	return {
		type: FETCH_ARTICLE,
		payload: { slugg },
	}
}
export const fetchAllArticles = function (keyword) {
	return {
		type: FETCH_ARTICLES,
		payload: { keyword },
	}
}

export const addArticle = function (data) {
	return {
		type: ADD_ARTICLE_REQUEST,
		payload: data,
	}
}

export const deleteArticle = function (id) {
	return {
		type: DELETE_ARTICLE_REQUEST,
		payload: id,
	}
}

export const updateArticle = function (data) {
	return {
		type: UPDATE_ARTICLE_REQUEST,
		payload: data,
	}
}

export const fetchArticles = (keyword) =>
	axios
		.get(`/api/articles?keyword=${keyword}`, {
			headers: [],
		})
		.then((response) => response.data)
export function fetchArticlesSuccess(articles) {
	return {
		type: FETCH_ARTICLES_SUCCESS,
		payload: articles,
	}
}

export function fetchArticlesFailure(error) {
	return {
		type: FETCH_ARTICLES_FAILURE,
		payload: error,
	}
}

export const fetchArticlesSaga = function* () {
	while (true) {
		try {
			const action = yield take(FETCH_ARTICLES)
			const resp = yield call(fetchArticles, action.payload.keyword)
			yield put(fetchArticlesSuccess(resp.data))
		} catch (error) {
			yield put({ type: FETCH_ARTICLES_FAILURE, payload: error })
		}
	}
}

function fetchArticle(slug) {
	return axios.get(`/api/article/${slug}`)
}

export function fetchArticleIdSuccess(article) {
	return {
		type: FETCH_ARTICLE_SUCCESS,
		payload: article,
	}
}

export function fetchArticleSuccess(articles) {
	return {
		type: FETCH_ARTICLE_SUCCESS,
		payload: articles,
	}
}
export function fetchArticleFailure(error) {
	return {
		type: FETCH_ARTICLE_FAILURE,
		payload: error,
	}
}

export const fetchArticleIdSaga = function* () {
	while (true) {
		try {
			const action = yield take(FETCH_ARTICLE)
			const resp = yield call(fetchArticle, action.payload.slug)
			yield put(fetchArticleIdSuccess(resp.data))
		} catch (err) {
			yield put({ type: FETCH_ARTICLE_FAILURE, payload: err.response.data })
		}
	}
}

export const addArticleSaga = function* () {
	while (true) {
		const action = yield take(ADD_ARTICLE_REQUEST)

		try {
			const response = yield axios.post(`/api/addarticle`, action.payload)

			yield put({
				type: ADD_ARTICLE_SUCCESS,
				payload: { response },
			})

			yield put(push('/articles'))
		} catch (err) {
			yield put({ type: ADD_ARTICLE_FAILURE, payload: err.response })
		}
	}
}

export const deleteArticleSaga = function* () {
	while (true) {
		const action = yield take(DELETE_ARTICLE_REQUEST)

		try {
			const response = yield axios.post(`/api/deletearticle/${action.payload}`)

			yield put({
				type: DELETE_ARTICLE_SUCCESS,
				payload: {
					response,
				},
			})

			yield put(push('/editArticles'))
		} catch (err) {
			yield put({ type: DELETE_ARTICLE_FAILURE, payload: err.response })
		}
	}
}

export const updateArticleSaga = function* () {
	while (true) {
		const action = yield take(UPDATE_ARTICLE_REQUEST)

		try {
			const response = yield axios.put(
				`/api/updatearticle/${action.payload._id}`,
				action.payload
			)

			yield put({
				type: UPDATE_ARTICLE_SUCCESS,
				payload: response.data,
			})

			yield put(push(`/article/${action.payload.slug}`))
		} catch (err) {
			yield put({ type: UPDATE_ARTICLE_FAILURE, payload: err.response })
		}
	}
}
export function* saga() {
	yield all([
		fetchArticlesSaga(),
		fetchArticleIdSaga(),
		addArticleSaga(),
		deleteArticleSaga(),
		updateArticleSaga(),
	])
}
