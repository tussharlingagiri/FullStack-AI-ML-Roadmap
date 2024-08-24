import React, { useState } from 'react';
import ToDoItem from './ToDoItem';
import ToDoForm from './ToDoForm';
import Filter from './Filter';
import './ToDoapp.css';

function ToDoApp() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    const addTodo = (task) => { // function to add a new todo
        const newTodo = {
            id: Date.now(), // unique id
            task, // task: task
            completed: false, // completed is set to false by default
        };
        setTodos([...todos, newTodo]); // add the new todo to the todos array
    };

    const editTodo = (id, newTask) => { // function to edit a todo
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, task: newTask } : todo // if the todo id matches the id of the todo being edited, update the task
        );
        setTodos(updatedTodos);
    };

    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the todo id matches the id of the todo being toggled, toggle the completed status
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id); // filter out the todo with the id that matches the id of the todo being deleted
        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed; // if the filter is set to active, return todos that are not completed
        if (filter === 'completed') return todo.completed; // if the filter is set to completed, return todos that are completed
        return true;
    });

    return (
        <div className="todo-app-container">
            <h1>To-Do List</h1>
            <ToDoForm addToDo={addTodo} /> {/* pass the addTodo function as a prop to the ToDoForm component */}
            <Filter setFilter={setFilter} />
            <ul className="todo-list">
                {filteredTodos.map(todo => (
                    <ToDoItem
                        key={todo.id} 
                        todo={todo}
                        editTodo={editTodo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ToDoApp;