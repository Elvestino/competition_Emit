const express = require('express');
const cors = require('cors');
const participanRoutes = require('./routes/participantRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/api', participanRoutes);

(async () => {
    try{
        await sequelize.sync({alter: true});
        console.log('connection reussie')
    } catch(error) {
        console.error('erreur', error)
    }
})();

app.listen(PORT, () => {
    console.log(`mandeha ny server ${PORT}`)
})