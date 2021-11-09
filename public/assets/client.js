
const socket = io('lit-bayou-68554.herokuapp.com');

let username = prompt("Enter your name to join");
while(username == null){
    username = prompt("Enter your name to join");
}

socket.emit('new-user-joined' , username);
const addUser = function(name){
    let list = document.getElementById('user');
    let node = document.createElement('li');
    let a = document.createElement('a');
    let i = document.createElement('i');
    a.setAttribute('href' , '#');
    console.log(name);
    i.classList.add('fas','fa-user');
    a.appendChild(i);
    a.textContent = name;
    node.appendChild(a);
    list.appendChild(node);
}

const form = document.getElementById("mform");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("messageInp");
  const message = messageInput.value.trim();
  if (message == "") {
    return;
  }
  append(message, "right");
  socket.emit('send' , message);
  messageInput.value = "";
});
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("messageBox");
  messageElement.classList.add(position);
  document.getElementById("send-container").append(messageElement);
  document.getElementById("send-container").scrollTop = document.getElementById("send-container").scrollHeight;
};

socket.on('add-user', name =>{
    addUser(name);
});

socket.on('left-user', name =>{
    let lis = document.querySelectorAll("#user li");
    for (var i = 0, li; li = lis[i]; i++) {
        if (li.textContent === name ){
            li.parentNode.removeChild(li);
            break;
        }
    }
});

socket.on('user-joined' , name => {
    append(`${name} joined the chat` , 'mid');
});

socket.on('receive' , data => {
    append(`${data.name} : ${data.message}` , 'left');
});

socket.on('left' , data =>{
    append(`${data.name} left the chat !` , 'mid');
});
