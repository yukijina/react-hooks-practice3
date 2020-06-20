import React, { useContext } from 'react'
import TodosContext from '../context';

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext)

  const title = state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To do!"

  return(
    <div className="container mx-auto max-w-md text-center font-mono mt-5">
      <h1 className="text-bold text-5xl">{title}</h1>
      <ul className="list-reset text-whilte p-0">
        {state.todos.map(todo => (
          <li key={todo.id} className="bg-orange-500 border-black border-dashed border-2 my-2 py-4 flex items-center">
            <span 
              onDoubleClick={()=> dispatch({type: "TOGGLE_TODO",payload: todo})}
              className={`cursor-pointer flex-1 ml-12 ${todo.complete && "line-through text-grey-800"}`}
            > 
            {/* if todo.complete = true, it adds the above className */}
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: "SET_CURRENT_TODO", payload: todo }) }>
              <img src="http://icon.now.sh/edit/0050c5" alt="Edit Icon" className="h-6"/>
            </button>
            <button onClick={() => dispatch({type: "REMOVE_TODO", payload: todo})}>
              <img src="http://icon.now.sh/delete/8b0000" alt="Delete Icon" className="h-6"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}