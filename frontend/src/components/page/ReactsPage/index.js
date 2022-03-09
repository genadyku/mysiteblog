/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactArticleList from './ReactArticleList'
import Error from '../../utils/Error'

// import spinner from '../../spinner.gif'

import { fetchAllArticlesReact } from '../../../ducks/reactArticles'

const ReactsPage = ({
	articles: { posts, loading, error },
	fetchAllArticlesReact,
}) => {
	useEffect(() => {
		fetchAllArticlesReact()
	}, [fetchAllArticlesReact])
	const renderPage = (posts, loading, error) => {
		if (!loading && posts.length > 0) {
			return <ReactArticleList articles={posts} />
		}
		if (error) {
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
					</div>
				</main>
			</div>
		)
	}

	return renderPage(posts, loading, error)

	/*
	return (


		
		<>
			{loading ? (
				<div className='container'>
					<div className='row'>
						<img src={spinner} alt='Loading...' />
					</div>
				</div>
			) : error ? (
				<div className='container'>
					<div className='row'>
						{error && <Error text={error.message} code={error.status} />}
					</div>
				</div>
			) : (
				<>
					<section>
						<div className='container'>
							<div className='row header'>
								<div>
									<ReactArticleList articles={posts} />
								</div>
							</div>
						</div>
					</section>
				</>
			)}
		</>
		
	)
	*/
}

function mapStateToProps(state) {
	return { articles: state.reactarticles }
}
export default connect(mapStateToProps, { fetchAllArticlesReact })(ReactsPage)
