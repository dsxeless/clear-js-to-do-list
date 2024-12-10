document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const clearTasksButton = document.getElementById('clearTasksButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert("The task can't be empty");
        }
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskButton.click();
        }
    });

    clearTasksButton.addEventListener('click', () => {
        if (confirm('r u sure?')) {
            taskList.innerHTML = '';
            localStorage.removeItem('tasks'); 
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');

        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete">Delete</button>
        `;

        li.querySelector('span').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks(); 
        });

        li.querySelector('.delete').addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks(); 
        });

        taskList.appendChild(li);
        saveTasks(); 
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').textContent;
            const completed = li.classList.contains('completed');
            tasks.push({ text: taskText, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span ${task.completed ? 'style="text-decoration: line-through; color: #aaa;"' : ''}>
                    ${task.text}
                </span>
                <button class="delete">Delete</button>
            `;

            li.querySelector('span').addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks();
            });

            li.querySelector('.delete').addEventListener('click', () => {
                taskList.removeChild(li);
                saveTasks();
            });

            taskList.appendChild(li);
        });
    }
});
