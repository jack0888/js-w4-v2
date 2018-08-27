#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version('1.0.15')
    .description('Auto webpack4 + vue2 project template')
program
    .command('* init')
    .action(function() {
        log.info('目前js-w4-v2只有一种模板，示例：js-w4-v2 init')
        let pwd = shell.pwd()
        let url = `https://github.com/jack0888/js-w4-v2.git`;
        log.info(`正在${url}拉取模板代码 ...`)
        clone(url, pwd + ``, null, function() {
            shell.rm('-rf', pwd + `/.git`)
            log.info('模板工程建立完成')
        })
    })
program.parse(process.argv)