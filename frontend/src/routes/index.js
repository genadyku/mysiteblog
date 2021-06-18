import React from 'react'
import { Route, Switch } from 'react-router'

import NavigationPage from '../components/page/NavigationPage'

import Home from '../components/Home'
// import PrivateRoute from '../components/commons/PrivateRoute'
import ArticlesPage from '../components/page/ArticlesPage'
import ArticlePage from '../components/page/ArticlePage'
import ReactsPage from '../components/page/ReactsPage'
import ReactPage from '../components/page/ReactPage'
import ChaptersPage from '../components/page/ChaptersPage'
import LessonPage from '../components/page/LessonPage'
import AppLessonsPage from '../components/page/AppLessonsPage'
import SigninPage from '../components/page/SigninPage'
import SignupPage from '../components/page/SignupPage'
import ForgotPage from '../components/page/ForgotPage'

import AccountStatusPage from '../components/page/AccountStatusPage'
import VerifyEmailPage from '../components/page/VerifyEmailPage'
import ForgotStatusPage from '../components/page/ForgotStatusPage'
import ResetPasswordPage from '../components/page/ResetPasswordPage'

// import styles from '../../style/index.css'

const routes = (
	<div>
		<NavigationPage />
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/articles' component={ArticlesPage} />
			<Route exact path='/article/:slug' component={ArticlePage} />
			<Route exact path='/reacts' component={ReactsPage} />

			<Route exact path='/react/:slug' component={ReactPage} />
			<Route exact path='/chapter/:slug' component={AppLessonsPage} />
			<Route exact path='/lessons' component={ChaptersPage} />
			<Route exact path='/lesson/:slug' component={LessonPage} />
			<Route path='/signin' component={SigninPage} />
			<Route path='/signup' component={SignupPage} />
			<Route path='/forgot' component={ForgotPage} />
			<Route path='/account/status' component={AccountStatusPage} />
			<Route path='/resetpassword/status' component={ForgotStatusPage} />
			<Route path='/reset/:token' component={ResetPasswordPage} />
			<Route path='/verifymail' exact component={VerifyEmailPage} />
		</Switch>
	</div>
)

export default routes
