import React from 'react'
import TitleLessonItem from './TitleLessonItem'

const TitleLessonList = ({ chapters: { lessons } }) =>
	lessons ? (
		<div>
			{lessons.map((item) => (
				<TitleLessonItem chapters={item} key={item._id} />
			))}
		</div>
	) : null

export default TitleLessonList
