import React, { useContext, useReducer, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

export const Text = React.createContext()

const username = "Sara"

//when we fetch from backend (this app does not have)



const useAPI = endpoint => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  },[])
  
  const getData = async () => {
    const response = await axios.get(endpoint)
    setData(response.data)
  }
  return data
}

const Test = () => {
  const initialState = useContext(TodosContext)
  // pass the initiaState to the 2nd argument
  const [state, dispatch] = useReducer(todosReducer, initialState)

 //when we fecth(Juse example, this does not have backend data)
  const savedTodos = useAPI('apiAddress')
 useEffect(() => {
   dispatch({
     tyoe: 'GET_TODOS',
     payload: savedTodos
   })
 }, [savedTodos])

  return (
    <TodosContext.Provider value={{state, dispatch}}> 
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Text.Provider value={username}>
     <App />
    </Text.Provider>
   
     <Test />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
