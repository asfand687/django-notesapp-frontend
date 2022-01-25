import './App.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function App() {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')

	const getNotes = async () => {
		const response = await fetch('http://localhost:8000/notes/')
		const data = await response.json()
		setNotes(data)
	}

	const addNote = async () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
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
			},
		})
		window.location.href = 'http://localhost:3000'
	}

	useEffect(() => {
		getNotes()
	}, [])
	return (
		<div className='App'>
			<div className='columns pt-6'>
				<div className='column'>
					<h2 className='title is-2'>Add a note</h2>
					<div className='control'>
						<input
							value={newNote}
							onChange={({ target }) => setNewNote(target.value)}
							className='input'
							type='text'
							placeholder='Normal input'
							style={{ width: '300px' }}
						/>
					</div>
					<button onClick={addNote} className='button is-primary mt-2'>
						Add
					</button>
				</div>
				<div className='column'>
					<div>
						<h2 className='title is-2'>Existing Notes</h2>

						<table className='table'>
							<thead>
								<tr>
									<th>Name</th>
									<th></th>
									<th>Created At</th>
								</tr>
							</thead>
							<tbody>
								{notes.map((note) => (
									<tr key={note.id}>
										<td>{note.body}</td>
										<td></td>
										<td>{note.created}</td>
										<td>
											<button
												onClick={() => deleteNote(note.id)}
												className='button is-danger'
											>
												Delete
											</button>
										</td>
										<td>
											<Link className='button is-info' to={`/note/${note.id}`}>
												Update
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
