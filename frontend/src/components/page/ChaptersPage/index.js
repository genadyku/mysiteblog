import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ChapterList from './ChapterList'

import spinner from '../../spinner.gif'

import { fetchAllLessons } from '../../../ducks/lesson'

const ChaptersPage = ({ lessons: { lessons, loading }, fetchAllLessons }) => {
	useEffect(() => {
		fetchAllLessons()
		console.log('less-fenth:')
	}, [fetchAllLessons])

	return loading && lessons && lessons.length > 0 ? (
		<section>
			<div className='container'>
				<div className='row'>
					<div className='lesson-content'>
						<h4>Язык программирования JavaScript</h4>
						<div className='frontpage-content__part'>Часть первая</div>
						<ChapterList lessons={lessons} />
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
