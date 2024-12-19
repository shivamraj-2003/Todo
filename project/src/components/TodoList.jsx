import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../store';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  const handleAdd = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ id: Date.now(), text: newTodo }));
      setNewTodo('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdate = () => {
    if (updatedText.trim()) {
      dispatch(updateTodo({ id: editingTodo.id, text: updatedText }));
      setIsModalOpen(false);
      setUpdatedText('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-lg border border-gray-300">
        <h1 className="text-2xl font-semibold text-center mb-6 text-blue-600">Todo List</h1>

        {/* Add Todo Section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border p-2 rounded-md flex-grow transition-all duration-300 hover:border-blue-500"
            placeholder="Enter a new todo"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </div>

        {/* Todo List Container */}
        <div className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 p-4 rounded-md shadow-lg mt-6 transition-all duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-xl font-semibold text-white mb-4">Your Todos</h2>
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-md transition-transform duration-300 transform hover:scale-105"
              >
                <span>{todo.text}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setEditingTodo(todo);
                      setUpdatedText(todo.text);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
              <input
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                className="border p-2 rounded-md w-full mb-4"
                placeholder="Edit todo"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
