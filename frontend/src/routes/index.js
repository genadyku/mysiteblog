import React from 'react'
import { Route, Switch } from 'react-router'

import NavigationPage from '../components/page/NavigationPage'

import HomePage from '../components/page/HomePage'
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
import AddArticlePage from '../components/page/AddArticlePage'
import AddLessonPage from '../components/page/addLessonPage'
import EditArticlesPage from '../components/page/EditArticlesPage'
import UpdateArticlePage from '../components/page/UpdateArticlePage'

import NotFound from '../components/commons/NotFound'
// import FooterPage from '../components/page/FooterPage'
// import styles from '../../style/index.css'

const routes = (
	<>
		<NavigationPage />
		<Switch>
			<Route exact path='/' component={HomePage} />
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
			<Route exact path='/addArticle' component={AddArticlePage} />
			<Route exact path='/editArticles' component={EditArticlesPage} />
			<Route exact path='/addLesson' component={AddLessonPage} />
			<Route exact path='/updateArticle/:slug' component={UpdateArticlePage} />
			<Route component={NotFound} />
		</Switch>
	</>
)

export default routes
