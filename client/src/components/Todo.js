import React, { useState } from 'react';

export default function Todo({ item, deleteItem }) {
  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);

  const { id, title, done } = item;

  const onDeleteButtonClick = () => {
    deleteItem(todoItem);
  };

  //title 클릭하면 readonly를 false로 변경
  const offReadOnlyMode = () => {
    const newReadOnly = false;
    setReadOnly(newReadOnly);
  };

  const editEventHandler = (e) => {
    const { title, id, done } = todoItem;
    // const {title, ...rest}
    setTodoItem({
      title: e.target.value,
      id,
      done,
    });

    // setTodoItem({
    //   title: e.target.value,
    //   ...rest
    // })
    console.log(todoItem);
  };

  // enter키 누르면 readOnly true 로 변경
  const editKeyHandler = (e) => {
    if (e.keyCode === 13) {
      setReadOnly(true);
    }
  };

  const checkboxEventHandler = (e) => {
    console.log(e.target.checked);
    setTodoItem({
      ...todoItem,
      done: e.target.checked,
    });
    console.log(todoItem);
  };
  return (
    <div>
      <input
        type="checkbox"
        name={`todo${id}`}
        id={`todo${id}`}
        onChange={checkboxEventHandler}
      ></input>
      {/* <label htmlFor={`todo${id}`}>{title}</label>
       */}
      <input
        type="text"
        value={todoItem.title}
        readOnly={readOnly}
        onClick={offReadOnlyMode}
        onChange={editEventHandler}
        onKeyDown={editKeyHandler}
      ></input>
      <button onClick={onDeleteButtonClick}>Delete</button>
    </div>
  );
}
