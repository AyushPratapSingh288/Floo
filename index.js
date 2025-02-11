require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/db-config')
const userRoutes = require('./routes/userRoutes')
const lostitemRoutes = require('./routes/lostitemRoutes')
const founditemRoutes = require('./routes/founditemRoutes')
const matchRoutes = require('./routes/matchitemRoutes')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',userRoutes) ;
app.use('/api/lost-items',lostitemRoutes) ;
app.use('/api/found-items', founditemRoutes) ;
app.use('/api/match-item', matchRoutes) ;

const PORT = 4000
const startServer = async () => {
    try {
        await dbConnection(); 
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error.message);
    }
};
startServer();