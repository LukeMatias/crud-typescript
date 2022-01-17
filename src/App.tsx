import React, { useState, useRef } from 'react';
import './App.css';


type FormElement = React.FormEvent<HTMLFormElement>

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([])
  const taskInput = useRef<HTMLInputElement>(null)


  function handleSubmit(e: FormElement) {
    console.log("evento", newTask);
    e.preventDefault();
    if (!newTask) {
      alert("Insert Task")

    } else {

      addTask(newTask);
      console.log(tasks);
      setNewTask("")
      taskInput.current?.focus();
    }

  }

  function addTask(name: string): void {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)

  }

  function toggleDoneTask(i: number): void {
    const newTasks: ITask[] = [...tasks]
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
  }

  function removeTask(i: number): void {
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(i, 1)
    setTasks(newTasks)


  }

  return (

    <div className='container p-4'>
      <h1 className='text-center' >CRUD React-Type Script </h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body ">
              <form onSubmit={handleSubmit}>
                <input
                  className='form-control'
                  autoFocus={true}
                  type="text"
                  value={newTask}
                  ref={taskInput}
                  onChange={e => setNewTask(e.target.value)} />
                <div className="d-grid gap-2 mt-2">
                  <button className='btn btn-success' >Save</button>
                </div>
              </form>
            </div>
          </div>
          {
            tasks.map((t: ITask, i: number) =>
            (
              <div className='d-flex flex-row justify-content-between card card-body mt-2 ' key={i} >
                <h3 style={{ textDecoration: t.done ? "line-through" : "" }} >{t.name}</h3>
                <div>
                  <button className='btn btn-primary me-2'
                    onClick={() => toggleDoneTask(i)} >
                    {t.done ? "✓" : "✗"}
                  </button>
                  <button className='btn btn-danger' onClick={() => removeTask(i)} >🗑 </button>
                </div>

              </div>
            )
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
