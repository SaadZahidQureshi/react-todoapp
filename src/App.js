
import './App.css';
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from 'react';

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setTodo] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const[newDescription, setNewDeacription] = useState("");
  const [completedTodos, setCompletedTodo] = useState([])

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
    let completed_todo_arr = JSON.parse(localStorage.getItem("completed_todo_arr"))
    
    if(todo_arr){
      setTodo(todo_arr);
    }

    if(completed_todo_arr){
      setCompletedTodo(completed_todo_arr)
    }


  }, [])

  const DeleteToDoItem = (index) => {
    let reduced_arr = [...allTodos];
    reduced_arr.splice(index);
    localStorage.setItem("todo_arr", JSON.stringify(reduced_arr));
    setTodo(reduced_arr);
  }


  let DeleteCompletedToDoItem = (index) => {
    let reduced_arr = [...completedTodos];
    reduced_arr.splice(index);
    localStorage.setItem("completed_todo_arr", JSON.stringify(reduced_arr));
    setCompletedTodo(reduced_arr);
  }

const handleCompletedTodos= (index) => {
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() + 1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

  let filterItems = {
    ...allTodos [index],
    completedOn: completedOn
  }

  let updatedCompletdArray = [...completedTodos];
  updatedCompletdArray.push(filterItems);
  setCompletedTodo(updatedCompletdArray);
  DeleteToDoItem(index);
  localStorage.setItem("completed_todo_arr", JSON.stringify(updatedCompletdArray))
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
          { isCompleted === false && allTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key={index}>
                <div className="info">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="actions">
                <MdOutlineDelete className='icon delete' onClick={()=> DeleteToDoItem(index)} />
                <FaCheck className='icon check' onClick={()=> handleCompletedTodos(index)}/>
                </div>
              </div>
            )
          })}
        </div>

        <div className="todo-list">
          { isCompleted === true && completedTodos.map((item, index)=>{
            return(
              <div className="todo-list-item" key={index}>
                <div className="info">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <p>Completed on: <small>{item.completedOn}</small></p>
                </div>
                <div className="actions">
                <MdOutlineDelete className='icon delete' onClick={()=> DeleteCompletedToDoItem(index)} />
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
