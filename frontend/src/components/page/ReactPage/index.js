import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Prism from 'prismjs'

import 'prismjs/themes/prism.css'

import Code from '../../utils/Code'
import { fetchArticleReactId } from '../../../ducks/reactArticles'
import Error from '../../utils/Error'
/* eslint-disable react-hooks/exhaustive-deps */
const ReactPage = ({
	match,
	articles: { post, loading, error },
	fetchArticleReactId,
}) => {
	const { slug } = match.params

	useEffect(() => {
		fetchArticleReactId(slug)
		Prism.highlightAll()
	}, [fetchArticleReactId, slug])

	return !loading ? (
		<div className='container'>
			<div className='row header'>
				<div className='articles-id'>
					<h4 className='list-group-item-heading'>{post.title}</h4>
					<Code text={post.textf} />
				</div>
			</div>
		</div>
	) : (
		<div className='container'>
			<div className='row'>
				{error && <Error text={error.message} code={error.error.statusCode} />}
			</div>
		</div>
	)
}

export default connect((state) => ({ articles: state.reactarticles }), {
	fetchArticleReactId,
})(ReactPage)
