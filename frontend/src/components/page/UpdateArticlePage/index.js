import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchArticleId } from '../../../ducks/articles'
import UpdateArticleForm from './UpdateArticleForm'
import spinner from '../../spinner.gif'

const UpdateArticlePage = ({
	match,
	fetchArticleId,
	article: { post, loading },
}) => {
	const { slug } = match.params
	useEffect(() => {
		fetchArticleId(slug)
	}, [fetchArticleId, slug])

	return !loading && post ? (
		<div className='wraper'>
			<main className='main'>
				<div className='main-row'>
					<div className='wraper-left'>
						<div className='wraper-update'>
							<h3>Редактировать статью</h3>
							<UpdateArticleForm post={post} />
						</div>
					</div>
				</div>
			</main>
		</div>
	) : (
		<div className='container'>
			<div className='row'>
				<img src={spinner} alt='Loading...' />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return { article: state.articles }
}

export default connect(mapStateToProps, { fetchArticleId })(UpdateArticlePage)
