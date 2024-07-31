import { useState } from "react";
import {useParams, Link} from "react-router-dom";
const Todo=()=>{

    

    let {search}=useParams();
    if(search); else search="";
    search= search.toLowerCase();
    const [todos, setTodos] = useState([
        {
          id: 1,
          title: "Meeting",
          desc: "Meet John at 14:30 sharp and discuss the presentation",
          status: true,
          time: "4:30"
        },
        {
            id: 2,
            title: "Badminton",
            desc: "Purchase new bat and running shoes",
            status: true,
            time: "8:45"
          },
          {
            id: 3,
            title: "Dinner plan",
            desc: "Hotel Grande, Monday 20:30. Pick up Ravi on the way there",
            status: true,
            time: "10:20"
          },
          {
            id: 4,
            title: "Telephone Bill",
            desc: "Rs.780, deadline 24th July!!",
            status: true,
            time: "13:20"
          }
      ]);
      const [edit,setEdit]=useState(null);
      const [src,setSrc] = useState(document.getElementById("srchtxt"));

      const addSrc=(e)=>setSrc(e.target.value);

       const addNew=()=>{
        const id=todos.length+1;
        setTodos([...todos,{
            id: id,
            title: "New Task",
            desc: "Click Edit and add your task",
            status: true,
            time: getCurrTime()
          }])
     }
    const deleteTask=(id)=>{
      setTodos(todos.filter(item => item.id!==id));
      // <span onClick={()=>deleteTask(item.id)}>Delete</span>
    }

 
    const toggle=(id)=>{
      setTodos((prevTodos)=>{
        const temp = prevTodos.map((todo, index) =>
        index === id ? { ...todo, status: !todo.status, time: getCurrTime() } : todo
      );
        console.log(temp[id].status);
        return temp;
      });
    console.dir(todos);
    }

    const enableEdit=(id)=>{
      if(edit===id) 
      { 
        setEdit(null);

        setTodos((prevTodos)=>{
          const temp=[...prevTodos];
          temp[id-1].title=document.getElementById("title"+id).value;
          temp[id-1].desc= document.getElementById("desc"+id).value;
          temp[id-1].time= getCurrTime();
          return temp;
        });
        console.dir(todos);
      }
      else 
        {
          setEdit(id);
          
        }
    }
 
    const getCurrTime=()=>{
      let time = new Date();
      return (time.getHours() + ":" + time.getMinutes()) ;
    }


    
    const handleEnter=(e,nextId)=>{
      if(e.keyCode==13) 
        {e.preventDefault();
        document.getElementById(nextId).focus();
        }
    }


 return (
      <div className="accordion" id="accordionExample">
        <div className="heading">Todo List</div>
            <div className="d-flex justify-content-between p-2">
            <button className="add btn " onClick={addNew}> + </button>
            <form className="d-flex searchbar" role="">
                <input id="srchtxt" className=" srchbar form-control me-2" type="text"  placeholder="🔍 Search" aria-label="Search" onChange={addSrc}/>
                <Link to={`/${src}`}><button className="srch btn btn-success" type="submit" hidden></button></Link>
            </form>
        </div>

   
      {
        todos.filter(todo=>todo.title.toLowerCase().includes(search) || todo.desc.toLowerCase().includes(search)).map((item)=>{
       
        return(
       <div role="button" className="accordion-item" key={item.id} >
          <h2 className="accordion-header d-flex flex-row">
          <input type="checkbox" className="mx-1" id="task" name="task"  onChange={()=>toggle(item.id-1)} />
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} style={{textDecorationLine: item.status?"":`line-through`}}  >
           {item.id+" "+item.title}
            </button>
          </h2>

          <div id={`collapse${item.id}`} className={`accordion-collapse collapse `} data-bs-parent="#accordionExample">
            <div className="accordion-body ">
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between p-2">
                  <span className="time">{item.time}</span>
                  <input class="taskTitle" id={`title${item.id}`}  disabled={(edit!==item.id)?true:false} defaultValue={item.title}  onKeyDown={(e)=>handleEnter(e,`desc${item.id}`)}/> 
                   <button className="btn btn-dark" id={`edit${item.id}`} type="button" onClick={()=>enableEdit(item.id)} >{(edit!==item.id)?"edit":"done"}</button>
                </div>
                
                <textarea id={`desc${item.id}`}  name="desc" disabled={(edit!==item.id)?true:false} style={{ wordWrap: "break-word" }} defaultValue={item.desc} onKeyDown={(e)=>handleEnter(e,`edit${item.id}`)}/>
              </div>
            </div>
          </div>
        </div>)
        })}

  </div>)

  



}
export default Todo;