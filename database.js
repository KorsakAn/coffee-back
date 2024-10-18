const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./coffee.db', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message)
  } else {
    console.log('Подключение к базе данных успешно.')
  }
})


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    imageUrl TEXT NOT NULL
  )`)

  db.get("SELECT COUNT(*) AS count FROM items", [], (err, row) => {
    if (row.count === 0) {
      const items = [
        {
          name: 'Berry cappuchino',
          price: 200,
          imageUrl: 'https://sun9-24.userapi.com/impg/tC-DIxKjVfOfpTDWB7BBd7YqGCkf_tXy-AJbFQ/fnqDynt_bhE.jpg?size=1080x1080&quality=95&sign=708965e5e559d855bd33193bf2526b24&type=album',
        },
        {
          name: 'Latte lemon pie',
          price: 245,
          imageUrl: 'https://sun9-55.userapi.com/impg/RGwT5VCKPgpSqtCJI8j_eQcvq574Og6ryVaAyQ/oZ_g-I4_4po.jpg?size=1080x1080&quality=95&sign=6aad92e1672ea07408878fcb8fa162db&type=album',
        },
        {
          name: 'Glintvein jeckfruit',
          price: 320,
          imageUrl: 'https://sun9-80.userapi.com/impg/JbXy09h8RlukL0VylHGYgVpq5yfXSGwaASbapQ/jTQlCvxdslY.jpg?size=1080x1080&quality=95&sign=7e619b2eed6d3cbd2defe798370c08f4&type=album',
        },
        {
          name: 'Hot chokolate',
          price: 340,
          imageUrl: 'https://sun9-44.userapi.com/impg/E2q6Mkq4YNOqcefqS7EZYG3CmwgfpCxW_G_6wg/TXUgo27M4uA.jpg?size=1080x1080&quality=95&sign=42c2a5ead04ae9535d7fd7426fe512e0&type=album',
        },
        {
          name: 'Chilli latte',
          price: 290,
          imageUrl: 'https://sun9-4.userapi.com/impg/tVm55UsZilcEEkZDGKhyxnniTAJZrnbB5_ISEQ/8iT3wRzUa-k.jpg?size=1080x1080&quality=95&sign=fa47929f60212db48b307afb793b396c&type=album',
        },
        {
          name: 'Lavande raf',
          price: 360,
          imageUrl: 'https://sun9-42.userapi.com/impg/PsIY8gX4ibCgzBYvEsUkirTc1VLlgqzR12r-Jw/CvzPnTAq9x8.jpg?size=1080x1080&quality=95&sign=ec0775012b6b7d7bc4ae1b002372aa0c&type=album',
        },
      ]
      const stmt = db.prepare("INSERT INTO items (name, price, imageUrl) VALUES (?, ?, ?)")
      items.forEach(item => {
        stmt.run(item.name, item.price, item.imageUrl)
      })
      stmt.finalize()
      console.log('Начальные данные успешно вставлены в таблицу items.')
    }
  })
})

module.exports = db