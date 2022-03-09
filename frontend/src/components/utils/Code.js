/* eslint-disable react/no-danger */
import React, { useEffect } from 'react'
import Prism from 'prismjs'

const Code = ({ text }) => {
	useEffect(() => {
		Prism.highlightAll()
	}, [])

	let text1
	if (typeof text !== 'undefined') {
		text1 = text.replace(/<br>/g, '\n')
	}

	const createMarkup = (text) => ({ __html: text })

	return (
		<div className='post-code' dangerouslySetInnerHTML={createMarkup(text1)} />
	)
}

export default Code
