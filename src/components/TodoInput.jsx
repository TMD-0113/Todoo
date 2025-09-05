import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/todosSlice'

export default function TodoInput() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch(addTodo(trimmed))
    setText('')
  }

  return (
    <form className="todo-input" onSubmit={submit}>
      <input
        className="input"
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="btn" type="submit">Add</button>
    </form>
  )
}
