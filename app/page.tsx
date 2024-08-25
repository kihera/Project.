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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 slate-800">
      <h1 className="text-2xl font-bold mb-4">TODO List</h1>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
