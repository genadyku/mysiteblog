import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ChaptersList from './ChaptersList'

import spinner from '../../spinner.gif'

import { fetchAllLessons } from '../../../ducks/lesson'

const ChaptersPage = ({ lessons: { lessons, loading }, fetchAllLessons }) => {
	useEffect(() => {
		fetchAllLessons()
	}, [fetchAllLessons])

	return loading && lessons ? (
		<section>
			<div className='container'>
				<div className='row'>
					<div className='lesson-content'>
						<h4>Язык программирования JavaScript</h4>
						<div className='frontpage-content__part'>Часть первая</div>
						<ChaptersList lessons={lessons} />
					</div>
				</div>
			</div>
		</section>
	) : (
		<div className='container'>
			<div className='row'>
				<img src={spinner} alt='Loading...' />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return { lessons: state.lesson }
}
export default connect(mapStateToProps, { fetchAllLessons })(ChaptersPage)
