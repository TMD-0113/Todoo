import { createSlice, nanoid } from '@reduxjs/toolkit'
import { saveState, loadState } from '../../utils/localStorage'

const persisted = loadState()

const initialState = persisted?.todos || {
  items: [],
  filter: 'all', // all | active | completed
  search: '',
  sort: 'created' // created | az | za
}

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      prepare(text) {
        return { payload: { id: nanoid(), text, completed: false, createdAt: Date.now() } }
      },
      reducer(state, action) {
        state.items.unshift(action.payload)
      }
    },
    toggleTodo(state, action) {
      const t = state.items.find(i => i.id === action.payload)
      if (t) t.completed = !t.completed
    },
    editTodo(state, action) {
      const { id, text } = action.payload
      const t = state.items.find(i => i.id === id)
      if (t) t.text = text
    },
    removeTodo(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    clearCompleted(state) {
      state.items = state.items.filter(i => !i.completed)
    },
    setFilter(state, action) { state.filter = action.payload },
    setSearch(state, action) { state.search = action.payload },
    setSort(state, action) { state.sort = action.payload },
    reorder(state, action) {
      const { sourceIndex, destIndex } = action.payload
      const [moved] = state.items.splice(sourceIndex, 1)
      state.items.splice(destIndex, 0, moved)
    }
  }
})

export const { addTodo, toggleTodo, editTodo, removeTodo, clearCompleted, setFilter, setSearch, setSort, reorder } = slice.actions
export default function todosReducer(state, action) {
  const newState = slice.reducer(state, action)
  saveState({ todos: newState })
  return newState
}

export const selectTodos = s => s.todos
