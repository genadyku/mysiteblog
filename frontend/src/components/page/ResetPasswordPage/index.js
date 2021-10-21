import React, { Component } from 'react'

import ResetPasswordForm from '../../commons/ResetPasswordForm'

const styles = {
	marginTop: '20px',
}

class ResetPasswordPage extends Component {
	componentDidMount() {
		//	const { token } = this.props.match.params
	}

	render() {
		return (
			<div className='container' style={styles}>
				<div className='row'>
					<div className='col-lg-5 col-md-7 mx-auto'>
						<h3 className='text-center mb-3'>Смена пароля</h3>
						<ResetPasswordForm {...this.props} />
					</div>
				</div>
			</div>
		)
	}
}

export default ResetPasswordPage
