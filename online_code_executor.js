const sync = require("child_process").spawn

const languages = {
    javascript: function(code) {
        return {
            compiler: 'node',
            parameters: ['-p', code]
        }
    },
    python3: function(code) {
        return {
            compiler: 'python3',
            parameters: ['-c', code]
        }
    }
}

function codeExecutor({
    language,
    code
}) {
    if (!languages[language]) {
        return false
    }

    const command_to_run = languages[language](code)

    const run_command = sync(command_to_run.compiler, command_to_run.parameters, {
        encoding: 'utf-8'
    })

    run_command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    run_command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    run_command.on("exit", function(finish_code, signal) {
        console.log(
          "child process exited with " + `code ${finish_code} and signal ${signal}`
        );
    });
    
    run_command.on('close', (finish_code) => {
    console.log(`child process exited with code ${finish_code}`);
    });

    return true
    
}

// codeExecutor({language:"python3", 
//     code:`
// message = "Hello python"
// print(message)
//     `})

//     codeExecutor({language:"javascript", 
//     code:`
//         const message = "Hello JS"
//         console.log(message)
//     `})
module.exports = codeExecutor