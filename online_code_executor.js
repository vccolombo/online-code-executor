const sync = require("child_process").spawn

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
}) {
    if (!languages[language]) {
        return false;
    }

    const command_to_run = languages[language](code)

    const run_command = sync(command_to_run.start, command_to_run.args, {
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

    return true;
    
}

module.exports = codeExecutor