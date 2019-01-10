const path = require('path')
const fs = require('fs')

const {
    sortDependencies,
    printMessage,
    initGit,
    installDependencies,
    autoRun
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
        },
        autoInitGit:{
            type: 'string',
            message: 'auto init git',
            required: true,
            default: "yes"
        },
        autoInstall:{
            type: 'string',
            message: 'auto install dependencies',
            required: true,
            default: "yes"
        },
        autoRun:{
            type: 'string',
            message: 'auto run',
            required: true,
            default: "yes"
        }

    },
    complete: function(data, { chalk }) {
        const green = chalk.green
        const yellow = chalk.yellow
        let cwd = './'+data.destDirName
        printMessage(data, chalk)
        sortDependencies(data)
        initGit(yellow,cwd,data).then(()=>{
           return installDependencies(yellow,cwd,data)
        }).then(()=>{
           return autoRun(yellow,cwd,data)
        })

    },
}
