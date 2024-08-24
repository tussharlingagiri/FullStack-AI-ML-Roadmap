import React, { useState } from 'react';

function ToDoForm({ addToDo }) {
    const [task, setTask] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) {
            setError('Task is required');
            return;
        }
        addToDo(task);
        setTask('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
                className="todo-input"
            />
            <button type="submit" className="add-button">Add</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default ToDoForm;