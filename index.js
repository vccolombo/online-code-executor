var express = require('express');
var app = express();
const codeExecutor = require("./online_code_executor");

app.get('/', function (req, res) {
    const language = req.query.language;
    const code = req.query.code;
    console.log(`New request: 
        Language = ${language}
        Code: ${code}`);

    codeExecutor({
        language: language,
        code: code
    }, (result) => {
        res.send(result);
    });


});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})