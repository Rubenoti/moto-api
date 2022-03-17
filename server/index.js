const express = require('express');
const cors = require('cors');
const { setError } = require('./src/utils/errors/errors');
const { connect } = require('./src/utils/db/db');
//PORT
const PORT = process.env.PORT || 8080;

// INITIALIZE APP
connect();
const app = express();

//API DOCUMENTATION TODO

// HEADERS CONFIGURATION
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

//PROXIES CONFIGURATION
app.use(cors({
    origin: ['http://localhost:3000', "https://localhost:4200"],
    credentials: true
}));

//DATA LIMIT
app.use(express.json({ limit: '5mb' }));

//URI CONFIGURATION
app.use(express.urlencoded({ extended: true, limit: '5mb' }));


//ROUTES TODO

//ERROR HANDLING TODO
app.use('*', (req, res, next) => {
    return next(setError(404, 'Not Found'));
});

//API !SHOW
app.disable('x-powered-by');

//LISTEN
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
});