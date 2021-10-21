import React from 'react'
import TitleLessonItem from './TitleLessonItem'

const TitleLessonList = ({ chapters: { lessons } }) => {
	console.log('2')
	return lessons ? (
		<div className='title-lesson'>
			{lessons.map((item) => (
				<TitleLessonItem chapters={item} key={item._id} />
			))}
		</div>
	) : null
}
export default TitleLessonList
