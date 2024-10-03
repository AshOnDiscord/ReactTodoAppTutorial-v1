import { FormEvent, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "Learn React",
      done: true,
    },
    {
      title: "Try Immer",
      done: false,
    },
  ]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        maxWidth: "65ch",
        marginInline: "auto",
      }}
    >
      <h1
        style={{
          marginBottom: "1rem",
          color: "#2563eb",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Todos
      </h1>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <input type="text" />
        <button
          type="submit"
          style={{
            backgroundColor: "#fff",
            padding: "0.25rem 1rem",
          }}
        >
          Add
        </button>
      </form>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.title} />
        ))}
      </ul>
    </div>
  );
}

export default App;
