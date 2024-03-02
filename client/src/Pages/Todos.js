import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../App";
import axios from "axios";
import TodoItems from "../Components/TodoItems";
const Todos = () => {
  const navigate = useNavigate();

  const [token, setToken] = useContext(store);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const deleteHandler = (id) => {
    axios
      .delete(`${window.location.origin}/todo/deleteTodo/${id}`, {
        headers: {
          "x-token": token, // Ensure authorization
        },
      })
      .then(() => {
        alert("Todo deleted");
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        `${window.location.origin}/todo/addTodo`,
        { todo: newTodo },
        {
          headers: {
            "x-token": token, // Ensure you are passing the token for authorization
          },
        }
      )
      .then(() => {
        alert("Todo added");
        setNewTodo("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${window.location.origin}/user/todos`, {
          headers: {
            "x-token": token,
          },
        })
        .then((arr) => {
          setTodos(arr.data);
        })
        .catch((err) => {
          console.error("Error fetching todos:", err);
          // Assuming any error here might indicate an issue with the token,
          // but you should have some logic or heuristic to decide.
          // This could be as simple as redirecting after any error,
          // or as complex as inspecting the error and deciding.
          localStorage.removeItem("token"); // Remove the potentially invalid token
          setToken(null); // Update state/context to reflect logged out status
          navigate("/login"); // Redirect to login as a fallback
        });
    }
  }, [token, navigate, todos]);
  return (
    <div className="m-4">
      <h2>Here are your todos</h2>
      <form onSubmit={submitHandler} className="m-3">
        <input
          type="text"
          name="newTodo"
          value={newTodo}
          placeholder="Enter your todo task"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input
          type="submit"
          name="submit"
          value="submit"
          className="btn-success"
        />
      </form>
      {todos.length > 0 ? (
        <TodoItems todos={todos} deleteTask={deleteHandler} />
      ) : null}
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          localStorage.removeItem("token"); // Remove token
          setToken(null);
        }}
      >
        Logout
      </button>
      <p className="m-5 text-warning">
        You will be logged out automatically after 10minutes
      </p>
    </div>
  );
};

export default Todos;
