// let rooms = ['Main']
// let usersName = ['suru' , 'kiki' ,'rahul' , 'shiva' , 'ram' , 'krishna', 'neha' , 'jacob' , 'bela']
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
const path = require('path');

const io = require('socket.io')(8000);

const users  = {};

io.on('connection', socket => {
    socket.on('new-user-joined' , name =>{
        users[socket.id] = name;
        // socket.broadcast.emit('user-joined' , name);
        socket.broadcast.emit('add-user', name);
        for(let key in users){
            socket.emit('add-user',users[key]);
        }
    });
    socket.on('send' , message => {
       socket.broadcast.emit('receive' , {message: message , name: users[socket.id]});
    });
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left-user', users[socket.id]);
        // socket.broadcast.emit('left' , {message: message , name: users[socket.id]});
        delete users[socket.id];
    });
});

module.exports = function(app){
    app.get('/',function(req,res){
        res.render('index');
    });
};