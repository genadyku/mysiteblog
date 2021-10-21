import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import renderField from './renderField'
// import { forgot } from '../../ducks/auth'
import { forgot } from '../../ducks/resetpsw'

const divStyle = {
	color: '#d9534f',
}

class ForgotForm extends Component {
	constructor(props) {
		super(props)

		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(values) {
		this.props.forgot(values)
	}

	render() {
		const { handleSubmit, submitting } = this.props

		const { error } = this.props.errorMessage

		return (
			<div className='container'>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<Field
						name='email'
						type='text'
						component={renderField}
						label='E-mail*'
					/>

					<div className='row'>
						<div className='col-8'>
							<button
								type='submit'
								className='btn btn-primary'
								disabled={submitting}
							>
								Вход
							</button>
							<Link to='/' className='btn btn-error'>
								{' '}
								Отмена
							</Link>
						</div>
					</div>
					<div>
						{error && error.message && (
							<div style={divStyle}>{error.message}</div>
						)}
					</div>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.resetpsw }
}

export default reduxForm({
	form: 'auth',
})(connect(mapStateToProps, { forgot })(ForgotForm))
