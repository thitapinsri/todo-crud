import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'

// app
function App() {
  const [title, setTitle] =useState()
  const [date, setDate] =useState()
  const [status, setStatus] =useState()
  const [remark, setRemark] =useState()
  const [editTitle, setEditTitle] =useState()
  const [editDate, setEditDate] =useState()
  const [editStatus, setEditStatus] =useState()
  const [editRemark, setEditRemark] =useState()
  const [selectedId, setSelectedId] = useState(0)

  const [todoList, setTodoList] = useState([])

  // GET all data
  const getTodos = () => {
    axios.get('http://localhost:3002/todos').then(response => {
      setTodoList(response.data)
    })
  }

  //  fetch data everytime the list update
  useEffect(()=>{
    getTodos()
  },[])

  // POST (add new data)
  const addTodo = (e) => {
    axios.post('http://localhost:3002/todos', {
      title: title,
      date: date,
      status: status,
      remark: remark
    }).then(() => {
      setTodoList([...todoList, {
          title: title,
          date: date,
          status: status,
          remark: remark
      }])
      setTitle('')
      setDate('')
      setStatus('')
      setRemark('')
    })
  }

  
  //  DALETE
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3002/todos/${id}`).then(() => {
      setTodoList(todoList.filter(todo => todo.id !== id))
    })
  }

  // after submit update, PATCH data back to database
  const editTodo = id => {
    axios.patch(`http://localhost:3002/todos/${id}`, {
      id: selectedId,
      title: editTitle,
      date: editDate,
      status: editStatus,
      remark: editRemark
    }).then((response) => {
      setTodoList(
        todoList.map(todo => todo.id == id ? {...response.data} : todo)
      )
      setEditTitle('')
      setEditDate('')
      setEditStatus('')
      setEditRemark('')
      setSelectedId(0)
    })
  }

  // prep data for edit mode
  const intoEditMode = card => {
    setEditTitle(card.title)
    setEditDate(card.date)
    setEditStatus(card.status)
    setEditRemark(card.remark)
    setSelectedId(card.id)
  }


  return (
    <div className="App">
      <h1>add your activity</h1>
      <div className='info'>
        <form
        onSubmit={e => e.preventDefault()}
        >
          <label>title</label>
          <input
            type='text'
            id='title'
            name='title'
            onChange={e => setTitle(e.target.value)} />

          <label>date</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={e => setDate(e.target.value)} />

          <label>status</label>
          <select
            id="status"
            name="status"
            onChange={e => setStatus(e.target.value)}>
            <option value='urgent'>urgent</option>
            <option value="no rush">no rush</option>
          </select>

          
          <label>remark</label>
          <textarea
            id="remark"
            name="remark"
            rows="4"
            cols="50"
            onChange={e => setRemark(e.target.value)}></textarea>

          <br/>
          <button onClick={addTodo}>submit</button>

        </form>
      </div>
      <div className="editor">
        <form
        onSubmit={e => e.preventDefault()}
        >
          <h1>update your post</h1>
          <input
            type='text'
            name='title'
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)} />
          <input
            type="date"
            name="date"
            value={editDate}
            onChange={e => setEditDate(e.target.value)} />
          <select
            name="status"
            value={editStatus}
            onChange={e => setEditStatus(e.target.value)}>
            <option value='urgent'>urgent</option>
            <option value="no rush">no rush</option>
          </select>
          <textarea
            id="remark"
            name="remark"
            rows="4"
            cols="50"
            value={editRemark}
            onChange={e => setEditRemark(e.target.value)}></textarea>

          <br/>
          <button type='submit' onClick={() => editTodo(selectedId)}>update</button>
        </form>
  </div>
  
      <div className="list">
        <h1>all activities</h1>
        {todoList.map((todo) => {
          return (
            <div className="todo" style={{backgroundColor: 'black', padding: '1rem', marginTop: '2rem', borderRadius: '1rem'}}>
              <p>title: {todo.title}</p>
              <p>date: {todo.date}</p>
              <p>status: {todo.status}</p>
              <p>remark: {todo.remark}</p>
              <span>
                <button 
                  onClick={() => intoEditMode(todo)}
                >edit</button>
                <button 
                  style={{marginLeft: '1rem'}}
                  onClick={() => deleteTodo(todo.id)}
                >delete</button>
              </span>
              <div className="editor">
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
