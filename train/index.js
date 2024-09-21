//Подключение модуля - вывод операционной системы 
// const os = require('os')
// let res = os.platform()
// console.log(res)

// Собственный модуль
// const my_module = require('./my_module')
// let res1 = my_module.add(4, 5)
// let res2 = my_module.minus(10, 5)
// console.log(`Res1: ${res1}, res2: ${res2}`)

// Создание сервера

// const http = require('http')
// const fs = require('fs')

// let server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})

//     if (req.url === '/') {
//         fs.createReadStream('./index.html').pipe(res)
//     } else if (req.url === '/about') {
//         fs.createReadStream('./about.html').pipe(res)
//     }

// })

// const POST = 3000
// const HOST = 'localhost'

// server.listen(POST, HOST, () => {
//     console.log(`Сервер запущен: http://${HOST}:${POST}`)
// })