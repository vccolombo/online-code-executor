var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('Client connection received');

    socket.emit('sendToClient', {hello:'world'});

    socket.on('receivedFromClient', function (data) {
        console.log(data);
    })

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

const port = 3000;
http.listen(port, () => {
    console.log(`HTTP server started on port ${port}`)
});
