import React from 'react'
import { useSelector } from 'react-redux'
import { selectTodos } from '../features/todos/todosSlice'

export default function StatsBar() {
  const { items } = useSelector(selectTodos)
  const total = items.length
  const done = items.filter(i=>i.completed).length
  return (
    <div className="statsbar">
      <span>Total: {total}</span>
      <span>Completed: {done}</span>
      <span>Left: {total - done}</span>
    </div>
  )
}
