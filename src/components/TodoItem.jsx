import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, editTodo, removeTodo } from '../features/todos/todosSlice'

export default function TodoItem({ todo, index, provided, snapshot }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(todo.text)

  const save = () => {
    const t = value.trim()
    if (t && t !== todo.text) dispatch(editTodo({ id: todo.id, text: t }))
    setIsEditing(false)
  }

  return (
    <div
      className={"todo-item" + (todo.completed ? ' completed' : '') + (snapshot?.isDragging ? ' dragging' : '')}
      ref={provided?.innerRef}
      {...(provided?.draggableProps || {})}
      {...(provided?.dragHandleProps || {})}
    >
      <label className="left">
        <input type="checkbox" checked={todo.completed} onChange={()=>dispatch(toggleTodo(todo.id))} />
        {!isEditing ? (
          <span className="text" onDoubleClick={()=>setIsEditing(true)}>{todo.text}</span>
        ) : (
          <input
            className="edit-input"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            onBlur={save}
            onKeyDown={(e)=>{ if(e.key==='Enter') save(); if(e.key==='Escape'){ setIsEditing(false); setValue(todo.text) } }}
            autoFocus
          />
        )}
      </label>
      <button className="icon-btn" onClick={()=>dispatch(removeTodo(todo.id))} title="Delete">✕</button>
    </div>
  )
}
