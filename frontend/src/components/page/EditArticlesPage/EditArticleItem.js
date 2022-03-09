import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteArticle } from '../../../ducks/articles'
import { getImageByKey } from '../../utils/getImageByKey'

class EditArticleItem extends Component {
	handleDetele = () => {
		this.props.deleteArticle(this.props.article._id)
	}

	handleEdit = () => {
		console.log('edit')
	}

	render() {
		const { article } = this.props

		return (
			<>
				<div className='row header'>
					<div className='col-lg-1'>
						<Link to={`updateArticle/${article.slug}`}>
							<img
								className='img-logo'
								src={getImageByKey(article.type)}
								alt='logo'
							/>
						</Link>
					</div>
					<div className='col-lg-9'>
						<li key={article._id}>
							<Link
								style={{ color: 'blue' }}
								to={`updateArticle/${article.slug}`}
							>
								<h6 className='list-group-item-heading'>{article.title}</h6>
							</Link>

							{article.titleShort + article.type}
						</li>
					</div>

					<div className='btnedit edit' role='presentation'>
						<Link
							style={{ color: 'blue' }}
							to={`updateArticle/${article.slug}`}
						>
							{' '}
							<i className='fa fa-pen' />
						</Link>
					</div>

					<div
						className='btnedit delete '
						onClick={this.handleDetele}
						role='presentation'
					>
						<i className='fa fa-trash'> </i>
					</div>
				</div>
				<hr />
			</>
		)
	}
}
export default connect(null, { deleteArticle })(EditArticleItem)
