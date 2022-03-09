import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SidebarPage from '../SidebarPage'

import TitleLessonList from './TitleLessonList'
import Error from '../../utils/Error'

import { fetchTitleLessons } from '../../../ducks/lesson'

const AppLessonsPage = ({
	match,
	title: { title, loading, error },
	chapters,
	fetchTitleLessons,
}) => {
	const { slug } = match.params
	useEffect(() => {
		fetchTitleLessons(slug)
	}, [fetchTitleLessons, slug])

	const renderPage = (title, loading, error) => {
		if (!loading || title == null) {
			return (
				<div className='wraper'>
					<main className='main'>
						<div className='main-row'>
							<div className='loadingspinner' />
						</div>
					</main>
				</div>
			)
		}
		if (error) {
			return <Error text={error.message} code={error.statusCode} />
		}

		return (
			<div className='wraper'>
				<div className='chapter'>
					<div className='main-row'>
						<div className='sidebar'>
							<SidebarPage chapter1={chapters} />
						</div>
						<TitleLessonList chapters={title} />
					</div>
				</div>
			</div>
		)
	}
	return renderPage(title, loading, error)
}

function mapStateToProps(state) {
	return {
		title: state.lesson,
		chapters: state.lesson.lessons,
	}
}

export default connect(mapStateToProps, { fetchTitleLessons })(AppLessonsPage)
