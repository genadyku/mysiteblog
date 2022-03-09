import React from 'react'

const renderField = ({
	input,
	label,
	type,
	autoComplete,
	meta: { touched, error, invalid, warning },
}) => (
	<div className={`regist-form-group ${touched && invalid ? 'has-error' : ''}`}>
		<label className='floatLabel'>{label} </label>
		<div>
			<input
				{...input}
				className='regist-form__input'
				placeholder={label}
				type={type}
				autoComplete={autoComplete}
			/>
			<div className='help-block'>
				{touched &&
					((error && <span>{error}</span>) ||
						(warning && <span>{warning}</span>))}
			</div>
		</div>
	</div>
)
export default renderField
