const sqlite3 = require('sqlite3').verbose()
const dbUser = new sqlite3.Database('./users.db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./config')
const generateAccessToken = (id, username) => {
    const payload = {
        id, 
        username
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
    registration(req, res) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({message: 'The username and password cannot be empty ', errors})
        }
        const { username, password } = req.body
        const hashPass = bcrypt.hashSync(password, 5)
        dbUser.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashPass], function (err) {
            if (err) {
                return res.status(400).json({ message: 'This username already exists' })
            }
            console.log('User registered with ID:', this.lastID)
            res.status(201).json({ message: 'User registered successfully' })
        })
    }

    async login(req, res) {
        console.log('Login request received') 
        const { username, password } = req.body
    
        dbUser.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
            if (err) {
                console.error('Database error:', err)
                return res.status(500).json({ message: 'Internal server error' })
            }
            if (!user) {
                console.log('User not found:', username)
                return res.status(400).json({ message: 'Invalid username or password' })
            }
    
            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                console.log('Invalid password for user:', username)
                return res.status(400).json({ message: 'Invalid username or password' })
            }
    
            const token = generateAccessToken(user.user_id, user.username)
            console.log('Login successful for user:', username, token)
            return res.json({ token })
        })
    }

    async getUsers(req, res) {
        try {
            dbUser.all("SELECT * FROM users", [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message })
                }
                res.json(rows)
            })
        } catch (error) {
            res.status(400).json({ message: 'Error fetching users' })
        }
    }
}


module.exports = new authController()