import React, { useContext, useReducer } from 'react';
import { Text } from './index';

const initialState =  {
  count: 0
}

function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return {
        count: state.count + 1
      }
    case "decrement":
      return {
        count: state.count - 1
      }
    case "reset":
      return initialState
    default:
      return initialState
  }
}

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useContext(Text)
  return <div>

      {/* pass UserContext from parent - index and consume
        <UserContext.Consumer>
        { value => <div>Hello, {value}!</div>}
      </UserContext.Consumer> */}

      {/* Load {useContext} and put Provider in argument and store it to value */}
      Hello, {value}!
      <div className="mb-5">
        <p>{state.count}</p>

        <button onClick={() => dispatch({ type:"increment"})} className="border p-1">Increment</button>
        <button onClick={() => dispatch({ type:"decrement"})} className="border p-1">Decrement</button>
        <button onClick={() => dispatch({ type:"reset"})} className="border p-1">Reset</button>
      </div>
      <hr />
      
    </div>    
}


