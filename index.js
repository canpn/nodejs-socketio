var express = require('express');
var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');


var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80, function(){
    console.log('Server listen port 80');
});

io.on('connection', function(socket){

    console.log('someone is connect to server');
    console.log('ID::: '+socket.id);

    socket.on('client-send-data', function(data){
        console.log('data:::', data);
        io.sockets.emit('server-send-data', data);
    });

    socket.on('disconnect',function(){
        console.log('Close connection ID::: '+socket.id);
    });
});

app.get('/', function(req, res){
    res.render('home');
});
