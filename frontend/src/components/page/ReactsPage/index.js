/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactArticleList from './ReactArticleList'
import Error from '../../utils/Error'

import spinner from '../../spinner.gif'

import { fetchAllArticlesReact } from '../../../ducks/reactArticles'
/* eslint-disable react-hooks/exhaustive-deps */
const ReactsPage = ({
	articles: { posts, loading, error },
	fetchAllArticlesReact,
}) => {
	useEffect(() => {
		fetchAllArticlesReact()
	}, [fetchAllArticlesReact])

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
}

function mapStateToProps(state) {
	return { articles: state.reactarticles }
}
export default connect(mapStateToProps, { fetchAllArticlesReact })(ReactsPage)
