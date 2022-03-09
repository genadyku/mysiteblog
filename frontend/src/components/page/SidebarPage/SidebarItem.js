import React from 'react'
import { Link } from 'react-router-dom'

const SidebarItem = ({ chapters: { chapter_id, slug, chapter1 } }) => (
	<li key={chapter_id}>
		<Link to={`/chapter/${slug}`}>{chapter1}</Link>
	</li>
)
export default SidebarItem
