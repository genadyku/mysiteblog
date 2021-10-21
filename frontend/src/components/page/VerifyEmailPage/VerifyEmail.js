/* eslint-disable react/button-has-type */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import {
	authConfirmAccountToken,
	authRefrechAccountToken,
} from '../../../ducks/auth'

const divStyle = {
	color: '#4CAF50',
	border: '2px solid #4CAF50',

	cursor: 'pointer',
}
class VerifyEmail extends Component {
	componentDidMount() {
		// const { token } = this.props
		const parsed = queryString.parse(window.location.search)
		console.log(parsed)
		const { email, token } = parsed
		this.user = {}
		this.user.email = email
		this.user.token = token
		this.props.authConfirmAccountToken(parsed)
	}

	resendEmail(props) {
		this.props.authConfirmAccountToken(props)
	}

	render() {
		const { error } = this.props.errorMessage

		if (!error) return null
		const { message } = error

		return (
			<div>
				<h4>Проверка подтверждения регистрации</h4>
				<div>{error && <div>{message}</div>}</div>

				<button
					style={divStyle}
					onClick={this.resendEmail.bind(this, this.user)}
				>
					Отправить email повторно
				</button>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		errorMessage: state.login,
		status: state.login,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		authConfirmAccountToken(token) {
			dispatch(authConfirmAccountToken(token))
		},
		authRefrechAccountToken(token) {
			dispatch(authRefrechAccountToken(token))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
