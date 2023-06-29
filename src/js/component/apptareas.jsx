import React, { useState, useEffect } from "react";

const AppTareas = () => {
  // Declaración de estados
        const [tarea, setTarea] = useState("");
        const [listaTareas, setListaTareas] = useState([]);
        const [user, setUser] = useState("");

    // Asignar evento on-change y vincular
        const addTarea = (e) => {
            setTarea(e.target.value);
        };
        const eventEnter = (e) =>{
            if(e.key === 'Enter') {
                 console.log(tarea)
               setListaTareas([...listaTareas,{label:tarea, done:false}]);
               update()
               setTarea("")
               
        }}
        const itemDelete = (index) => {
            const newArr = listaTareas.filter((param, i) => i !== index);
            setListaTareas(newArr);
            update()
          };
        function createUser(){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraesp',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            })
        
           .then((response)=>response.json())
           .then((data)=>console.log(data))
           .catch((error)=>console.log(error))
        }

        function update(){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraesp',{
                method: 'PUT',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(listaTareas)
            })
        
           .then((response)=>response.json())
           .then((user)=>console.log(user))
           .catch((error)=>console.log(error))
        }

        function obtenerData(){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraesp',{
                method: 'GET',
            })
        
           .then((response)=>response.json())
           .then((data)=>setListaTareas(data))
           .catch((error)=>console.log(error))
        }
       
        useEffect(()=>{
            // createUser()
            obtenerData()
        },[])
        

        return (
            <div className="container">
            <p className="">Lista de tareas</p>
            <input
                type="text"
                onChange={addTarea}
                className=""
                placeholder="What needs to be done?"
                onKeyDown={eventEnter}
                value={tarea}
            />
            <div className="listaDeTareas"> 
                <ol className="ol list-group list-group-flush estiloLista">
                    {listaTareas.map((task,index) => (
                    <li key={index} className="list-group-item li" >{`${task ==="" ? "No hay tareas pendientes" : task.label}`}<span className="span" onClick={() =>itemDelete(index)}>X</span></li>
                    ))}
                </ol>
                <p className="tareasPendientes">{`${listaTareas.length ===0 ? "No item left" : listaTareas.length+" item left"}`}</p> 
                <button className="btn btn-second" onClick={createUser}>Crear usuario</button>
            </div> 
            </div>
        );
        };

export default AppTareas
