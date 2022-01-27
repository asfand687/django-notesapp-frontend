import './App.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

function App() {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')

	const getNotes = async () => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		}
		const response = await fetch('http://localhost:8000/notes/', requestOptions)
		const data = await response.json()
		setNotes(data)
	}

	const addNote = async () => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({ body: newNote }),
		}
		const response = await fetch(
			'http://localhost:8000/notes/create/',
			requestOptions
		)
		const data = await response.json()
		setNewNote('')
		window.location.href = 'http://localhost:3000'
	}

	const deleteNote = async (id) => {
		await fetch(`http://localhost:8000/notes/${id}/delete/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
		window.location.href = 'http://localhost:3000'
	}

	useEffect(() => {
		getNotes()
	}, [])
	return (
		<div className='App has-text-left'>
			<div className='container mt-6' style={{ width: '660px' }}>
				<div>
					<h2 className='title is-size-4'>Add Note</h2>
					<article className='field has-addons' style={{ width: '660px' }}>
						<div className='control'>
							<input
								value={newNote}
								onChange={({ target }) => setNewNote(target.value)}
								className='input'
								type='text'
								placeholder='Buy milk...'
								style={{ width: '600px' }}
							/>
						</div>
						<div className='control'>
							<button onClick={addNote} className='button is-primary'>
								Add
							</button>
						</div>
					</article>
				</div>
				<div className='mt-4'>
					<div>
						<h2 className='title is-size-4'>Notes</h2>
						<table className='table is-stripped is-bordered is-fullwidth'>
							<thead>
								<tr>
									<th>Note</th>
									<th style={{ width: '200px' }}>Created At</th>
									<th style={{ width: '100px' }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{notes.map((note) => (
									<tr key={note.id}>
										<td>{note.body}</td>
										<td>{dayjs(note.created).format('DD MMMM YYYY')}</td>
										<td className='is-flex is-justify-content-center'>
											<div
												className='mr-4'
												onClick={() => deleteNote(note.id)}
												style={{ cursor: 'pointer' }}
											>
												<i class='fas fa-trash-alt'></i>
											</div>

											<Link className='' to={`/note/${note.id}`}>
												<i class='fas fa-edit'></i>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
