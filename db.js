const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/WLiT_project_busRoutes');

const db = mongoose.connection;

db.on('error', (err) => console.log('MongoDB error occured:', err))
db.once('open', () => {
  console.log('Connected to MongoDB')
})