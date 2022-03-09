import React from 'react'

import SidebarItem from './SidebarItem'

const SidebarPage = ({ chapter1: { chapters } }) => (
	<ul>
		<h5 className='sidebar-title'>Разделы</h5>
		{chapters.map((item) => (
			<SidebarItem chapters={item} key={item._id} />
		))}
	</ul>
)

export default SidebarPage
