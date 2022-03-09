import React from 'react'

import ReactArticleItem from './ReactArticleItem'

const ReactArticleList = ({ articles }) => (
	<div className='wraper'>
		<main className='main'>
			{articles.map((article) => (
				<ReactArticleItem article={article} key={article._id} />
			))}
		</main>
	</div>
)

export default ReactArticleList
