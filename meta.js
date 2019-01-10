const path = require('path')
const fs = require('fs')

const {
    sortDependencies,
    printMessage,
    initGit,
    installDependencies
} = require('./utils')

module.exports = {
    prompts: {
        name: {
            type: 'string',
            required: true,
            message: 'Project name',
            default: "pumelo-hello-vue"
        },
        description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'a iview vue project ',
        },
        author: {
            type: 'string',
            message: 'Author',
            default: "you name"
        },
        version: {
            type: 'string',
            message: 'Project version',
            default: "0.0.1"
        }
    },
    complete: function(data, { chalk }) {
        const green = chalk.green
        sortDependencies(data, green)
        // installDependencies(green,'yarn','./'+data.destDirName)
        initGit(data).then(()=>{
            console.log(11111)
        })
        printMessage(data, chalk)
    },
}
