import { useState } from "react";
import "./home.css";

function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [editIdx, setEditIdx] = useState(null);

  const keyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  // function to save task in local storage
  function save() {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }
  save();

  // Add Task Function

  function addTask() {
    if (editIdx === null) {
      let temp = [...todos];
      if (input.trim() !== "") {
        temp.push(input);
        setTodos(temp);
        setInput("");
        save();
      } else {
        alert("Please enter task");
      }
    } else {
      if (input.trim() !== "") {
        const newTodos = [...todos];
        newTodos.splice(editIdx, 1, input);
        setTodos(newTodos);
        setInput("");
        save();
        setEditIdx(null);
      } else {
        alert("Please enter task");
      }
    }
  }

  // Edit Function

  function edit(idx) {
    const newTodos = [...todos];
    setInput(todos[idx]);
    setEditIdx(idx);
  }

  // Delete Function

  function dlt(idx) {
    const newTodos = [...todos];
    newTodos.splice(idx, 1);
    // console.log(todos);
    setTodos(newTodos);
    save();
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
              value={input}
              onKeyDown={keyDown}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>

          <button className="btn" onClick={addTask}>
            {editIdx === null ? "Add" : "Edit"}
          </button>
          {/* <button className="btn" onClick={editTask}>
            Edit
          </button> */}
        </div>
        <div className="list">
          {todos.map((todo, index) => {
            return (
              <div key={index} className="listItem">
                <span className="listDesc">
                  {index + 1}. {todo}
                </span>
                {/* Edit SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="20px"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  onClick={() => {
                    edit(index);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                {/* Delete SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="20px"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  onClick={() => {
                    dlt(index);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default TodoList;
