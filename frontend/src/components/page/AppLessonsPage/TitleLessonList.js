import React from 'react'
import TitleLessonItem from './TitleLessonItem'
import BreadcrumbsPage from '../BreadcrumbsPage'

const TitleLessonList = ({ chapters: { lessons } }) =>
	lessons && lessons.length > 0 ? (
		<div className='main-row'>
			<div className='chapter-lesson'>
				<BreadcrumbsPage crumbs={lessons} />
				{lessons.map((item) => (
					<TitleLessonItem chapters={item} key={item._id} />
				))}
			</div>
		</div>
	) : null
export default TitleLessonList
