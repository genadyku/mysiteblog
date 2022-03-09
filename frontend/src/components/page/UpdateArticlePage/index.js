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
					<h3 className='text-center mb-3'>Редактировать статью</h3>
					<UpdateArticleForm post={post} />
				</div>
			</div>
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
