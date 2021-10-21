import React from 'react'
import VerifyEmail from './VerifyEmail'

const VerifyEmailPage = ({ match }) => (
	<div className='container'>
		<VerifyEmail token={match.params.token} />
	</div>
)

export default VerifyEmailPage
