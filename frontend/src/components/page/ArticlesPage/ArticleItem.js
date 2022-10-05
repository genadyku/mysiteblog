import React from 'react'
import { Link } from 'react-router-dom'

import { getImageByKey } from '../../utils/getImageByKey'

const ArticleItem = ({ article }) => (
	<div className='main-row'>
		<div className='main-row__img'>
			<Link to={`article/${article.slug}`}>
				<img className='img-ico' src={getImageByKey(article.type)} alt='logo' />
			</Link>
		</div>
		<div className='main-row-content'>
			<li className='main-row__header' key={article._id}>
				<Link to={`article/${article.slug}`}>
					<h6>{article.title}</h6>
				</Link>

				<span className='main-row__text'>{article.titleShort}</span>
			</li>
		</div>
	</div>
)

export default ArticleItem
