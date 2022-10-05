import React from 'react'
import ForgotForm from '../../commons/ForgotForm'

const ForgotPage = () => (
	<div className='wraper'>
		<main className='main'>
			<div className='main-row'>
				<div className='wraper-center'>
					<div className='wraper-center-item'>
						<h3>Забыл пароль</h3>
						<ForgotForm />
					</div>
				</div>
			</div>
		</main>
	</div>
)

export default ForgotPage
