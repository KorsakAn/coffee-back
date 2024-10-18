const express = require('express')

const app = express()

app.set('view engine', 'ejs')
// app.use(express.static('./public/css' - пример)) - промежуточное ПО, отображение статических файлов перед запуском нижеуказанного кода, например css
app.use(express.urlencoded({extended: false}))
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

app.post('/check-user', (req, res) => {
    let username = req.body.username
    if(username == '') {
        return res.redirect('/')
    } else {
        return res.redirect('/user/' + username)
    }
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`)
}) 