import { take, call, put, all } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'

export const moduleNameL = 'lesson'

export const CHAPTERS_REQUEST = `CHAPTERS_REQUEST`
export const CHAPTERS_SUCCESS = `CHAPTERS_SUCCESS`
export const CHAPTERS_FAILURE = `CHAPTERS_FAILURE`

export const ADD_CHAPTERS_REQUEST = `ADD_CHAPTERS_REQUEST`
export const ADD_CHAPTERS_SUCCESS = `ADD_CHAPTERS_SUCCESS`
export const ADD_CHAPTERS_FAILURE = `ADD_CHAPTERS_FAILURE`

export const LESSONS_REQUEST = `LESSONS_REQUEST`
export const LESSONS_SUCCESS = `LESSONS_SUCCESS`
export const LESSONS_FAILURE = `LESSONS_FAILURE`

export const LESSON_REQUEST = `LESSON_REQUEST`
export const LESSON_SUCCESS = `LESSON_SUCCESS`
export const LESSON_FAILURE = `LESSON_FAILURE`

export const EDIT_LESSON_REQUEST = `EDIT_LESSON_REQUEST`
export const EDIT_LESSON_SUCCESS = `EDIT_LESSON_SUCCESS`
export const EDIT_LESSON_FAILURE = `EDIT_LESSON_FAILURE`

export const UPDATE_LESSON_REQUEST = `UPDATE_LESSON_REQUEST`
export const UPDATE_LESSON_SUCCESS = `UPDATE_LESSON_SUCCESS`
export const UPDATE_LESSON_FAILURE = `UPDATE_LESSON_FAILURE`

export const TITLE_REQUEST = `TITLE_REQUEST`
export const TITLE_SUCCESS = `TITLE_SUCCESS`
export const TITLE_FAILURE = `TITLE_FAILURE`

export const ADD_LESSON_REQUEST = `ADD_LESSON_REQUEST`
export const ADD_LESSON_SUCCESS = `ADD_LESSON_SUCCESS`
export const ADD_LESSON_FAILURE = `ADD_LESSON_FAILURE`

export const DELETE_REQUEST = `DELETE_REQUEST`
export const DELETE_SUCCESS = `DELETE_SUCCESS`
export const DELETE_FAILURE = `DELETE_FAILURE`

export const ID_REQUEST = `ID_REQUEST`
export const ID_SUCCESS = `ID_SUCCESS`
export const ID_FAILURE = `ID_FAILURE`

const initialState = {
	lessons: [],
	lesson: null,
	title: [],
	loading: false,
	error: null,
}

export default function reducer(state = initialState, action) {
	let error
	const { type, payload } = action
	switch (type) {
		case CHAPTERS_REQUEST:
			return {
				...state,
				lessons: {
					chapters: [],
					loading: true,
					error: null,
				},
			}
		case CHAPTERS_SUCCESS:
			return {
				...state,
				lessons: {
					chapters: action.payload,
					loading: false,
					error: null,
				},
			}
		case CHAPTERS_FAILURE:
			return {
				...state,
				error: { message: action.payload.data.message },
			}

		case LESSONS_REQUEST:
			return {
				...state,
				lessons: [],
				loading: true,
				error: null,
			}
		case LESSONS_SUCCESS:
			return {
				...state,
				lessons: action.payload,
				loading: false,
				error: null,
			}

		case LESSONS_FAILURE:
			return {
				...state,
				loading: false,
				error: {},
			}
		case LESSON_REQUEST:
			return {
				...state,
				lesson: null,
				loading: true,
				error: null,
			}
		case LESSON_SUCCESS:
			return {
				...state,
				lesson: action.payload,
				loading: false,
				error: null,
			}
		case LESSON_FAILURE:
			error = payload
			console.log('err:', error)

			return {
				...state,
				lesson: null,
				loading: false,
				error,
			}
		case TITLE_REQUEST:
			return {
				...state,
				titles: [],
				loading: false,
				error: null,
			}
		case TITLE_SUCCESS:
			return {
				...state,
				title: action.payload,
				loading: true,
				error: null,
			}
		case TITLE_FAILURE:
			error = payload

			return {
				...state,
				title: null,
				loading: true,
				error,
			}

		case EDIT_LESSON_REQUEST:
			return {
				...state,
				edtlessons: {
					lesson: [],
					loading: true,
					error: null,
				},
			}
		case EDIT_LESSON_SUCCESS:
			return {
				...state,
				edtlessons: {
					lesson: action.payload,
					loading: false,
					error: null,
				},
			}
		case EDIT_LESSON_FAILURE:
			return {
				...state,
				error: { message: action.payload.data.message },
			}

		case ADD_CHAPTERS_REQUEST:
			return {
				...state,
				lessons: {
					chapters: [],
					loading: true,
					error: null,
				},
			}
		case ADD_CHAPTERS_SUCCESS:
			return {
				...state,
				lessons: {
					chapters: action.payload,
					loading: true,
					error: null,
				},
			}
		case ADD_CHAPTERS_FAILURE:
			return {
				...state,
				error: { message: action.payload.data.message },
			}

		case ADD_LESSON_FAILURE:
			return {
				...state,
				error: { message: action.payload.data.message },
			}
		case ID_REQUEST:
			return {
				...state,
				lesson: {
					lesson: null,
					error: null,
					loading: true,
				},
			}
		case ID_SUCCESS:
			return {
				...state,
				lesson: {
					lesson: payload.data,
					error: null,
					loading: false,
				},
			}
		case ID_FAILURE:
			error = payload || { message: payload.message }
			return {
				...state,
				lesson: {
					lesson: null,
					error,
					loading: false,
				},
			}
		default:
			return state
	}
}

