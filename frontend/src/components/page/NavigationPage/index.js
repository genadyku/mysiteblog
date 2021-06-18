import React from 'react'
import { connect } from 'react-redux'

import Navigation from '../../Navigation'

class NavigationPage extends React.Component {
	render() {
		const isAuthenticated = this.props.isAuthenticated
		const name = this.props.user

		return (
			<div>
				<Navigation isAuthenticated={isAuthenticated} name={name} />
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.login.isConfirm,
		user: state.login.name,
	}
}

export default connect(mapStateToProps, null)(NavigationPage)
