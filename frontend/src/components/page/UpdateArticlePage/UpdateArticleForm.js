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
		<div className='upd-article'>
			<form onSubmit={handleSubmit}>
				<label>Название раздела* </label>
				<input
					type='text'
					name='title'
					className='upd-article__input'
					onChange={handleChange}
					defaultValue={title}
				/>

				<label>Краткое описание раздела* </label>
				<input
					type='text'
					name='titleShort'
					className='upd-article__input'
					onChange={handleChange}
					defaultValue={titleShort}
				/>

				<label>Ссылка*</label>
				<input
					type='text'
					name='slug'
					className='upd-article__input'
					onChange={handleChange}
					defaultValue={slug}
				/>

				<label>Содержание*</label>
				<textarea
					cols='120'
					rows='50'
					name='textf'
					onChange={handleChange}
					defaultValue={textf}
				/>
				<div className='main-row'>
					<button type='submit' className='regist-form__button'>
						Сохранить
					</button>
					<Link to='/' className='regist-form__nav'>
						{' '}
						Отмена
					</Link>
				</div>
			</form>
		</div>
	)
}

function mapStateToProps(state) {
	return { article: state.articles }
}

export default connect(mapStateToProps, { updateArticle })(UpdateArticleForm)
