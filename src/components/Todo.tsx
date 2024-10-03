function Todo(props: { todo: { title: string; done: boolean } }) {
  return (
    <div className="todo">
      <input type="checkbox" checked={props.todo.done} />
      <h1>{props.todo.title}</h1>
    </div>
  );
}

export default Todo;
