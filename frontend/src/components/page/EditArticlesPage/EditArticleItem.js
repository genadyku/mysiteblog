import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { deleteArticle } from '../../../ducks/articles'
import { getImageByKey } from '../../utils/getImageByKey'

import Modal from '../../commons/components/Modal'

class EditArticleItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			active: false,
		}
	}

	showModal = () => {
		this.setState({ active: true })
	}

	hideModal = () => {
		this.setState({ active: false })
	}

	DeletePost = () => {
		this.setState({ active: false })
		this.props.deleteArticle(this.props.article._id)
	}

	handleEdit = () => {
		console.log('edit')
	}

	render() {
		const { article } = this.props

		return (
			<>
				<Modal
					show={this.state.active}
					handleClose={this.hideModal}
					handleDelete={this.DeletePost}
				>
					<h4 className='header-delete'>Удаление статьи</h4>
					<p className='header-text'>Вы действительно хотите удалить статью</p>
				</Modal>
				<div className='main-row-edit'>
					<div className='main-row-edit__img'>
						<Link to={`updateArticle/${article.slug}`}>
							<img
								className='img-ico'
								src={getImageByKey(article.type)}
								alt='logo'
							/>
						</Link>
					</div>
					<div className='main-row-edit-content'>
						<li key={article._id}>
							<Link style={{ color: 'blue' }} to={`article/${article.slug}`}>
								<h6 className='main-row-edit__header'>{article.title}</h6>
							</Link>
							<span className='main-row-edit__text'>{article.titleShort}</span>
						</li>
					</div>
					<div className='editupd' role='presentation'>
						<Link style={{ color: 'red' }} to='addArticle'>
							{' '}
							<i className='fa fa-solid  fa-plus fa-2x img-ico-edt' />
						</Link>
					</div>

					<div className='editupd' role='presentation'>
						<Link
							style={{ color: 'green' }}
							to={`updateArticle/${article.slug}`}
						>
							{' '}
							<i className='fa fa-pen fa-2x img-ico-edt' />
						</Link>
					</div>

					<div className='editupd' onClick={this.showModal} role='presentation'>
						<i className='fa fa-trash fa-2x img-ico-edt'> </i>
					</div>
				</div>
				<hr />
			</>
		)
	}
}
export default connect(null, { deleteArticle })(EditArticleItem)
