import { take, call, put, all } from 'redux-saga/effects'
import axios from 'axios'

export const moduleName = 'articles'
export const SEARCH_ARTICLE = `SEARCH_ARTICLE`

export const FETCH_ARTICLE = `FETCH_ARTICLE`
export const FETCH_ARTICLE_SUCCESS = `FETCH_ARTICLE_SUCCESS`
export const FETCH_ARTICLE_FAILURE = `FETCH_ARTICLE_FAILURE`

export const FETCH_ARTICLES = `FETCH_ARTICLES`
export const FETCH_ARTICLES_SUCCESS = `FETCH_ARTICLES_SUCCESS`
export const FETCH_ARTICLES_FAILURE = `FETCH_ARTICLES_FAILURE`

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

export const fetchAllArticles = function (keyword) {
	return {
		type: FETCH_ARTICLES,
		payload: { keyword },
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

export function* saga() {
	yield all([fetchArticlesSaga(), fetchArticleIdSaga()])
}
