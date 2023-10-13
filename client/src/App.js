import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import axios from 'axios';

function App() {
  // console.log(process.env.REACT_APP_DB_HOST);
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_DB_HOST}/todos`);
      setTodoItems(res.data);
    };

    getTodos();
  }, []);

  //todoItems 상태에 새로운 투두를 추가하는 일
  const addItem = async (newItem) => {
    // console.log(newItem); //{title: '저녁 먹기}

    // //newItems id 키 값 넣고, neItem done 키 값
    // newItem.id = todoItems.length + 1;
    // newItem.done = false;

    // //todoItems 배열에 newItems을 추가
    // setTodoItems([...todoItems, newItem]);

    const res = await axios.post(
      `${process.env.REACT_APP_DB_HOST}/todo`,
      newItem
    );
    // console.log(res);
    setTodoItems([...todoItems, res.data]);
  };

  // todoItems 상태에 특정 투두를 삭제하는 일
  const deleteItem = async (targetItem) => {
    // console.log(targetItem);

    await axios.delete(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`
    );

    const newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(newTodoItems);
  };

  const updateItem = async (targetItem) => {
    await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`,
      targetItem
    );
  };

  return (
    <div className="App">
      <div>Total: {todoItems.length}</div>
      <AddTodo addItem={addItem} />
      {/* todoItems 반복,  props 데이터(투두 객체)를 자식 컴포넌트에게 전달 */}
      {todoItems
        .sort((a, b) => b.id - a.id)
        .map((item) => (
          <Todo
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        ))}
    </div>
  );
}

export default App;
