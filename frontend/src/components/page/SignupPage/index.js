import React from 'react'
import SignupForm from '../../commons/SignupForm'

const SignupPage = () => (
	<div className='wraper'>
		<main className='main'>
			<div className='main-row'>
				<div className='wraper-center'>
					<div className='wraper-center-item'>
						<h3>Регистрация</h3>
						<SignupForm />
					</div>
				</div>
			</div>
		</main>
	</div>
)

export default SignupPage
