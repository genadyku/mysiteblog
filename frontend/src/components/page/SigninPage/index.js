import React from 'react'
import SigninForm from '../../commons/SigninForm'

const SigninPage = () => (
	<div className='wraper'>
		<main className='main'>
			<div className='main-row'>
				<div className='wraper-center'>
					<div className='wraper-center-item'>
						<h3>Вход</h3>
						<SigninForm />
					</div>
				</div>
			</div>
		</main>
	</div>
)

export default SigninPage
