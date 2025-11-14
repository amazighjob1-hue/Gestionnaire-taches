// Sélection des éléments HTML
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDesc = document.getElementById('taskDesc');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filters button');

// Récupération des tâches depuis le localStorage ou tableau vide
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Fonction pour sauvegarder les tâches
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour afficher les tâches
function renderTasks(filter = 'all') {
  taskList.innerHTML = ''; // vide la liste avant de re-render
  tasks.forEach((task, index) => {
    if (filter === 'completed' && !task.completed) return;
    if (filter === 'pending' && task.completed) return;

    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.title} - ${task.desc}</span>
      <div>
        <button onclick="toggleComplete(${index})">✔️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Ajouter une tâche
function addTask(title, desc) {
  tasks.push({title, desc, completed: false});
  saveTasks();
  renderTasks();
}

// Marquer une tâche comme terminée / non terminée
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Supprimer une tâche
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Événement pour ajouter une tâche depuis le formulaire
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  addTask(taskTitle.value, taskDesc.value);
  taskTitle.value = '';
  taskDesc.value = '';
});

// Événement pour filtrer les tâches
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => renderTasks(btn.dataset.filter));
});

// Afficher les tâches au chargement de la page
renderTasks();
