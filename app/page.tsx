'use client'
import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  const handleCheckboxChange = async (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    try {
      // Update the todo item on the server
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: !todos.find(todo => todo.id === id)!.completed,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl">TODO List</h1>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center space-x-2 sm:space-x-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo.id)}
              className="form-checkbox h-5 w-5 text-blue-600 transition duration-200 ease-in-out"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-black'} text-sm sm:text-base`}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
