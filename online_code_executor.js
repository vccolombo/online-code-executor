const spawn = require("child_process").spawn

const generateRandomId = () => {
    const max = 1000000000;
    const min = 0;
    return Math.random() * (max - min) + min;
}

const languages = {
    javascript: (code) => {
        const id = generateRandomId();
        const docker_command = `run --rm --name ${id} node:latest node -p`.split(' ').concat(code);
        return {
            start: 'docker',
            args: docker_command
        }
    },
    python3: (code) => {
        const id = generateRandomId();
        const docker_command = `run --rm --name ${id} python:3 python -c`.split(' ').concat(code);
        return {
            start: 'docker',
            args: docker_command
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

    const command_to_run = languages[language](code);

    var run_command = spawn(command_to_run.start, command_to_run.args, {
        encoding: 'utf-8'
    });

    var result = '';

    run_command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        result += data.toString();
        callback(result);
    });

    run_command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        result += data.toString();
        callback(result);
        run_command.kill();
    });

    run_command.on('exit', function (finish_code, signal) {
        console.log(
            `child process exited with code ${finish_code} and signal ${signal}`
        );
    });

    run_command.on('close', (finish_code) => {
        console.log(`child process exited with code ${finish_code}`);
    });
}

module.exports = codeExecutor