document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const addTaskButton = document.getElementById('addTask'); 

    async function fetchTasks() {
        const response = await fetch('/api/operat');
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML =  `
                <span><strong>${task.title}</strong>: ${task.description} (${task.status})</span>
                <div class='task-actions'>
                    <button class='edit-button' onclick="editTask('${task._id}')">Edit</button>
                    <button class='delete-button' onclick="deleteTask('${task._id}')">Delete</button>
                    <button class='completed-button' onclick="markAsCompleted('${task._id}')">Completed</button>
                </div>`;
            taskList.appendChild(li);
        });
    }

    window.markAsCompleted = async (taskId) => {
        try {
            const response = await fetch(`/api/operat/${taskId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Completed' })
            });
            if (!response.ok) {
                throw new Error('Failed to mark task as completed');
            }

            const updatedTask = await response.json();
            console.log('Task marked as completed:', updatedTask);
            fetchTasks(); 
        } catch (err) {
            console.error('Error marking task as completed:', err);
            alert('An error occurred while marking the task as completed.');
        }
    };

    addTaskButton.addEventListener('click', async () => {
        const title = taskTitle.value;
        const description = taskDescription.value;

        if (title) {
            const newTask = { title, description };
            await fetch('/api/operat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });

            taskTitle.value = '';
            taskDescription.value = '';
            fetchTasks();
        } else {
            alert('Please enter a task title');
        }
    });

    window.editTask = async (id) => {
        const newTitle = prompt('Enter new title:');
        const newDescription = prompt('Enter new description:');
        if (newTitle && newDescription) {
            await fetch(`/api/operat/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle, description: newDescription })
            });
            fetchTasks();
        }
    };

    window.deleteTask = async (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`/api/operat/${id}`, {
                    method: 'DELETE'
                });
    
                if (response.ok) {
                    fetchTasks();
                } else {
                    const errorData = await response.json();
                    console.error('Error deleting task:', errorData);
                    alert('Failed to delete task: ' + errorData.message);
                }
            } catch (err) {
                console.error('Error deleting task:', err);
                alert('An error occurred while deleting the task.');
            }
        }
    };

    fetchTasks();
});