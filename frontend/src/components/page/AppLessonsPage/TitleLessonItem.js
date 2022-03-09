import React from 'react'
import { Link } from 'react-router-dom'

const TitleLessonItem = ({ chapters: { title, _id, slug, num } }) => (
	<li className='lessol-list-item' key={_id}>
		<Link to={`/lesson/${slug}`}>
			<h6 className='lesson-list__lesson'>
				{num} {title}
			</h6>
		</Link>
	</li>
)

export default TitleLessonItem
