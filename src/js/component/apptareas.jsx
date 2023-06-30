import React, { useState, useEffect } from "react";

const AppTareas = () => {
  // Declaración de estados
        const [tarea, setTarea] = useState("");
        const [listaTareas, setListaTareas] = useState([]);
        // const [user, setUser] = useState("");

    // Asignar evento on-change y vincular
        const addTarea = (e) => {
            setTarea(e.target.value);
        };
        // insertar la nueva tarea con enter y vaciar input
        const eventEnter = (e) =>{
            if(e.key === 'Enter') {
               setListaTareas([...listaTareas,{label:tarea, done:false}])
               setTarea("")   
               console.log(listaTareas)   
        }}
        // borrar tarea y devolver nuevo estado de tareas actualizadas
        const itemDelete = (index) => {
            setListaTareas(listaTareas => listaTareas.filter((element, i)=> i !== index))
          };
        
        // crear nuevo usuario si no existe uno
        function createUser(){
        
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraesp',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            })
        
           .then((response)=>{if (response.status===400){return alert("Ya tienes creado un usuario")} else return response.json()})
           .then((data)=>console.log(data))
           .catch((error)=>console.log(error))
        }

        // actualizar la api con la lista de tareas
        function update(){
            if(listaTareas.length>0) {
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraesp',{
                method: 'PUT',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(listaTareas)
            })
        
           .then((response)=>response.json())
           .then((data)=>console.log(data))
           .catch((error)=>console.log(error))
        }}
        // Si existe un usuario obtener las tareas cargadas en la lista
        function obtenerData(){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraesp',{
                method: 'GET',
            })
           .then((response)=>{if(response.status!=200) {createUser(); return console.log("error")} else return response.json()})
           .then((data)=>setListaTareas(data))
           .catch((error)=>console.log(error))
        }
        // borrar usuario y lista de tareas, actualizar la página
        function handleDelete(){
            deleteUserYLista();
            reload()  
        }
        function reload (){
            window.location.reload(true);
            alert ("Selecciona 'Aceptar'  y actualiza la página para crear una nueva lista")
     
    
        }
        function deleteUserYLista(){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraesp',{
                method: 'DELETE',
            })
        
           .then((response)=>response.json())
           .then((data)=>console.log(data))
           .catch((error)=>console.log(error))
        }
        // actualizar la api si hay cambios en la lista
        useEffect(()=>{
            update()}, [listaTareas]
        )
        // obtener la listaTareas actual al recargar la pagina
        useEffect(()=>{
            obtenerData()}, [])
        

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
                <hr></hr>
                <p className="tareasPendientes">{`${listaTareas.length ===0 ? "No item left" : listaTareas.length+" item left"}`}</p> 
                </div>
                <button className="btn btn-secondary" onClick={createUser}>Crear usuario</button>
                <button className="btn btn-secondary" onClick={handleDelete}>Borrar Usuario</button>
             
            </div>
        );
        };

export default AppTareas
