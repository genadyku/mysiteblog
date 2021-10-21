/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { Link } from 'react-router-dom'

import renderField from './renderField'
import renderSelect from './renderSelect'
import renderTextArea from './renderTextArea'

import { fetchAllChapters, addLesson } from '../../ducks/lesson'

const divStyle = {
	color: '#d9534f',
}
class AddLessonForm extends Component {
	constructor(props) {
		super(props)

		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount() {
		this.props.fetchAllChapters()
	}

	handleChange(e) {
		const value = e.target.value
		console.log('select:', value)
	}

	onSubmit(values) {
		values.chapterId = this.props.idd
		this.props.addLesson(values)
	}

	render() {
		const error = this.props.errorMessage
		const { handleSubmit } = this.props
		const { chapters } = this.props.lessons

		return chapters ? (
			<div className='add-lesson'>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<Field
						name='chapter'
						type='select'
						component={renderSelect}
						label='Название раздела*'
						onChange={this.handleChange}
					>
						{chapters.map((item) => (
							<option value={item.chapter1} key={item._id}>
								{item.chapter1}
							</option>
						))}
					</Field>

					<Field
						name='num'
						type='text'
						component={renderField}
						label='Номер подраздела*'
					/>
					<Field
						name='title'
						type='text'
						component={renderField}
						label='Название подраздела*'
					/>
					<Field
						name='slug'
						type='text'
						component={renderField}
						label='Ссылка*'
					/>
					<Field
						name='titleShort'
						type='text'
						component={renderField}
						label='Краткое описание подраздела*'
					/>

					<Field
						name='textf'
						component={renderTextArea}
						type='text'
						label='Содержание урока'
					/>
					<div className='enter'>
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
					<div>{error && <div style={divStyle}>{error.message}</div>}</div>
				</form>
			</div>
		) : null
	}
}
const validate = (props) => {
	const errors = {}
	const fields = ['num', 'slug', 'title', 'titleShort', 'textf']

	fields.forEach((f) => {
		if (!(f in props)) {
			errors[f] = 'Заполните поле'
		}
	})

	return errors
}

function mapStateToProps(state) {
	const { chapters } = state.lesson.lessons
	let idd
	const selector = formValueSelector('add')
	const chapterValueArr = selector(state, 'chapter')

	if (typeof chapterValueArr !== 'undefined') {
		const chapterValue = chapters.find((x) => x.chapter1 === chapterValueArr)
		const { _id } = chapterValue
		idd = _id
	}

	return {
		idd,
		lessons: state.lesson.lessons,
		errorMessage: state.lesson.error,
	}
}

export default reduxForm({
	form: 'add',
	validate,
})(connect(mapStateToProps, { fetchAllChapters, addLesson })(AddLessonForm))
