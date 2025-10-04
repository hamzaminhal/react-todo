import { useState } from "react";
import "./home.css";

function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  function addTask() {
    let temp = [...todos];
    temp.push(input);
    setTodos(temp);
    setInput("");
  }

  return (
    <>
      <main className="todo-wrap">
        <header className="header">
          <div className="avatar">TL</div>
          <div className="title">
            <h1>TODO List</h1>
            <p>List of all Tasks</p>
          </div>
        </header>
        <div className="add-row">
          <div className="field">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              placeholder="Add a new task"
              //   aria-label="Add task"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>

          <button className="btn" onClick={addTask}>
            Add
          </button>
        </div>
        <div className="list">
          {todos.map((todo, index) => {
            return (
              <div key={index}>
                {index + 1}. {todo}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default TodoList;
