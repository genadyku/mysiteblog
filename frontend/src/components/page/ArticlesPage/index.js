import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ArticleList from './ArticleList'
import Error from '../../utils/Error'
import { fetchAllArticles } from '../../../ducks/articles'
// import spinner from '../../spinner.gif'

const ArticlesPage = ({
	articles: { posts, loading, error },
	fetchAllArticles,
}) => {
	const search = location.search.substring(location.search.indexOf('=') + 1)
	console.log('search:', search)
	useEffect(() => {
		fetchAllArticles(search)
	}, [fetchAllArticles, search])

	function renderPage(posts, loading, error) {
		if (!loading && posts !== null) {
			return <ArticleList articles={posts} />
		}
		if (error) {
			console.log('err:', error)
			return <Error text={error.message} code={error.statusCode} />
		}

		return (
			<div className='wraper'>
				<main className='main'>
					<div className='main-row'>
						<div className='spiner-img' />
						<div className='spiner-contents'>
							<ul>
								<li />
								<li />
							</ul>
						</div>
						{/* <div className='loadingspinner' /> */}
					</div>
				</main>
			</div>
		)
	}

	return renderPage(posts, loading, error)
}

function mapStateToProps(state) {
	return { articles: state.articles }
}
export default connect(mapStateToProps, { fetchAllArticles })(ArticlesPage)
