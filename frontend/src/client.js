import { API, cond } from 'space-api';

// Make an api and db object to interact with our backend
const api = new API("todoapp", "http://localhost:4122");
const db = api.DB('mysql');

export const addTodo = async (value) => {
  try {
    // Insert a new document / record in the todos table
    const res = await db.insert('todos').doc({value, is_completed: false}).apply()
    if (res.status !== 200) return { ack: false, error: res.error }
    return { ack: true }
  } catch (e) {
    return {ack: false, error: e.message}
  }
}

export const updateTodo = async (id, is_completed) => {
  try {
    // Update all documents / records in the todos table where id is equal to the provided value
    const res = await db.update('todos').where(cond('id', '==', id)).set({is_completed: is_completed}).apply()
    if (res.status !== 200) return { ack: false, error: res.error }
    return { ack: true }
  } catch(e) {
    return { ack: false, error: e.message }
  }
}

export const deleteTodo = async (id) => {
  try {
    // Delete all documents / records in the todos table where id is equal to the provided value
    const res = await db.delete('todos').where(cond('id', '==', id)).apply()
    if (res.status !== 200) return { ack: false, error: res.error }
    return { ack: true }
  } catch(e) {
    return { ack: false, error: e.message }
  }
}

export const deleteAllTodos = async () => {
  try {
    // Delete all documents / records in the todos table
    const res = await db.delete('todos').where({}).apply()
    if (res.status !== 200) return { ack: false, error: res.error }
    return { ack: true }
  } catch(e) {
    return { ack: false, error: e.message }
  }
}

export const getTodos = (cb) => {
  // The onSnapshot function is called whenever there is a change in the liveQuery resultset
  const onSnapshot = (docs, type, find, doc) => {
    cb(null, docs)
  }

  // The onError function is called whenever there is an error in the subscription
  const onError = (err) => {
    cb(err)
  }
  
  // Create and return a subscription query on the todos table
  return db.liveQuery("todos").where({}).subscribe(onSnapshot, onError)
}