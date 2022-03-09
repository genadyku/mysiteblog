import React from 'react'

const Error = ({ text, code }) => (
	<div className='wraper'>
		<main className='main'>
			<div className='main-row'>
				<div className='wraper-center'>
					<div className='wraper-center-item'>
						<div className='error__type'>{text}</div>

						<div className='error__code'>{code}</div>
					</div>
				</div>
			</div>
		</main>
	</div>
)

export default Error
