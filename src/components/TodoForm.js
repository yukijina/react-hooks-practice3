import React, { useState, useEffect, useContext } from 'react'
import TodosContext from '../context'

export default function TodoForm() {
  const [todo, setTodo] = useState('')
  const { state: {currentTodo = {}}, dispatch } = useContext(TodosContext)

  useEffect(() => {
    if(currentTodo.text) {
      setTodo(currentTodo.text)
    } else {
      //if currentTod clicked delete, input box will empty
      setTodo("")
    }
    //when id changes, it runs
  }, [currentTodo.id])

  const handleSubmit = event => {
    event.preventDefault()
    if (currentTodo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo})
    } else {
      dispatch({type: "ADD_TODO", payload: todo})
    }
    setTodo("")
  }

  return (
    <div>
      <h2 className="text-lg text-center">Add a new Todo!</h2>
      <form className="flex justify-center p-5" onSubmit={handleSubmit}>
        <input 
          type="text"
          className="b/order-black border-solid border-2"  
          onChange={e => setTodo(e.target.value)}
          value={todo}
        />
      </form>
    </div>
  )
}