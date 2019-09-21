const spawn = require("child_process").spawn

const languages = {
    javascript: (code) => {
        return {
            start: 'node',
            args: ['-p', code]
        }
    },
    python3: (code) => {
        return {
            start: 'python3',
            args: ['-c', code]
        }
    }
}

function codeExecutor({
    language,
    code
}, callback) {
    if (!languages[language]) {
        return false;
    }

    const command_to_run = languages[language](code)

    var run_command = spawn(command_to_run.start, command_to_run.args, {
        encoding: 'utf-8'
    });

    var result = '';

    run_command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        result += data.toString();
    });

    run_command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    run_command.on("exit", function (finish_code, signal) {
        console.log(
            "child process exited with " + `code ${finish_code} and signal ${signal}`
        );
    });

    run_command.on('close', (finish_code) => {
        console.log(`child process exited with code ${finish_code}`);
        return callback(result);
    });
}

module.exports = codeExecutor