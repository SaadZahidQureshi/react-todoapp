
import './App.css';
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from 'react';

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setTodo] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const[newDescription, setNewDeacription] = useState("");

  const AddTodoItem = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updateTodoArr = [...allTodos]
    updateTodoArr.push(newTodoItem);
    setTodo(updateTodoArr);
    localStorage.setItem("todo_arr", JSON.stringify(updateTodoArr));
  }

  useEffect(()=>{
    let todo_arr = JSON.parse(localStorage.getItem('todo_arr'));
    if(todo_arr){
      setTodo(todo_arr);
    }
  }, [])


  const DeleteToDoItem = (index) => {
    let reduced_arr = [...allTodos];
    reduced_arr.splice(index);
    localStorage.setItem("todo_arr", JSON.stringify(reduced_arr));
    setTodo(reduced_arr);
  }

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="title">Title</label>
            <input type="text" name="task-title" value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} id="title" placeholder='What is the task title?' maxLength={50}/>
          </div>

          <div className="todo-input-item">
            <label htmlFor="description">Description</label>
            <input type="text" name="task-description" value={newDescription} onChange={(e)=> setNewDeacription(e.target.value)} id="description" placeholder='What is the task description?'/>
          </div>

          <div className="todo-input-item">
            <button type='button' className='primaryBtn' onClick={AddTodoItem}>Add</button>
          </div>

        </div>

        <div className="btn-area">
            <button className={`isCompleted ${isCompleted === false ? 'active': ''}`} onClick={()=> setIsCompleted(false)}>Todo</button>
            <button className={`isCompleted ${isCompleted === true ? 'active' : ''}`} onClick={()=> setIsCompleted(true)}>Completed</button>
        </div>

        <div className="todo-list">
          {allTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key={index}>
                <div className="info">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="actions">
                <MdOutlineDelete className='icon delete' onClick={()=> DeleteToDoItem(index)} />
                <FaCheck className='icon check'/>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
