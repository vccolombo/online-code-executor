const sync = require("child_process").spawnSync

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

    const commandToRun = languages[language](code)

    result = sync(commandToRun.compiler, commandToRun.parameters, {
        encoding: 'utf-8'
    })

    return result
    
}

module.exports = codeExecutor