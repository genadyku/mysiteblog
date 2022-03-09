import React from 'react'

import ArticleItem from './ArticleItem'

const ArticleList = ({ articles }) => (
	<div className='wraper'>
		<main className='main'>
			{articles.map((article) => (
				<ArticleItem article={article} key={article._id} />
			))}
		</main>
	</div>
)

export default ArticleList
