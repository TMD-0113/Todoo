import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setSearch, setSort, clearCompleted, selectTodos } from '../features/todos/todosSlice'

export default function Filters() {
  const dispatch = useDispatch()
  const { filter, search, sort, items } = useSelector(selectTodos)
  const completed = items.filter(i => i.completed).length

  return (
    <div className="filters">
      <div className="segment">
        <button className={filter==='all'?'chip active':'chip'} onClick={()=>dispatch(setFilter('all'))}>All</button>
        <button className={filter==='active'?'chip active':'chip'} onClick={()=>dispatch(setFilter('active'))}>Active</button>
        <button className={filter==='completed'?'chip active':'chip'} onClick={()=>dispatch(setFilter('completed'))}>Completed</button>
      </div>
      <input className="search" placeholder="Search..." value={search} onChange={e=>dispatch(setSearch(e.target.value))} />
      <select className="select" value={sort} onChange={e=>dispatch(setSort(e.target.value))}>
        <option value="created">Newest</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
      <button className="btn ghost" disabled={!completed} onClick={()=>dispatch(clearCompleted())}>Clear completed ({completed})</button>
    </div>
  )
}
