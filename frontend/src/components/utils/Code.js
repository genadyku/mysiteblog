/* eslint-disable react/no-danger */
import React, { useEffect } from 'react'
import Prism from 'prismjs'

const Code = ({ text }) => {
	useEffect(() => {
		Prism.highlightAll()
	}, [])

	const createMarkup = (text) => ({ __html: text })

	return (
		<div>
			<div dangerouslySetInnerHTML={createMarkup(text)} />
		</div>
	)
}

export default Code
