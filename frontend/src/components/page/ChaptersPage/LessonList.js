import React from 'react'

import LessonItem from './LessonItem'

const LessonList = ({ lessons }) => (
	<div className='lesson-list'>
		<ul>
			{lessons.map((lesson) => (
				<LessonItem lesson={lesson} key={`${lesson._id}`} />
			))}
		</ul>
	</div>
)

export default LessonList
