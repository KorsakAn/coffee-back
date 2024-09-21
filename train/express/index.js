const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/user/:username', (req, res) => {
    let data = {username: req.params.username, hobbies: ['Foot', 'Basket', 'Skate']}
    res.render('user', data)
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`)
})