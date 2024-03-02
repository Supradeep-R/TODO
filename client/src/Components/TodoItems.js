import React from "react";

const Todos = ({ todos, deleteTask }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      {todos.map((todo) => (
        <div className="shadow w-75 p-3 mb-3 bg-white rounded" key={todo._id}>
          {todo.todo} &nbsp;{" "}
          <button
            className="btn btn-danger m-2"
            onClick={() => deleteTask(todo._id)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
