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
	const renderPage = (post, loading, error) => {
		if (!loading && post) {
			return (
				<div className='wraper'>
					<main className='main'>
						<div className='main-row'>
							<div className='post'>
								<h4>{post.titleShort}</h4>
								<div className='post-code'>
									{' '}
									<Code text={post.textf} />
								</div>
							</div>
						</div>
					</main>
				</div>
			)
		}
		if (error) {
			return <Error text={error.message} code={error.error.statusCode} />
		}
		return (
			<div className='wraper'>
				<main className='main'>
					<div className='main-row'>
						<div className='spinner' />
					</div>
				</main>
			</div>
		)
	}

	return renderPage(post, loading, error)
}

export default connect((state) => ({ articles: state.reactarticles }), {
	fetchArticleReactId,
})(ReactPage)
