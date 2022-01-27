import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const navigate = useNavigate()
	const [userData, setUserData] = useState({
		username: '',
		password: '',
		email: '',
	})

	const registerUser = async (e) => {
		e.preventDefault()
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: userData.email,
				username: userData.username,
				password: userData.password,
			}),
		}
		const response = await fetch(
			`http://localhost:8000/api/auth/register`,
			requestOptions
		)
		const data = await response.json()
		localStorage.setItem('token', data.token)
		navigate('/', { replace: true })
	}

	return (
		<div className='container mt-6' style={{ width: '660px' }}>
			<div className='card'>
				<header className='card-header'>
					<p className='card-header-title'>Register</p>
				</header>
				<div className='card-content'>
					<div className='content'>
						<form onSubmit={registerUser}>
							<div class='field'>
								<label class='label'>Email</label>
								<div class='control has-icons-left '>
									<input
										value={userData.email}
										onChange={({ target }) =>
											setUserData({ ...userData, email: target.value })
										}
										class='input is-info'
										type='text'
										placeholder='Email Address'
									/>
									<span class='icon is-small is-left'>
										<i class='fas fa-envelope'></i>
									</span>
								</div>
							</div>

							<div class='field'>
								<label class='label'>Username</label>
								<div class='control has-icons-left '>
									<input
										value={userData.username}
										onChange={({ target }) =>
											setUserData({ ...userData, username: target.value })
										}
										class='input is-info'
										type='text'
										placeholder='Username'
									/>
									<span class='icon is-small is-left'>
										<i class='fas fa-user'></i>
									</span>
								</div>
							</div>

							<div class='field'>
								<label class='label'>Password</label>
								<div class='control has-icons-left '>
									<input
										value={userData.password}
										onChange={({ target }) =>
											setUserData({ ...userData, password: target.value })
										}
										class='input is-info'
										type='password'
										placeholder='Password'
									/>
									<span class='icon is-small is-left'>
										<i class='fas fa-key'></i>
									</span>
								</div>
							</div>
							<div class='field is-grouped'>
								<div class='control'>
									<button class='button is-link'>Signup</button>
								</div>
								<div class='control'>
									<button class='button is-link is-light'>Cancel</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
