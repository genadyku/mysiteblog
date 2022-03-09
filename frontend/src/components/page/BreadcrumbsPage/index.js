import React from 'react'
import { Link } from 'react-router-dom'

const BreadcrumbsPage = () => (
	<div className='lesson-list__header' role='presentation'>
		<Link to='/lessons'>
			<i className='fas fa-home' />
		</Link>
	</div>
)

export default BreadcrumbsPage
