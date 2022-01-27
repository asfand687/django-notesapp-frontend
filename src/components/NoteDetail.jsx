import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const NoteDetail = () => {
	const { id } = useParams()

	const [note, setNote] = useState({
		body: '',
	})
	const getNote = async () => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		}
		const response = await fetch(
			`http://localhost:8000/notes/${id}/`,
			requestOptions
		)
		const data = await response.json()
		setNote(data)
	}

	const updateNote = async (id) => {
		const response = await fetch(`http://localhost:8000/notes/${id}/update/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(note),
		})
		const data = await response.json()
		window.location.href = 'http://localhost:3000'
	}

	useEffect(() => {
		getNote()
	}, [])

	return (
		<div className='container mt-6' style={{ width: '660px' }}>
			<div className='card'>
				<header className='card-header'>
					<p className='card-header-title'>Update Note</p>
				</header>
				<div className='card-content'>
					<div>
						<div class='field'>
							<label class='label'>Note</label>
							<div class='control has-icons-left '>
								<input
									value={note?.body}
									onChange={({ target }) =>
										setNote({ ...note, body: target.value })
									}
									class='input is-info'
									type='text'
									placeholder='Enter the note body'
								/>
								<span class='icon is-small is-left'>
									<i class='fas fa-envelope'></i>
								</span>
							</div>
						</div>
						<div class='field'>
							<div class='control'>
								<button
									onClick={() => updateNote(note.id)}
									className='button is-success mt-2'
								>
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoteDetail
