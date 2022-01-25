import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav
			className='navbar is-light'
			role='navigation'
			aria-label='main navigation'
		>
			<div className='navbar-brand'>
				<Link className='navbar-item' to='/'>
					<img
						src='https://bulma.io/images/bulma-logo.png'
						width='112'
						height='28'
					/>
				</Link>
			</div>

			<div className='navbar-menu'>
				<div className='navbar-start'>
					<Link className='navbar-item' to='/'>
						Home
					</Link>
				</div>

				<div className='navbar-end'>
					<div className='navbar-item'>
						<form>
							<div className='field has-addons'>
								<div className='control'>
									<input className='input' type='text' placeholder='Add Todo' />
								</div>
								<div className='control'>
									<button type='submit' className='button is-link'>
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
