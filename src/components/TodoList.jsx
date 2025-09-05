import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import TodoItem from './TodoItem'
import { reorder, selectTodos } from '../features/todos/todosSlice'

export default function TodoList() {
  const dispatch = useDispatch()
  const { items, filter, search, sort } = useSelector(selectTodos)

  const visible = useMemo(()=>{
    let list = [...items]
    if (filter === 'active') list = list.filter(i=>!i.completed)
    if (filter === 'completed') list = list.filter(i=>i.completed)
    if (search.trim()) list = list.filter(i=>i.text.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'az') list.sort((a,b)=>a.text.localeCompare(b.text))
    if (sort === 'za') list.sort((a,b)=>b.text.localeCompare(a.text))
    if (sort === 'created') list.sort((a,b)=>b.createdAt - a.createdAt)
    return list
  }, [items, filter, search, sort])

  const onDragEnd = (result) => {
    if (!result.destination) return
    // Map visible indexes back to global indexes
    const globalSource = items.findIndex(i => i.id === visible[result.source.index].id)
    const globalDest = items.findIndex(i => i.id === visible[result.destination.index].id)
    dispatch(reorder({ sourceIndex: globalSource, destIndex: globalDest }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-list">
        {(dropProvided)=> (
          <div className="todo-list" ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
            {visible.map((todo, i)=> (
              <Draggable key={todo.id} draggableId={todo.id} index={i}>
                {(provided, snapshot)=>(
                  <TodoItem todo={todo} index={i} provided={provided} snapshot={snapshot} />
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
            {visible.length === 0 && <div className="empty">No tasks</div>}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
