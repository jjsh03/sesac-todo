import React, { useState } from 'react';

export default function AddTodo({ addItem }) {
  const [todoItem, setTodoItem] = useState({
    title: '',
  });

  const onButtonClick = () => {
    addItem(todoItem);
    setTodoItem({ title: '' });
  };

  return (
    <div className='AddTodo'>
      <input
        type='text'
        placeholder='Add a task'
        value={todoItem.title}
        onChange={e => setTodoItem({ title: e.target.value })}
        className='newTodo'
      />

      <button onClick={onButtonClick} className='add'>
        ADD
      </button>
    </div>
  );
}
