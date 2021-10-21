import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import EditArticleList from './EditArticleList'

import { fetchAllArticles } from '../../../ducks/articles'
import spinner from '../../spinner.gif'

const EditArticlesPage = ({
	articles: { posts, loading },
	fetchAllArticles,
}) => {
	const search = location.search.substring(location.search.indexOf('=') + 1)

	useEffect(() => {
		fetchAllArticles(search)
	}, [fetchAllArticles, search])

	return loading ? (
		<div className='container'>
			<div className='row'>
				<img src={spinner} alt='Loading...' />
			</div>
		</div>
	) : (
		<section>
			<div className='container '>
				<EditArticleList articles={posts} />
			</div>
		</section>
	)
}

function mapStateToProps(state) {
	return { articles: state.articles }
}
// eslint-disable-next-line no-undef
export default connect(mapStateToProps, { fetchAllArticles })(EditArticlesPage)
