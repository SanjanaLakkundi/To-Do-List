document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from local storage when page loads
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const renderTasks = () => {
      taskList.innerHTML = ''; // Clear task list
  
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
  
        // Create input for task text
        const taskText = document.createElement('input');
        taskText.type = 'text';
        taskText.value = task.text;
        taskText.readOnly = true;
        taskItem.appendChild(taskText);
  
        // Mark as completed checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
          tasks[index].completed = checkbox.checked;
          updateTasks();
        });
        taskItem.appendChild(checkbox);
  
        // Edit task button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', () => {
          if (editBtn.innerText === 'Edit') {
            taskText.readOnly = false;
            taskText.focus();
            editBtn.innerText = 'Save';
          } else {
            tasks[index].text = taskText.value;
            taskText.readOnly = true;
            editBtn.innerText = 'Edit';
            updateTasks();
          }
        });
        taskItem.appendChild(editBtn);
  
        // Delete task button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1);
          updateTasks();
        });
        taskItem.appendChild(deleteBtn);
  
        taskList.appendChild(taskItem);
      });
    };
  
    const updateTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
  
    // Add new task
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText === '') {
        alert('Task cannot be empty');
        return;
      }
      tasks.push({ text: taskText, completed: false });
      taskInput.value = ''; // Clear input field
      updateTasks();
    });
  
    // Render tasks initially
    renderTasks();
  });