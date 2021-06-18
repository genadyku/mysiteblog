import React from 'react'

import ArticleItem from './ArticleItem'

const ArticleList = ({ articles }) => (
	<>
		{articles.map((article) => (
			<ArticleItem article={article} key={article._id} />
		))}
	</>
)

export default ArticleList
