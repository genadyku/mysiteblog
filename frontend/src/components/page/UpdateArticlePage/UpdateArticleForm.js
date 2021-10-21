import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { updateArticle } from '../../../ducks/articles'

const UpdateArticleForm = ({ post, updateArticle }) => {
	const [edtarticle, setEdtarticle] = useState(post)

	const handleChange = (e) => {
		setEdtarticle({ ...edtarticle, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		updateArticle(edtarticle)
	}

	const { title, titleShort, slug, textf } = edtarticle

	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Название раздела* </label>
				<input
					type='text'
					name='title'
					className='form-control'
					onChange={handleChange}
					defaultValue={title}
				/>
			</div>
			<div className='form-group'>
				<label>Краткое описание раздела* </label>
				<input
					type='text'
					name='titleShort'
					className='form-control'
					onChange={handleChange}
					defaultValue={titleShort}
				/>
			</div>
			<div className='form-group'>
				<label>Ссылка*</label>
				<input
					type='text'
					name='slug'
					className='form-control'
					onChange={handleChange}
					defaultValue={slug}
				/>
			</div>

			<div className='form-group'>
				<label>Ссылка*</label>
				<textarea
					cols='80'
					rows='50'
					name='textf'
					onChange={handleChange}
					defaultValue={textf}
				/>
			</div>

			<div className='commit'>
				<div className='row'>
					<div className='col-8'>
						<button type='submit' className='btn btn-primary'>
							Сохранить
						</button>
						<Link to='/' className='btn btn-error'>
							{' '}
							Отмена
						</Link>
					</div>
				</div>
			</div>
		</form>
	)
}

function mapStateToProps(state) {
	return { article: state.articles }
}

export default connect(mapStateToProps, { updateArticle })(UpdateArticleForm)
