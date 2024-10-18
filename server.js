const express = require('express')
const cors = require('cors')
const db = require('./database')
const authRouter = require('./authRouter')
const bodyParser = require('body-parser')


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
}))
app.use(express.json())
app.use(bodyParser.json())

app.use('/auth', authRouter)

app.get('/api/items', (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
})

app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;  
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;

  db.all(`SELECT * FROM items LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
    if (err) {
      console.error('Ошибка получения данных:', err)
      return res.status(500).json({ message: 'Ошибка получения данных', error: err.message })
    }
    
    db.get(`SELECT COUNT(*) AS total FROM items`, (err, countRow) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка подсчета данных' })
      }
      res.json({
        items: rows,
        total: countRow.total
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})