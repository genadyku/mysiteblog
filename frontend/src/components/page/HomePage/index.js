/* eslint-disable react/no-danger */
import React, { Component } from 'react'

import Prism from 'prismjs'

import 'prismjs/components/prism-sql'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
// const divStyle = {
// 	color: '#ddd',
// 	align: 'left',
// }
class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	// eslint-disable-next-line react/sort-comp
	handleChange(event) {
		this.setState({ value: event.target.value })
	}

	handleSubmit(event) {
		event.preventDefault()
	}

	componentWillUnmount() {
		clearInterval(this.timerID)
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 10000)

		Prism.highlightAll()
	}

	tick() {
		Prism.highlightAll()
		const text1 = this.state.value.replace(/\n/g, '')
		const text = text1.replace(/<br>/g, '\n')

		return text
	}

	createMarkup(text) {
		return { __html: text }
	}

	render() {
		return (
			<>
				<h4>PRISM1</h4>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-lg-5'>
							<form onSubmit={this.handleSubmit}>
								<textarea
									className='code-view'
									rows='50'
									cols='100'
									value={this.state.value}
									onChange={this.handleChange}
								/>
							</form>
						</div>
						<div className='col-lg-6 preview'>
							<div dangerouslySetInnerHTML={this.createMarkup(this.tick())} />
						</div>
					</div>
				</div>
			</>
		)
	}
}
export default Home
