import React, { useState, useEffect } from "react";
import './App.css';

import * as client from './client';

// TodoInput is responsible to accept a user provided todo object. It calls the `addTodo`
// utility function once the add button is hit.
const TodoInput = ({addTodo, deleteTodos}) => {
  // Declare a new state variable to store the text the users enters
  const [text, setText] = useState('');

  // `handleUpdate` updates the value of the text variable with the values entered by the user
  const handleUpdate = (e) => {
    setText(e.target.value)
  }

  // `handleAddTodo` invokes the `addTodo` utility whenever the user hits the add button
  const handleAddTodo = () => {
    addTodo(text)

    // Don't forget to reset the state
    setText("")
  }

  // `handleDeleteTodos` invokes the `deleteTodos` utility whenever the user hits the `Delete All` button
  const handleDeleteTodos = () => {
    deleteTodos()
  }

  return (
    <div className="todo-input">
      <span>Add todo: </span>
      <span>
        {/* We pass the `handleUpdate` fn to the `onChange` listener to update our state on each key press */}
        <input type="text" value={text} onChange={handleUpdate}/>

        {/* We pass the `handleAddTodo` fn to the `onClick` listener to pass the add todo event to our parent */}
        <button onClick={handleAddTodo}>Add</button>

        {/* We pass the `handleDeleteTodos` fn to the `onClick` listener to pass the delete all todos event to our parent */}
        <button style={{marginLeft: "10px"}} onClick={handleDeleteTodos}>Delete All</button>
      </span>
    </div>
  )
}

// TodoList is a component which does something important. I'm really tired writing comments.
// But they make your code look super professional. So I'm gonna do it any ways.
// Also, Black Lives Matter :)
const TodoList = ({todos, updateTodo, deleteTodo}) => {
  // `handleUpdate` invokes the `updateTodo` utility whenever the user hits a checkbox
  const handleUpdate = (e) => {
    updateTodo(e.target.id, e.target.checked)
  }

  // `handleDelete` invokes the `deleteTodo` utility whenever the user hits the delete button
  const handleDelete = (e) => {
    deleteTodo(e.target.id)
  }

  // Map over the todos array to ake a valid jsx array of `TodoItem`
  const items = todos.map(todo => (
    <li className="todo-item">
      <input id={todo.id} type="checkbox" checked={todo.is_completed} onChange={handleUpdate}/> 
      {todo.value}
      <button id={todo.id} onClick={handleDelete}>X</button>
    </li>
  ))

  // Return a ul containing the todo items
  return (<ul className="todo-list">{items}</ul>)
}

const App = () => {
  // Declare a new state variable to store the todos
  const [todos, setTodos] = useState([]);

  // We'll use `useEffect` to subscribe to the todos table when the component mounts and
  // unsubscribe when it unmounts.
  useEffect(() => {
    const subscription = client.getTodos((err, todos) => {
      if (err) {
        alert(err)
        return
      }

      // Set the todos as is.
      setTodos(todos)
    })

    // Don't forget to unsubscribe when the component unmounts
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, []);

  // `addTodo` is a utility to add todos to our state. This is also where, we'll
  // send a request to the server to add the todo to our database. 
  const addTodo = (value) => {
    client.addTodo(value).then(res => {
      if (!res.ack) alert(res.error)
    })
  }

  // `updateTodo` is a utility to update the `is_completed` field of the concerned todo.
  // This is also where, we'll send a request to the server to update the todo in our database.
  const updateTodo = (id, is_completed) => {
    client.updateTodo(id, is_completed).then(res => {
      if (!res.ack) alert(res.error)
    })
  } 

  // `deleteTodo` is a utility to delete the concerned todo. This is also where, we'll 
  // send a request to the server to delete the todo from our database.
  const deleteTodo = (id) => {
    client.deleteTodo(id).then(res => {
      if (!res.ack) alert(res.error)
    })
  }
  
  // `deleteTodos` is a utility to delete all todos. This is also where, we'll 
  // send a request to the server to delete all todos from our database.
  const deleteTodos = () => {
    client.deleteAllTodos().then(res => {
      if (!res.ack) alert(res.error)
    })
  }

  return (
    <div className="app">
      <h2>Realtime Todo App</h2>
      <br/>
      <TodoInput addTodo={addTodo} deleteTodos={deleteTodos} />
      <div>
        <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;
