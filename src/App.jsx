import React from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Filters from './components/Filters'
import StatsBar from './components/StatsBar'

export default function App() {
  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">Todo List</h1>
      </header>

      <section className="todo-section">
        <TodoInput />
        <Filters />
        <StatsBar />
        <TodoList />
      </section>

      <footer className="app-footer">Built with React + Redux Toolkit</footer>
    </div>
  )
}
