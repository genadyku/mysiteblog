import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { connectRouter } from 'connected-react-router'
import articleReducer, { moduleName } from '../ducks/articles'
import signinReducer, { moduleName as authModule } from '../ducks/auth'
import reactarticlesReducer, { moduleNameR } from '../ducks/reactArticles'
import lessonReducer, { moduleNameL } from '../ducks/lesson'
import setPasswReducer, { moduleNameSet } from '../ducks/resetpsw'

const rootReducer = (history) =>
	combineReducers({
		form,

		[moduleName]: articleReducer,
		[moduleNameR]: reactarticlesReducer,
		[moduleNameL]: lessonReducer,
		[authModule]: signinReducer,
		[moduleNameSet]: setPasswReducer,
		router: connectRouter(history),
	})

export default rootReducer
