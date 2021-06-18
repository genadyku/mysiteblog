import React from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SearchBox from '../commons/SearchBox'

import { logout } from '../../ducks/auth'

const Navigation = ({ isAuthenticated, name, logout }) => (
	<div className='navbar  navbar-expand-md  navbar-dark    bg-info '>
		<button
			className='navbar-toggler custom-toggler'
			type='button'
			data-toggle='collapse'
			data-target='#navbarsExampleDefault'
			aria-controls='navbarsExampleDefault'
			aria-expanded='false'
			aria-label='Toggle navigation'
		>
			<span className='navbar-toggler-icon ' />
		</button>

		<div className='collapse navbar-collapse' id='navbarsExampleDefault'>
			<ul className='navbar-nav mr-auto'>
				<Link className='nav-link' to='/'>
					Home
				</Link>
				<Link className='nav-link' to='/articles'>
					Статьи
				</Link>
				<Link className='nav-link' to='/lessons'>
					Уроки
				</Link>
				{isAuthenticated && (
					<Link className='nav-link' to='/reacts'>
						React
					</Link>
				)}
			</ul>
			<ul className='navbar-nav navbar-right '>
				<Route render={({ history }) => <SearchBox history={history} />} />
				{isAuthenticated && <li className='list-name'>{name} </li>}
				{!isAuthenticated && (
					<Link className='nav-link' to='/signin'>
						Вход
					</Link>
				)}
				<Link className='nav-link' to='/signup'>
					Регистрация
				</Link>
				{isAuthenticated && (
					<Link className='nav-link' to='/' onClick={logout}>
						Выход
					</Link>
				)}
			</ul>
		</div>
	</div>
)

export default connect(null, { logout })(Navigation)
