import React from 'react'
import SigninForm from '../../commons/SigninForm'

const SigninPage = () => (
	<div className='container'>
		<div className='row header'>
			<div className='col-lg-5 col-md-7 mx-auto'>
				<h3 className='text-center mb-3'>Вход</h3>

				<SigninForm />
			</div>
		</div>
	</div>
)

export default SigninPage
