var Socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');

var username = prompt('Enter your username');
Socket.emit('chat message', `User ${username} connected`);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.value) {
        Socket.emit('chat message', input.value);
        input.value = '';
    }
});

Socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});