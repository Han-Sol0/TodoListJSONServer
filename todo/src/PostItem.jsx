import React, { useState } from "react";

export const PostItem = ({
  id,
  title,
  completed,
  handleDelete,
  handleUpdate,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [postValue, setPosValue] = useState(title);

  const handleChange = (e) => {
    setPosValue(e.target.value);
  };
  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };
  const sendEditPost = (id, data) => {
    handleUpdate(id, data);
    setIsEdit((prevState) => !prevState);
  };
  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "7px",
        padding: "10px 3px",
      }}
    >
      <div>
        {isEdit ? (
          <input value={postValue} onChange={handleChange} />
        ) : (
          <p>{postValue}</p>
        )}
      </div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {}}
      />
      <button onClick={() => handleDelete(id)}>Delete</button>

      {isEdit ? (
        <div>
          <button onClick={() => sendEditPost(id, postValue)}>Отправить</button>
          <button>Отмена</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};
