import {v4 as uuidv4} from 'uuid'

export default function reducer(state, action) {
  switch(action.type) {
    //get todos -sample if you have api backend
    case "GET_TODOS":
    return {
      ...state,
      todos: action.payload
    }
    case "ADD_TODO":
      //console.log(state.todos.findIndex(todo => todo.text === action.payload))
      if(!action.payload) {
        return state;
      }

       //findIndex returns index. If there is not index found, it returns -1. By setting below, it returns boolean not index
       //If there is matched index, it changed, if not, it returns state 
      if(state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state
      } 

      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      }
      //first, add to the array (state.todos is array)
      const addedTodos = [...state.todos, newTodo]
      //second update object(object=todos). Add array(addedTodos) 
      return {...state, todos: addedTodos}
    
    case "SET_CURRENT_TODO":
      return {...state, currentTodo: action.payload}
    case "UPDATE_TODO":
      if(!action.payload) {
        return state;
      }
      if(state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state
      } 
      const updatedTodo = {...state.currentTodo, text: action.payload}
      const updatedIndex = state.todos.findIndex(
        todo => todo.id === state.currentTodo.id
      )

      // it returns an updatedTodos like: 
      // [one, two, three, four, five] => [one, two, updatedTodo, four, five]
      const updatedTodos = [
        ...state.todos.slice(0, updatedIndex),
        updatedTodo,
        ...state.todos.slice(updatedIndex + 1)
      ]  
     // set currentTodo empty again
     return {...state, currentTodo: {}, todos: updatedTodos }
     
    case "TOGGLE_TODO":
      const toggleTodos = state.todos.map(todo => 
        todo.id === action.payload.id ? 
        { ...action.payload, complete: !action.payload.complete} : todo)
      //toggleTodos return array
      return {...state, todos: toggleTodos}

    case "REMOVE_TODO":
      const filteredTodo = state.todos.filter(todo => todo.id !== action.payload.id)
      const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodo
      } 
    default:
      return state
  }
}