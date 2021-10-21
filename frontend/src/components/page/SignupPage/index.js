import React from 'react'
import SignupForm from '../../commons/SignupForm'

const SignupPage = () => (
	<div className='container'>
		<div className='row header'>
			<div className='col-lg-5 col-md-7 mx-auto'>
				<h3 className='text-center mb-3'>Регистрация</h3>
				<SignupForm />
			</div>
		</div>
	</div>
)

export default SignupPage
