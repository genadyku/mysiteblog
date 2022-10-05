import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Prism from 'prismjs'
import { fetchArticleId } from '../../../ducks/articles'
import Error from '../../utils/Error'
import Code from '../../utils/Code'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-sql'
import 'prismjs/plugins/line-numbers/prism-line-numbers'

const ArticlePage = ({
	match,
	article: { post, loading, error },
	fetchArticleId,
}) => {
	const { slug } = match.params

	useEffect(() => {
		fetchArticleId(slug)
		Prism.highlightAll()
	}, [fetchArticleId, slug])

	const renderPage = (post, loading, error) => {
		if (!loading && post) {
			return (
				<div className='wraper'>
					<main className='main'>
						<div className='main-row'>
							<div className='post'>
								<h4>{post.title}</h4>
								<span className='main-row__text'>{post.titleShort}</span>
								<Code text={post.textf} />
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

function mapStateToProps(state) {
	return { article: state.articles }
}

export default connect(mapStateToProps, { fetchArticleId })(ArticlePage)
