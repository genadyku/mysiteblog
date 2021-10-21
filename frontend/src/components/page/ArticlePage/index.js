import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Prism from 'prismjs'
import { fetchArticleId } from '../../../ducks/articles'

import Code from '../../utils/Code'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-sql'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import spinner from '../../spinner.gif'

const ArticlePage = ({ match, article: { post, loading }, fetchArticleId }) => {
	const { slug } = match.params

	useEffect(() => {
		fetchArticleId(slug)
		Prism.highlightAll()
	}, [fetchArticleId, slug])

	return loading ? (
		<div>
			<img src={spinner} alt='Loading...' />
		</div>
	) : (
		<section>
			<div className='container '>
				<div className='row header'>
					<div className='articles-id'>
						<h4 className='list-group-item-heading'>{post.titleShort}</h4>
						<div className='post'>
							{' '}
							<Code text={post.textf} />
						</div>
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
