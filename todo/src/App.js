import "./App.css";
import { useEffect, useState } from "react";
import Completed from "./components/completed";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [refreshTodoFlag, setRefreshTodoFlag] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const hadleSearhQuery = ({ target }) => {
    setSearchQuery(target.value);
  };
  const [sortTodoFlag, setSortTodoFlag] = useState(false);
  const sortTodos = () => {
    setSortTodoFlag(!sortTodoFlag);
  };

  const refreshTodo = () => setRefreshTodoFlag(!refreshTodoFlag);

  useEffect(() => {
    fetch(
      sortTodoFlag
        ? `http://localhost:3005/todos?q=${searchQuery}`
        : `http://localhost:3005/todos?_sort=title&_order=asc`
    )
      .then((loadedData) => loadedData.json())
      .then((loadedList) => {
        setTodoList(loadedList);
      });
  }, [refreshTodoFlag, searchQuery, sortTodoFlag]);

  const requestAddTodos = () => {
    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then(() => {
        refreshTodo();
      });
  };

  const requestUpdateTodos = () => {
    fetch("http://localhost:3005/todos/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: true,
      }),
    }).then(() => refreshTodo());
  };

  const requestDeleteTodos = () => {
    fetch("http://localhost:3005/todos/1", {
      method: "DELETE",
    }).then(() => refreshTodo());
  };

  return (
    <div className="App">
      <input
        placeholder="Поиск"
        value={searchQuery}
        onChange={hadleSearhQuery}
      ></input>
      {todoList.map(({ id, title, completed }) => (
        <div className="Do" key={id}>
          <span>{title}</span>
          {Completed(completed)}
        </div>
      ))}
      <button onClick={sortTodos}>Сортировать</button>
      <button onClick={requestAddTodos}>Добавить дело</button>
      <button onClick={requestUpdateTodos}>Обновим первое дело</button>
      <button onClick={requestDeleteTodos}>Удалить 1 дело</button>
    </div>
  );
}

export default App;