export const fetchAllChapters = function () {
	return {
		type: CHAPTERS_REQUEST,
	}
}
export const fetchAllLessons = function () {
	return {
		type: LESSONS_REQUEST,
	}
}
export const fetchEdtLessons = function () {
	return {
		type: EDIT_LESSON_REQUEST,
	}
}

export const deleteLesson = function (id) {
	console.log('de', id)
	return {
		type: DELETE_REQUEST,
		payload: { id },
	}
}

export const fetchTitleLessons = function (slug) {
	return {
		type: TITLE_REQUEST,
		payload: { slug },
	}
}
export function fetchTitleLessonsSuccess(titles) {
	return {
		type: TITLE_SUCCESS,
		payload: titles,
	}
}

export function fetchTitleLessonsFailure(error) {
	return {
		type: TITLE_FAILURE,
		payload: error,
	}
}

export const addChapter = function (data) {
	return {
		type: ADD_CHAPTERS_REQUEST,
		payload: data,
	}
}
export const addLesson = function (data) {
	return {
		type: ADD_LESSON_REQUEST,
		payload: data,
	}
}

export function fetchLessonSlug(slug) {
	return {
		type: LESSON_REQUEST,
		payload: { slug },
	}
}
function fetchLesson(slug) {
	return axios.get(`/api/lesson/${slug}`)
}

export function fetchLessonSuccess(article) {
	return {
		type: LESSON_SUCCESS,
		payload: article,
	}
}

export function fetchLessonFailure(error) {
	return {
		type: LESSON_FAILURE,
		payload: error,
	}
}
export function fetchLessonEdit(id) {
	console.log('edt', id)
	return {
		type: ID_REQUEST,
		payload: { id },
	}
}

export function fetchLessonEditSuccess(article) {
	return {
		type: ID_SUCCESS,
		payload: article,
	}
}

export function fetchLessonEditFailure(error) {
	return {
		type: ID_FAILURE,
		payload: error,
	}
}

export function LessonEditId(id, title, texthort, textf) {
	return {
		type: UPDATE_LESSON_REQUEST,
		payload: { id, title, texthort, textf },
	}
}

function fetchTitleLesson(slug) {
	return axios.get(`/api/chapter/${slug}`)
}
function fetchLessonId(id) {
	return axios.get(`http://localhost:4001/api/lesson/${id}/edit`)
}

export const fetchChapters = () =>
	axios
		.get('/api/chapter', {
			headers: [],
		})
		.then((response) => response.data)

export function fetchChaptersSuccess(chapters) {
	return {
		type: CHAPTERS_SUCCESS,
		payload: chapters,
	}
}

export function fetchChaptersFailure(error) {
	return {
		type: CHAPTERS_FAILURE,
		payload: error,
	}
}

const getChapters = function* () {
	try {
		const resp = yield call(fetchChapters)

		yield put(fetchChaptersSuccess(resp))
	} catch (error) {
		yield put({ type: CHAPTERS_FAILURE, payload: error })
	}
}

export const fetchLessonIdSaga = function* () {
	while (true) {
		try {
			const action = yield take(ID_REQUEST)
			const resp = yield call(fetchLessonId, action.payload.id)

			yield put(fetchLessonEditSuccess(resp))
		} catch (error) {
			yield put({ type: ID_FAILURE, payload: error })
		}
	}
}

