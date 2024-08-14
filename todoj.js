const InputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (InputBox.value == '') {
        alert('Please enter a task');
    } else {
        let li = document.createElement('li');
        li.innerHTML = InputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = 'x';
        li.appendChild(span);
    }
    InputBox.value = '';
    saveData();
}
let clickTimeout;
let isDoubleClick = false;

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName == 'LI') {
        clickTimeout = setTimeout(() => {
            if (!isDoubleClick) {
                e.target.classList.toggle('highlight');
            }
            isDoubleClick = false;

        }, 200);
      
    } else if (e.target.tagName == 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

listContainer.addEventListener('dblclick', function (e) {
    if (e.target.tagName == 'LI') {
        clearTimeout(clickTimeout);
        isDoubleClick = true;
        const li = e.target;
        const originalText = li.firstChild.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        li.innerHTML = '';
        li.appendChild(input);
        input.focus();

        input.addEventListener('blur', function (e) {
            if (input.value == '') {
                li.innerHTML = originalText;
                
            } else {
                li.innerHTML = input.value;
            }
           
            let span = document.createElement('span');
            span.innerHTML = 'x';
            li.appendChild(span);
            saveData();
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }
}, false);

function saveData() {
    localStorage.setItem('todoList', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('todoList');
}

showTask();