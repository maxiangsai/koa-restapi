const mongoose = require('mongoose')

function initDB() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.connection.once('open', () => {
    console.log('数据库开启')
  })
  mongoose.connection.on('error', () => {
    throw new Error(`无法连接到数据库：${process.env.MONGODB_URI}`)
  })
}

module.exports = initDB;