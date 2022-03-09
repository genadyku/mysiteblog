import React from 'react'
import { Link } from 'react-router-dom'

const LessonItem = ({ lesson }) => (
	<li className='list-sub__text' key={lesson._id}>
		{lesson.num}
		<Link style={{ marginLeft: '24px' }} to={`lesson/${lesson.slug}`}>
			{lesson.title}
		</Link>
	</li>
)
export default LessonItem
