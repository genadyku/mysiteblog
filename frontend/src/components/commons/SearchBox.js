import React, { useState } from 'react'

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
		<form className='search'>
			<input
				className='search__input'
				type='search'
				placeholder='Поиск'
				aria-label='Поиск'
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<button className='search__button' type='submit' onClick={submitHandler}>
				Поиск
			</button>
		</form>
	)
}

export default SearchBox
