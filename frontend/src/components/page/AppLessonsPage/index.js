import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SidebarPage from './SidebarPage'

import TitleLessonList from './TitleLessonList'
import Error from '../../utils/Error'

import { fetchTitleLessons } from '../../../ducks/lesson'

const AppLessonsPage = ({
	match,
	title: { title, loading, error },
	fetchTitleLessons,
}) => {
	const { slug } = match.params
	useEffect(() => {
		fetchTitleLessons(slug)
	}, [fetchTitleLessons, slug])

	return loading && title._id ? (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col col-lg-2'>
					<SidebarPage
						chapter_id={title._id}
						chapter_slug={title.slug}
						chapter1={title.chapter1}
					/>
				</div>
				<div className='col col-lg-10'>
					<TitleLessonList chapters={title} />
				</div>
			</div>
		</div>
	) : (
		<div className='container'>
			<div className='row'>
				{error && <Error text={error.message} code={error.error.statusCode} />}
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		title: state.lesson,
	}
}

export default connect(mapStateToProps, { fetchTitleLessons })(AppLessonsPage)
