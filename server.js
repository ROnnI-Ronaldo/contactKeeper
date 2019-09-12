const express = require('express');
const connectedDB = require('./config/db');

const app = express();

connectedDB(); 

//Init meaddleware (with this meaddleware we can use req.body)
app.use(express.json({ extended: false }))

const PORT = process.env.PORT || 5000;

//create routs
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`server runing in ${PORT} port`)
})