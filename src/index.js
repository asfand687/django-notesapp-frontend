import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoteDetail from './components/NoteDetail'
import Navbar from './components/Navbar'

ReactDOM.render(
	<BrowserRouter>
		<Navbar />
		<Routes>
			<Route path='/note/:id/' element={<NoteDetail />} />
			<Route path='/' element={<App />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
)
