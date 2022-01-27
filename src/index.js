import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoteDetail from './components/NoteDetail'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'

ReactDOM.render(
	<BrowserRouter>
		<Navbar />
		<Routes>
			<Route path='/note/:id/' element={<NoteDetail />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/' element={<ProtectedRoute component={App} />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
)
