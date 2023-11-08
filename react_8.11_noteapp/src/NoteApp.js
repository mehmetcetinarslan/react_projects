import React, { useState } from 'react'


function NoteApp() {
    const[note, setNote] = useState([])
    const[newNote,setnewNote] = useState("")
    const[newHead,setnewHead] = useState("")
    const[id, setId] = useState(1)
    const[editId, setEditid] = useState()
    //const[mode,setMode] = useState("add")
  
    const deleteNote =(id)=>{
        setNote(note.filter((i) => i.id !== id))
    }
    const updateNote =(i)=>{
        setnewHead(i.baslik)
        setnewNote (i.aciklama)
        setEditid(i.id)
        setNote(note.filter((e) => i.id !== e.id))
    }
    const addNote =() =>{setId(id + 1)
        if(newNote) 
        {
        setId(id + 1)
        setNote([...note,{baslik:newHead,aciklama:newNote,id:id}])
        setnewNote("")
        setnewHead("")
        }
    }
    
  return (
    <div>
        <h1>Notlarım</h1>

        <input placeholder='Not Başlığı Ekle' onChange={(event)=>setnewHead(event.target.value)}
        value={newHead}  type="text" />

        <input placeholder='Not Ekle' onChange={(event)=>setnewNote(event.target.value)}
        value={newNote}  type="text" /> 
        <button className='btn btn-dark btn-sm' onClick={()=>addNote()}>Not Ekle</button>
        

        {note.map((index,j)=>
        <div>
            <div key={j.id}>
            <h3 className='mb-3'>{j+1}-{index.baslik}</h3>
                <div className='mb-3'>Not: {index.aciklama}</div>
                

                <button className=' btn-sm mb-3' onClick={()=>updateNote(index)}>Düzenle</button>
                <br />
                <button className='btn btn-danger btn-sm' onClick={()=>deleteNote(index.id)}>Sil</button>
        </div>
        </div>

         )}
         

       

        
    </div>
  )
}

export default NoteApp