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

	/*
	<nav className='navbar  navbar-expand-md  navbar-dark    bg-info  nav '>
		<div className='container-fluid'>
			<Link className='navbar-brand' to='/'>
				Home
			</Link>

			<button
				className='navbar-toggler'
				type='button'
				data-bs-toggle='collapse'
				data-bs-target='#navbarCollapse'
				aria-controls='navbarCollapse'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon' />
			</button>
			<div className='collapse navbar-collapse' id='navbarCollapse'>
				<ul className='navbar-nav me-auto mb-2 mb-md-0'>
					<li className='nav-item'>
						<Link className='nav-link' to='/articles'>
							Статьи
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/lessons'>
							Уроки
						</Link>
					</li>
					<li className='nav-item'>
						{isAuthenticated && (
							<Link className='nav-link' to='/reacts'>
								React
							</Link>
						)}
					</li>
					<NavDropdown name='Добавить'>
						<Link className='dropdown-item' to='/addArticle'>
							Добавить статью
						</Link>
						<Link className='dropdown-item' to='/editArticles'>
							Редактировать статьи
						</Link>
						<Link className='dropdown-item' to='/addArticle'>
							Добавить статью о REACT
						</Link>
						<Link className='dropdown-item' to='/addLesson'>
							Добавить урок
						</Link>
					</NavDropdown>
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
	</nav>
					*/
)

export default connect(null, { logout })(Navigation)
