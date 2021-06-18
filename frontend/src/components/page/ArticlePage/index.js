import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchArticleId } from '../../../ducks/articles'
import spinner from '../../spinner.gif'

const ArticlePage = ({ match, article: { post, loading }, fetchArticleId }) => {
	const { slug } = match.params

	useEffect(() => {
		fetchArticleId(slug)
	}, [fetchArticleId, slug])

	return loading ? (
		<div className='container'>
			<div className='row'>
				<img src={spinner} alt='Loading...' />
			</div>
		</div>
	) : (
		<section>
			<div className='container '>
				<div className='row header'>
					<div className='articles-id'>
						<h4 className='list-group-item-heading'>{post.titleShort}</h4>
						<div className='post'>{post.textf}</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function mapStateToProps(state) {
	return { article: state.articles }
}

export default connect(mapStateToProps, { fetchArticleId })(ArticlePage)
