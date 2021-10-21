import React from 'react'

import ReactArticleItem from './ReactArticleItem'

const ReactArticleList = ({ articles }) => (
	<div>
		{articles.map((article) => (
			<ReactArticleItem article={article} key={article._id} />
		))}
	</div>
)

export default ReactArticleList
