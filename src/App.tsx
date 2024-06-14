interface ToDo {
  id: string,
  title: string,
  completed: boolean
}


import { useState } from 'react'
import './App.css'

export default function App() {

  const [todoText, setTodoText] = useState("")
  const [todos, setTodos] = useState<ToDo[]>([])

  function clickHandler(e: any) {
    e.preventDefault()
    if (todoText.trim().length === 0) return
    setTodos(currentValue => {
      return [
        ...currentValue, { id: crypto.randomUUID(), title: todoText, completed: false }
      ]
    })

    setTodoText("")
  }

  function deleteHandler(id: any) {
    setTodos(currentValue => currentValue.filter(todo => todo.id !== id))
  }

  function toggleCheckbox(id: string) {
    setTodos(currentValue => {
      return currentValue.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  }
  return (
    <>
      <form onSubmit={clickHandler} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Click for writing</label>
          <input
            value={todoText}
            type="text"
            id='item'
            onChange={e => setTodoText(e.target.value)}
          />
        </div>
        <button className='btn'>Click Me</button>
      </form>
      <h1 className='header'>ToDo List</h1>
      <ul className='list'>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCheckbox(todo.id)} />
              {todo.title}
            </label>
            <button onClick={() => deleteHandler(todo.id)} className='btn btn-danger'>Delete</button>
          </li>
        ))}

      </ul>
    </>
  )
}