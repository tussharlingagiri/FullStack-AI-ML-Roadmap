import React, { useState } from 'react';
import './ToDoItem.css';

function ToDoItem({ todo, editTodo, toggleComplete, deleteTodo }) {
    const [isEditing, setEditing] = useState(false);
    const [task, setTask] = useState(todo.task);

    const handleEdit = () => {
        editTodo(todo.id, task);
        setEditing(false);
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onBlur={handleEdit}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleEdit();
                        }
                    }}
                    className="edit-input"
                />
            ) : (
                <>
                    <input
                        type="checkbox"
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        className="todo-checkbox"
                    />
                    <label htmlFor={`todo-${todo.id}`} className="todo-label" />
                    <span
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                        onDoubleClick={() => setEditing(true)}
                        className="todo-task"
                    >
                        {todo.task}
                    </span>
                    <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
                </>
            )}
        </li>
    );
}

export default ToDoItem;