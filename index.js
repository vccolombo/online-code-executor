var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var codeExecutor = require("./online_code_executor");

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Client connection received');

    socket.on('runCodeRequest', (data) => {
        const language = data.language;
        const code = data.code;
        console.log(`New request: 
        Language = ${language}
        Code: ${code}`);

        codeExecutor({
            language: language,
            code: code
        }, (result) => {
            socket.emit(result);
        });
    });


    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

const port = 3000;
http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})