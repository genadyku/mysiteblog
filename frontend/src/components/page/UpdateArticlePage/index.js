import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchArticleId } from '../../../ducks/articles'
import UpdateArticleForm from './UpdateArticleForm'

const UpdateArticlePage = ({
	match,
	fetchArticleId,
	article: { post, loading },
}) => {
	const styles = {
		marginTop: '20px',
	}

	const { slug } = match.params
	useEffect(() => {
		fetchArticleId(slug)
	}, [fetchArticleId, slug])

	return !loading && post ? (
		<div className='container' style={styles}>
			<div className='row'>
				<div className='col-lg-5 col-md-7 mx-auto'>
					<h3 className='text-center mb-3'>Редактироваь статью</h3>
					<h5>{post.title}</h5>
					<UpdateArticleForm post={post} />
				</div>
			</div>
		</div>
	) : (
		<div>loading</div>
	)
}

function mapStateToProps(state) {
	return { article: state.articles }
}

export default connect(mapStateToProps, { fetchArticleId })(UpdateArticlePage)
