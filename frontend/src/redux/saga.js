import { all } from 'redux-saga/effects'
import { saga as articlesSaga } from '../ducks/articles'
import { saga as articlesReactSaga } from '../ducks/reactArticles'
import { saga as lessonSaga } from '../ducks/lesson'
import { saga as autSaga } from '../ducks/auth'
import { saga as setPasswSaga } from '../ducks/resetpsw'

export default function* rootSaga() {
	yield all([
		articlesSaga(),
		articlesReactSaga(),
		lessonSaga(),
		autSaga(),
		setPasswSaga(),
	])
}
