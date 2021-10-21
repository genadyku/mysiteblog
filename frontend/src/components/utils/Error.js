import React from 'react'

const styles = {
	marginTop: '40px',
}
const Error = ({ text, code }) => (
	<div className='container' style={styles}>
		<div className='row'>
			<div className='error__type'>{text}</div>
		</div>
		<div className='row' />
		<div className='error__code'>{code}</div>
	</div>
)

export default Error
