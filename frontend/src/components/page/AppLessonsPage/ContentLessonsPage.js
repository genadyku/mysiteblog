import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import TitleLessonList from './TitleLessonList'

import { fetchTitleLessons } from '../../../ducks/lesson'

const ContentLessonsPage = ({
	slug,
	fetchTitleLessons,
	lessons: { lesson },
}) => {
	useEffect(() => {
		fetchTitleLessons(slug)
	}, [fetchTitleLessons, slug])
	return (
		<section>
			<div className='container'>
				<h2>ll </h2>
				<div className='row'>
					<div className='articles-full'>
						<TitleLessonList lessons={lesson} />
					</div>
				</div>
			</div>
		</section>
	)
}

function mapStateToProps(state) {
	return { lessons: state.lesson.lessons }
}
export default connect(mapStateToProps, { fetchTitleLessons })(
	ContentLessonsPage
)
