import React from 'react'
import { Link } from 'react-router-dom'

import LessonList from './LessonList'

const ChapterItem = ({ chapter: { chapter1, _id, slug }, lessons }) => (
	<div>
		<li className='lessons-nav-link' key={_id}>
			<Link to={`/chapter/${slug}`}>{chapter1}</Link>
		</li>
		<LessonList lessons={lessons} />
	</div>
)

export default ChapterItem
