import { FormEvent, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { useImmer } from "use-immer";

function App() {
  const [title, setTitle] = useState("");

  const [todos, setTodos] = useImmer([
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
    if (todos.find((todo) => todo.title === title))
      return alert("already exists");
    addTodo({
      title,
      done: false,
    });
    setTitle("");
  };

  const addTodo = (todo: { title: string; done: boolean }) => {
    setTodos((todos) => {
      todos.push(todo);
    });
  };

  const toggleTodo = (todo: { title: string; done: boolean }) => {
    setTodos((todos) => {
      const index = todos.findIndex((t) => t.title === todo.title);
      todos[index].done = !todos[index].done;
    });
  };

  const deleteTodo = (todo: { title: string; done: boolean }) => {
    setTodos((todos) => {
      const index = todos.findIndex((t) => t.title === todo.title);
      delete todos[index];
    });
  };

  const updateTodo = (
    originalTodo: string,
    newTodo: { title: string; done: boolean },
  ) => {
    setTodos((todos) => {
      // duplicate test
      if (todos.find((t) => t.title === newTodo.title)) {
        return alert("name conflict");
      }

      const index = todos.findIndex((t) => t.title === originalTodo);
      if (index === -1) {
        console.error("index not found");
        return;
      }
      console.log(todos, index);
      todos[index] = newTodo;
    });
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
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
          <Todo
            todo={todo}
            key={todo.title}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodo={(newTodo) => updateTodo(todo.title, newTodo)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
