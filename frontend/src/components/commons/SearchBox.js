import React, { useState } from 'react'

const divStyle = {
	color: '#d9534f',
	width: '400px',
	marginRight: '100px',
}
const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('')
	const submitHandler = (e) => {
		e.preventDefault()
		let search
		if (keyword.trim()) {
			search = `?search=${keyword}`
			history.push(`/articles${search}`)
		} else {
			console.log('nosubmit')
			history.push('/')
		}
	}
	return (
		<div className='input-group' style={divStyle}>
			<input
				type='text'
				className='form-control'
				placeholder='Поиск по сайту'
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<div className='input-group-append'>
				<button
					className='btn btn-secondary'
					type='button'
					onClick={submitHandler}
				>
					<i className='fa fa-search' />
				</button>
			</div>
		</div>
	)
}

export default SearchBox
