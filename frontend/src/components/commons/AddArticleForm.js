/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import renderField from './renderField'
import renderTextArea from './renderTextArea'
import renderSelect from './renderSelect'
import { addArticle } from '../../ducks/articles'

class AddArticeForm extends Component {
	constructor(props) {
		super(props)

		this.onSubmit = this.onSubmit.bind(this)
	}

	handleChange(e) {
		const value = e.target.value
		console.log('select:', value)
	}

	onSubmit(values) {
		this.props.addArticle(values)
	}

	render() {
		const { handleSubmit } = this.props

		const types = [
			{ value: 'sql', key: '1' },
			{ value: 'javascript', key: '2' },
			{ value: 'css', key: '3' },
			{ value: 'nodejs', key: '4' },
			{ value: 'reactjs', key: '5' },
		]

		return (
			<div className='add-article'>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<Field
						name='type'
						type='select'
						component={renderSelect}
						label='Тип*'
						className='form-control'
						onChange={this.handleChange}
					>
						{types.map((item) => (
							<option value={item.value} key={item.key}>
								{item.value}
							</option>
						))}
					</Field>
					<Field
						name='title'
						type='text'
						component={renderField}
						label='Название раздела*'
					/>
					<Field
						name='titleShort'
						type='text'
						component={renderField}
						label='Краткое описание раздела*'
					/>
					<Field
						name='slug'
						type='text'
						component={renderField}
						label='Ссылка*'
					/>

					<Field
						name='textf'
						component={renderTextArea}
						type='text'
						label='Содержание статьи'
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
}
// const validate = (props) => {
// 	const errors = {}
// 	const fields = ['slug', 'title', 'titleShort', 'textf']

// 	fields.forEach((f) => {
// 		if (!(f in props)) {
// 			errors[f] = `Заполните поле `
// 		}
// 	})

// 	return errors
// }
const validate = (values) => {
	const errors = {}
	if (!values.slug) {
		errors.username = 'Заполните поле'
	}
	if (!values.title) {
		errors.title = 'Заполните поле'
	}
	if (!values.titleShort) {
		errors.titleShort = 'Заполните поле'
	}
	if (!values.textf) {
		errors.textf = 'Заполните поле'
	}

	return errors
}

export default reduxForm({
	form: 'add',
	validate,
})(connect(null, { addArticle })(AddArticeForm))
