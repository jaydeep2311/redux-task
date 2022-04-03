import React from "react";
import { getTodos } from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [list, setlist] = React.useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const showTodos = () => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((res) => dispatch(getTodos(res)));
  };
  React.useEffect(() => {
    showTodos();
  }, []);

  function handleAdd() {
    const payload = {
      task: list,
      status: false,
    };
    fetch("http://localhost:3001/todos", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => showTodos());
  }
  const handledelete = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    }).then((res) => showTodos());
  };
  const handletoggle = (id, status) => {
    if (status) {
      status = false;
    } else {
      status = true;
    }
    console.log(status);
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: status,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => showTodos());
  };
  return (
    <div>
      <input
        type="text"
        value={list}
        placeholder="Add task"
        onChange={(e) => {
          setlist(e.target.value);
          console.log(list);
        }}
      />
      <button onClick={handleAdd}>Add</button>
      <hr />
      <h1>Todos</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((el) => {
            return (
              <tr key={el.id}>
                <td>{el.task}</td>
                <td>
                  {el.status ? "completed" : "Not completed"}
                  <br />
                  <button onClick={() => handletoggle(el.id, el.status)}>
                    toggle
                  </button>
                </td>
                <td>
                  <button onClick={() => handledelete(el.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
