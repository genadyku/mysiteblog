import React from 'react'
import { Link } from 'react-router-dom'

const TitleLessonItem = ({ chapters: { title, _id, slug, num } }) => (
	<li className='list-group-item' key={_id}>
		<Link to={`/lesson/${slug}`}>
			<h6 className='list-group-item-heading'>
				{num} {title}
			</h6>
		</Link>
	</li>
)

export default TitleLessonItem
