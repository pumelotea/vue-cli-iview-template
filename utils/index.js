const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn

/**
 * Sorts dependencies in package.json alphabetically.
 * They are unsorted because they were grouped for the handlebars helpers
 * @param {object} data Data from questionnaire
 */
exports.sortDependencies = function sortDependencies(data) {
  const packageJsonFile = path.join(
    data.inPlace ? '' : data.destDirName,
    'package.json'
  )
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile))
  packageJson.devDependencies = sortObject(packageJson.devDependencies)
  packageJson.dependencies = sortObject(packageJson.dependencies)
  fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2) + '\n')
}

/**
 * Prints the final message with instructions of necessary next steps.
 * @param {Object} data Data from questionnaire.
 */
exports.printMessage = function printMessage(data, { green, yellow }) {
  const message = `
# ${green('Project initialization finished!')}
  ${green(' _____   _   _       ___  ___   _____   _       _____')}
  ${green('|  _  \\\\| | | |     /   |/   | | ____| | |     /  _  \\\\')}
  ${green('| |_| | | | | |    / /|   /| | | |__   | |     | | | |')}
  ${green('|  ___/ | | | |   / / |__/ | | |  __|  | |     | | | |')}
  ${green('| |     | |_| |  / /       | | | |___  | |___  | |_| |')}
  ${green('|_|     \\\\_____//_/        |_| |_____| |_____| \\\\____/')}
  ${yellow('vue-cli-iview-template version: 1.0.0')}
Template from Github https://github.com/pumelotea/vue-cli-iview-template

To get started:

  ${yellow(
    `${data.inPlace ? '' : `cd ${data.destDirName}\n  `}${installMsg(
      data
    )}${lintMsg(data)}yarn serve`
  )}
  
`
  console.log(message)
}

/**
 * Spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    )

    spwan.on('exit', () => {
      resolve()
    })
  })
}

function sortObject(object) {
  // Based on https://github.com/yarnpkg/yarn/blob/v1.3.2/src/config.js#L79-L85
  const sortedObject = {}
  Object.keys(object)
    .sort()
    .forEach(item => {
      sortedObject[item] = object[item]
    })
  return sortedObject
}
