import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ChapterList from './ChapterList'

import { fetchAllLessons } from '../../../ducks/lesson'

const ChaptersPage = ({ lessons: { lessons, loading }, fetchAllLessons }) => {
	useEffect(() => {
		fetchAllLessons()
	}, [fetchAllLessons])

	return !loading && lessons && lessons.length > 0 ? (
		<div className='wraper'>
			<main className='main'>
				<div className='lesson'>
					<h4 className='lesson-part'>Язык программирования JavaScript</h4>
					<ChapterList lessons={lessons} />
				</div>
			</main>
		</div>
	) : (
		<div className='wraper'>
			<main className='main'>
				<div className='main-row'>
					<div className='spinner' />
				</div>
			</main>
		</div>
	)
}

function mapStateToProps(state) {
	return { lessons: state.lesson }
}
export default connect(mapStateToProps, { fetchAllLessons })(ChaptersPage)
