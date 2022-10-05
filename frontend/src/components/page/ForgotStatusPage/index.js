import React from 'react'

const ForgotStatusPage = () => (
	<div className='wraper'>
		<main className='main'>
			<div className='main-row'>
				<div className='wraper-center'>
					<div className='wraper-center-status'>
						<h3>Подтверждение смены пароля...</h3>
						<p>
							Пожалуйста, проверьте свою электронную почту, чтобы подтвердить
							провести смену пароля аккаунт.
						</p>
						<hr />
						<p>
							Если это не ваш адрес электронной почты, вернитесь и введите
							правильный адрес.
						</p>
						<p>
							Если вы не получили наше письмо в течение 15 минут, проверьте
							папку со спамом.
						</p>
					</div>
				</div>
			</div>
		</main>
	</div>
)

export default ForgotStatusPage
