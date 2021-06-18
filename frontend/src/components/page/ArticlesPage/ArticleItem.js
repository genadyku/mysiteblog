import React from 'react'
import { Link } from 'react-router-dom'

import { getImageByKey } from '../../utils/getImageByKey'

const ArticleItem = ({ article }) => (
	<>
		<div className='row header'>
			<div className='col-lg-1'>
				<Link to={`article/${article.slug}`}>
					<img
						className='img-logo'
						src={getImageByKey(article.type)}
						alt='logo'
					/>
				</Link>
			</div>
			<div className='col-lg-11'>
				<li key={article._id}>
					<Link style={{ color: 'blue' }} to={`article/${article.slug}`}>
						<h6 className='list-group-item-heading'>{article.title}</h6>
					</Link>

					{article.titleShort + article.type}
				</li>
			</div>
		</div>
		<hr />
	</>
)

export default ArticleItem
