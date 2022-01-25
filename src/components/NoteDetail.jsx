import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const NoteDetail = () => {
	const { id } = useParams()

	const [note, setNote] = useState({
		body: '',
	})
	const getNote = async () => {
		const response = await fetch(`http://localhost:8000/notes/${id}/`)
		const data = await response.json()
		setNote(data)
	}

	const updateNote = async (id) => {
		const response = await fetch(`http://localhost:8000/notes/${id}/update/`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(note),
		})
		const data = await response.json()
		window.location.href = 'http://localhost:3000'
	}

	useEffect(() => {
		getNote()
	}, [])

	return (
		<div
			className='is-flex is-justify-content-center is-align-items-center'
			style={{ height: '50vh' }}
		>
			<div className='box' style={{ width: '300px' }}>
				<input
					className='input'
					value={note?.body}
					style={{ width: '100%' }}
					onChange={({ target }) => setNote({ ...note, body: target.value })}
				/>
				<button
					onClick={() => updateNote(note.id)}
					className='button is-success mt-2'
				>
					Update
				</button>
			</div>
		</div>
	)
}

export default NoteDetail
