import React, { Component } from 'react'

import ResetPasswordForm from '../../commons/ResetPasswordForm'

class ResetPasswordPage extends Component {
	componentDidMount() {
		//	const { token } = this.props.match.params
	}

	render() {
		return (
			<div className='wraper'>
				<main className='main'>
					<div className='main-row'>
						<div className='wraper-center'>
							<div className='wraper-center-item'>
								<h3>Смена пароля</h3>
								<ResetPasswordForm {...this.props} />
							</div>
						</div>
					</div>
				</main>
			</div>
		)
	}
}

export default ResetPasswordPage
