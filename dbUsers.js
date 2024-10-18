const sqlite3 = require('sqlite3').verbose()

const dbUser = new sqlite3.Database('./users.db')

dbUser.serialize(() => {
  dbUser.run(`CREATE TABLE IF NOT EXISTS users
      (user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
      )`, (err) => {
      if (err) {
          console.error('Error creating table:', err.message)
      } else {
          console.log('Table "users" created or already exists.')
      }
  })
})

module.exports = dbUser