import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import renderField from './renderField'
import { submitin } from '../../ducks/auth'

const divStyle = {
	color: '#d9534f',
}

class SigninForm extends Component {
	constructor(props) {
		super(props)

		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(values) {
		this.props.submitin(values)
	}

	render() {
		const error = this.props.errorMessage
		const { handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field
					name='email'
					type='text'
					component={renderField}
					label='Имя пользователя*'
				/>
				<Field
					name='password'
					type='password'
					component={renderField}
					label='Пароль*'
					autoComplete='off'
				/>
				<div className='main-row'>
					<button type='submit' className='regist-form__button'>
						Вход
					</button>
					<Link to='/' className='regist-form__nav'>
						{' '}
						Отмена
					</Link>

					<Link to='/forgot' className='regist-form__nav cansel'>
						{' '}
						Забыли пароль
					</Link>
				</div>

				<div>{error && <div style={divStyle}>{error.message}</div>}</div>
			</form>
		)
	}
}
const validate = (props) => {
	const errors = {}
	const fields = ['email', 'password']

	fields.forEach((f) => {
		if (!(f in props)) {
			errors[f] = 'Заполните поле'
		}
	})

	if (
		props.email &&
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)
	) {
		errors.email = 'Введите действительный адрес электронной почты'
	}

	if (props.password && props.password.length < 6) {
		errors.password = 'Пароль должен содержать минимум 6 знаков'
	}

	return errors
}
function mapStateToProps(state) {
	return { errorMessage: state.login.error, status: state.login }
}

export default reduxForm({
	form: 'auth',
	validate,
})(
	connect(
		mapStateToProps,

		{ submitin }
	)(SigninForm)
)