export const fetchTitleLessonsSlugSaga = function* () {
	while (true) {
		try {
			const action = yield take(TITLE_REQUEST)
			yield call(getChapters)
			const resp = yield call(fetchTitleLesson, action.payload.slug)
			yield put(fetchTitleLessonsSuccess(resp.data))
		} catch (err) {
			yield put({ type: TITLE_FAILURE, payload: err.response.data })
		}
	}
}
export const addChapterSaga = function* () {
	while (true) {
		const action = yield take(ADD_CHAPTERS_REQUEST)

		try {
			const response = yield axios.post('/api/addchapter', action.payload)

			yield put({
				type: ADD_CHAPTERS_SUCCESS,
				payload: { response },
			})

			yield put(push('/lessons'))
		} catch (err) {
			yield put({ type: ADD_CHAPTERS_FAILURE, payload: err.response })
		}
	}
}

export const addLessonSaga = function* () {
	while (true) {
		const action = yield take(ADD_LESSON_REQUEST)

		try {
			const response = yield axios.post('/api/addlesson', action.payload)
			console.log('reduc add2')
			yield put({
				type: ADD_LESSON_SUCCESS,
				payload: { response },
			})
			console.log('reduc add3', response)
			yield put(push('/lessons'))
		} catch (err) {
			yield put({ type: ADD_LESSON_FAILURE, payload: err.response })
		}
	}
}

export const deleteLessonSaga = function* () {
	while (true) {
		const action = yield take(DELETE_REQUEST)

		try {
			const response = yield axios.post(
				`http://localhost:4001/api/lesson/${action.payload.id}/delete`,
				action.payload.id
			)

			yield put({
				type: DELETE_SUCCESS,
				payload: { response },
			})

			yield put(push('/lessons'))
		} catch (err) {
			yield put({ type: DELETE_FAILURE, payload: err.response })
		}
	}
}

export const fetchLessons = () =>
	axios
		.get(`api/lessons`, {
			headers: [],
		})
		.then((response) => response.data)

export const fetchEditLessons = () =>
	axios
		.get('http://localhost:4001/api/edit', {
			headers: [],
		})
		.then((response) => response.data)

export function fetchEditLessonsSuccess(chapters) {
	return {
		type: EDIT_LESSON_SUCCESS,
		payload: chapters,
	}
}

export function fetchEditLessonsFailure(error) {
	return {
		type: EDIT_LESSON_FAILURE,
		payload: error,
	}
}

export function fetchLessonsSuccess(chapters) {
	return {
		type: LESSONS_SUCCESS,
		payload: chapters,
	}
}

export function fetchLessonsFailure(error) {
	return {
		type: LESSONS_FAILURE,
		payload: error,
	}
}

export const fetchEditLessonsSaga = function* () {
	while (true) {
		try {
			yield take(EDIT_LESSON_REQUEST)
			const resp = yield call(fetchEditLessons)
			yield put(fetchEditLessonsSuccess(resp))
		} catch (error) {
			yield put({ type: EDIT_LESSON_FAILURE, payload: error })
		}
	}
}
export const fetchLessonsSaga = function* () {
	while (true) {
		try {
			yield take(LESSONS_REQUEST)
			const resp = yield call(fetchLessons)
			yield put(fetchLessonsSuccess(resp))
		} catch (error) {
			yield put({ type: LESSONS_FAILURE, payload: error })
		}
	}
}

export const fetchChaptersSaga = function* () {
	while (true) {
		try {
			yield take(CHAPTERS_REQUEST)
			yield call(getChapters)
			const resp = yield call(fetchChapters)

			yield put(fetchChaptersSuccess(resp))
		} catch (error) {
			yield put({ type: CHAPTERS_FAILURE, payload: error })
		}
	}
}

export const fetchLessonSlugSaga = function* () {
	while (true) {
		try {
			const action = yield take(LESSON_REQUEST)
			//	yield call(getChapters)
			const resp = yield call(fetchLesson, action.payload.slug)
			yield put(fetchLessonSuccess(resp.data))
		} catch (err) {
			yield put({ type: LESSON_FAILURE, payload: err.response.data })
		}
	}
}

export const updateLessonSaga = function* () {
	while (true) {
		const action = yield take(UPDATE_LESSON_REQUEST)

		try {
			const response = yield axios.post(
				'http://localhost:4001/api/lesson/:id/update',
				action.payload
			)

			yield put({
				type: UPDATE_LESSON_SUCCESS,
				payload: { response },
			})

			yield put(push('/actLesson'))
		} catch (err) {
			yield put({ type: UPDATE_LESSON_FAILURE, payload: err.response })
		}
	}
}

export function* saga() {
	yield all([
		fetchChaptersSaga(),
		addChapterSaga(),
		addLessonSaga(),
		fetchLessonsSaga(),

		fetchLessonSlugSaga(),
		fetchTitleLessonsSlugSaga(),
		fetchEditLessonsSaga(),
		deleteLessonSaga(),
		fetchLessonIdSaga(),
		updateLessonSaga(),
	])
}
