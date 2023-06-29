import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import { useDebounce } from "./usehooks";

function App() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const valueSearch = useDebounce(searchQuery, 2000);

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    const [sortTodoFlag, setSortTodoFlag] = useState(false);
    const sortTodos = () => {
        setSortTodoFlag(!sortTodoFlag);
    };

    useEffect(() => {
        fetch(
            sortTodoFlag
                ? `http://localhost:3005/todos?q=${valueSearch}`
                : `http://localhost:3005/todos?_sort=title&_order=asc`
        )
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, [valueSearch, sortTodoFlag]);

    const createTask = async (payload) => {
        const response = await fetch("http://localhost:3005/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const post = await response.json();
        setData((prevState) => [...prevState, post]);
    };
    const removeTask = async (id) => {
        await fetch(`http://localhost:3005/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        setData(data.filter((post) => post.id !== id));
    };
    const updatePost = async (id, payload) => {
        const postItemIndex = data.findIndex((post) => post.id === id);
        const postItem = data.find((post) => post.id === id);
        if (postItemIndex !== -1) {
            const response = await fetch(`http://localhost:3005/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...postItem, title: payload }),
            });
            const updatePost = await response.json();

            const copyData = data.slice();
            copyData[postItemIndex] = updatePost;
            setData(copyData);
        }
    };

    return (
        <div>
            <input
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchQuery}
            />
            <button onClick={sortTodos}>Сортировать</button>
            <ul>
                {data.length > 0 ? (
                    <div>
                        {data.map((post) => (
                            <PostItem
                                key={post.id}
                                {...post}
                                handleDelete={removeTask}
                                handleUpdate={updatePost}
                            />
                        ))}
                    </div>
                ) : (
                    <h1>Постов нет</h1>
                )}
            </ul>
            <button
                onClick={() =>
                    createTask({
                        title: "Новая заметка",
                        completed: false,
                    })
                }
            >
                Отправить Пост
            </button>
        </div>
    );
}

export default App;
