import React from 'react'

import EditArticleItem from './EditArticleItem'

const EditArticleList = ({ articles }) => (
	<>
		{articles.map((article) => (
			<EditArticleItem article={article} key={article._id} />
		))}
	</>
)

export default EditArticleList
