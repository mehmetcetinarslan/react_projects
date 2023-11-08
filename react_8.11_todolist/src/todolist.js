import React, {useState} from 'react'

function Todolist() {
    const[list, setList] = useState([])
    const[todo,setTodo] = useState("")

    const addTodo =() =>{
        if(todo) //todo içerisinde bir şey varsa çalışsın boş ise çalışmasın
        {
        setList([todo,...list])
        setTodo("")
        }
    }
  return (
    <div>
    <h2>Yapılacaklar Listesi</h2>
        
    <input placeholder='Yeni Görev Ekle' onChange={(event)=>setTodo(event.target.value)}
    value={todo}  type="text" />

    <button onClick={addTodo} >Ekle</button>

    {list.map((index)=>
    <li>{index}</li>
    )}
    </div>
  )
}

export default Todolist