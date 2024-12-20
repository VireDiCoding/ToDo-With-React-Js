import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiSaveFill } from "react-icons/ri";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let newTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(newTodos)
    
  }, [])
  

  function saveToLs(){
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  function HandleEdit(e,id){
    let t = todos.filter(todo => todo.id == id)
    setTodo(t[0].todo) // viral

    let newTodos = todos.filter(item => item.id != id)

    setTodos(newTodos)
    saveToLs()
  }
  function HandleDelete(e,id){
    const isConfirmed = window.confirm("Are You Sure Want to Delete this Item?");

    if(!isConfirmed){
      return;
    }

    let newTodos = [...todos]
    let filterTodos = newTodos.filter(todo => todo.id != id );
    setTodos(filterTodos)
    localStorage.setItem("todos",JSON.stringify(filterTodos))
  }
  function HandleAdd(){
    let newTodos = [...todos,{id:uuidv4(),todo:todo, isCompleted: false }] 
    setTodos(newTodos)
    setTodo("")
    console.log(todos);
    localStorage.setItem("todos",JSON.stringify(newTodos))
  }

  function HandleChange(e){
    setTodo(e.target.value)
  }
  function HandleCheckBox(e){
    let id = e.target.name;
    
    let index = todos.findIndex(item =>{ 
      return item.id == id;
    })

    let newTodos = [...todos];

    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs()
  }
  function toggleFinish(){
    setShowFinished(!showFinished);
    console.log(!showFinished);
    
  }
  return (
    
    <>
    <Navbar />
    <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100  min-h-[80vh]  md:w-1/2 w-full  ">
    <h1 className='font-bold text-center text-2xl'>iTask Manage Your Todos at One Place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className="text-lg font-bold  ">Add a Todo</h2>
        <input type="text"  className='w-full rounded-lg py-1 px-5' onChange={HandleChange} value={todo} />
        <button className='bg-violet-800  text-white rounded-md hover:bg-violet-950 py-1 px-3  ' disabled={todo.length < 0} onClick={HandleAdd}>Save</button>
      </div>
      <input type="checkbox" onChange={toggleFinish} checked={showFinished} name="" id=""  /> Show Finished
      <h2 className="text-lg font-bold">Your Todos</h2>
      <div className="todos flex flex-col justify-center items-center ">
      {todos.length === 0 && <div>No Todos to Display</div> }
      { todos.map(item=> {
          return  (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-full">
          <div className='flex  justify-center items-center  my-3 '> 
           <input type="checkbox" checked={item.isCompleted} name={item.id} id="" onChange={HandleCheckBox} />
           &nbsp;&nbsp;
             <div className={item.isCompleted ? "line-through text-xl break-all " : "text-xl break-all "}  >{item.todo}</div>
             </div>
             <div className="buttons flex justify-center items-center">
               <button onClick={(e)=>{HandleEdit(e,item.id)}} className='bg-violet-800 text-white rounded-md hover:bg-violet-950  py-1 px-3 m-2'><FaEdit /></button>
               <button onClick={(e)=>{HandleDelete(e,item.id)}} className='bg-violet-800 text-white rounded-md hover:bg-violet-950  py-1 px-3 m-2'><MdDelete /></button>
             </div>
          </div>
        })}
      </div>
    </div>
    </>
  )
}

export default App
