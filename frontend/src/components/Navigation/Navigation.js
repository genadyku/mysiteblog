import React from 'react'
import { Link, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import SearchBox from '../commons/SearchBox'

import { logout } from '../../ducks/auth'

const Navigation = ({ isAuthenticated, name, logout }) => (
	<header>
		<ul className='site-nav'>
			<h4 className='logo'>
				<Link to='/'>Главная</Link>
			</h4>

			<li>
				<Link to='/articles'>Статьи</Link>
			</li>
			<li>
				<Link to='/lessons'>Уроки</Link>
			</li>
			<div className='dropdown dropdown2'>
				<h4 className='dropbtn'>Админка</h4>
				<div className='dropdown-content'>
					<Link to='/editArticles'>Статьи</Link>
					<Link to='/addLesson'>Уроки</Link>
				</div>
			</div>
			<li>
				{isAuthenticated && (
					<Link className='nav-link' to='/reacts'>
						React
					</Link>
				)}
			</li>
			<Route render={({ history }) => <SearchBox history={history} />} />

			<li className='nav-right'>
				{isAuthenticated && <span className='list-name'>{name} </span>}
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
			</li>
		</ul>
	</header>
)

export default connect(null, { logout })(Navigation)
