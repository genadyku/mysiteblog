import React from 'react'
import { Link } from 'react-router-dom'

const LessonSidebarPage = ({ chapter_id, chapter_slug, chapter1 }) => (
	<div className='sidebar-inner'>
		<div className='sidebar-content'>
			<ul className='sidebar-nav-links'>
				<h5 className='sidebar__section-title'>Разделы</h5>
				<li className='sidebar-nav-link' key={chapter_id}>
					<Link to={`/chapter/${chapter_slug}`}>{chapter1}</Link>
				</li>
			</ul>
		</div>
	</div>
)

export default LessonSidebarPage
