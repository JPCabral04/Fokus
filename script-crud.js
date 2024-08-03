const buttonAddTask = document.querySelector('.app__button--add-task');
const buttonCancel = document.querySelector('.app__form-footer__button--cancel');
const formAddTask = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');
const taskDescriptionParagraph = document.querySelector('.app__section-active-task-description');

const buttonRemoveConcludedTasks = document.querySelector('#btn-remover-concluidas');
const buttonRemoveAllTasks = document.querySelector('#btn-remover-todas');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask = null;
let liSelectedTask = null;

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTask(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '12');
    circle.setAttribute('fill', '#FFF');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z');
    path.setAttribute('fill', '#01080E');

    svg.appendChild(circle);
    svg.appendChild(path);

    const paragraph = document.createElement('p');
    paragraph.textContent = task.description;
    paragraph.classList.add('app__section-task-list-item-description');

    const editButton = document.createElement('button');
    editButton.classList.add('app_button-edit');
    const imageButton = document.createElement('img');
    imageButton.setAttribute('src', '/imagens/edit.png');
    editButton.append(imageButton);

    editButton.onclick = () => {
        const newDescription = prompt("Qual é o novo nome da tarefa?");
        if (newDescription) {
            paragraph.textContent = newDescription;
            task.description = newDescription;
            updateTasks();
        }
    }

    li.append(svg);
    li.append(paragraph);
    li.append(editButton);

    if (task.concluded) {
        li.classList.add('app__section-task-list-item-complete');
        editButton.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(taskListItemActive => {
                    taskListItemActive.classList.remove('app__section-task-list-item-active');
                });

            if (selectedTask == task) {
                taskDescriptionParagraph.textContent = '';
                selectedTask = null;
                liSelectedTask = null;
                return;
            }

            selectedTask = task;
            liSelectedTask = li;
            taskDescriptionParagraph.textContent = task.description;

            li.classList.add('app__section-task-list-item-active');
        }
    }

    return li;
}

buttonAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
});

buttonCancel.addEventListener('click', () => {
    textArea.value = '';
    formAddTask.classList.add('hidden');
});

formAddTask.addEventListener('submit', (taskSubmit) => {
    taskSubmit.preventDefault();

    const task = {
        description: textArea.value,
        concluded: false
    };

    tasks.push(task);
    const newTask = createTask(task);
    ulTasks.append(newTask);
    updateTasks();
    textArea.value = '';
    formAddTask.classList.add('hidden');
});

// Recarregar as tarefas da localStorage ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    tasks.forEach(task => {
        const newTask = createTask(task);
        ulTasks.append(newTask);
    });
});

document.addEventListener('FocusFinished', () => {
    if (selectedTask && liSelectedTask) {
        liSelectedTask.classList.remove('app__section-task-list-item-active');
        liSelectedTask.classList.add('app__section-task-list-item-complete');
        liSelectedTask.querySelector('button').setAttribute('disabled', 'disabled');
        selectedTask.concluded = true;
        updateTasks();
    }
});

const removeTasks = (onlyConcluded) => {
    const selector = onlyConcluded ? ".app__section-task-list-item-complete" : ".app__section-task-list-item";
    document.querySelectorAll(selector).forEach(task => {
        task.remove();
    });
    tasks = onlyConcluded ? tasks.filter(task => !task.concluded) : [];
    updateTasks();
};

buttonRemoveConcludedTasks.onclick = () => removeTasks(true);
buttonRemoveAllTasks.onclick = () => removeTasks(false);
