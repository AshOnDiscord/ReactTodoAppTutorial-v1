import { FormEvent, useState } from "react";

function Todo(props: {
  todo: { title: string; done: boolean };
  toggleTodo: (todo: { title: string; done: boolean }) => void;
  deleteTodo: (todo: { title: string; done: boolean }) => void;
  updateTodo: (todo: { title: string; done: boolean }) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(props.todo.title);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setTempTitle(props.todo.title);
  };

  const changeTitle = (e: FormEvent) => {
    e.preventDefault();
    props.updateTodo({ ...props.todo, title: tempTitle });
    setIsEditing(false);
  };

  return (
    <div
      className="todo"
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div
        style={{
          textDecoration: props.todo.done ? "line-through" : "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          checked={props.todo.done}
          onChange={() => props.toggleTodo(props.todo)}
          name={props.todo.title}
          id={props.todo.title}
          style={{
            marginRight: "1rem",
          }}
        />
        {!isEditing ? (
          <label htmlFor={props.todo.title}>{props.todo.title}</label>
        ) : (
          <form
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
            onSubmit={changeTitle}
          >
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              style={{
                width: "100%",
              }}
            />
            <button type="submit">Save</button>
          </form>
        )}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={toggleEditing}>Edit</button>
        <button onClick={() => props.deleteTodo(props.todo)}>X</button>
      </div>
    </div>
  );
}

export default Todo;
