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
               setListaTareas(listaTareas.concat(tarea));
               setTarea("")
               
        }}
        const itemDelete = (index) => {
            const newArr = listaTareas.filter((param, i) => i !== index);
            setListaTareas(newArr);
          };
        function createUser(){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraespino',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            })
        
           .then((response)=>[{label:tarea, done:false}])
           .then((user)=>console.log(user))
        //    .then((user)=>setUser(user.results))
           .catch((error)=>console.log(error))
        //    console.log(user)
        }

        function obtenerData(){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/lauraespino',{
                method: 'GET',
            })
        
           .then((response)=>response.json())
           .then((data)=>console.log(data))
        //    .then((user)=>setUser(user.results))
           .catch((error)=>console.log(error))
        //    console.log(user)
        }
        useEffect(()=>{
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
                {[{label:listaTareas.map((task,index) => (
                    <li key={index} className="list-group-item li" >{`${task ==="" ? "No hay tareas pendientes" : task}`}<span className="span" onClick={() =>itemDelete(index)}>X</span></li>
                    )), done:false}]}
                </ol>
                <p className="tareasPendientes">{`${listaTareas.length ===0 ? "No item left" : listaTareas.length+" item left"}`}</p> 
                <button className="btn btn-second" onClick={createUser}>Crear usuario</button>
            </div> 
            </div>
        );
        };

export default AppTareas;
