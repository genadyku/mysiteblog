import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import renderField from './renderField'

import { setpassw } from '../../ducks/resetpsw'

class ResetPasswordForm extends Component {
	constructor(props) {
		super(props)

		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(values) {
		const { token } = this.props.match.params

		values.token = token
		const passw = { passwordnew: values.passwordnew, token }

		this.props.setpassw(passw)
	}

	render() {
		const { handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<Field
					name='passwordnew'
					type='password'
					component={renderField}
					label='Пароль*'
					autoComplete='off'
				/>
				<Field
					name='password2'
					type='password'
					component={renderField}
					label='Пароль*'
					autoComplete='off'
				/>

				<div className='main-row'>
					<button type='submit' className='regist-form__button'>
						Вход
					</button>
				</div>
			</form>
		)
	}
}

function validate(props) {
	const errors = {}
	const fields = ['passwordnew', 'password2']

	fields.forEach((f) => {
		if (!(f in props)) {
			errors[f] = 'Заполните поле'
		}
	})

	if (props.passwordnew && props.passwordnew.length < 6) {
		errors.newpassword = 'Пароль должен содержать минимум 6 знаков'
	}

	if (props.passwordnew !== props.password2) {
		errors.password2 = 'Ошибка при подтверждении пароля'
	}

	return errors
}

export default reduxForm({
	form: 'resetpassword',
	validate,
	asyncBlurFields: [],
})(
	connect(
		null,

		{ setpassw }
	)(ResetPasswordForm)
)
