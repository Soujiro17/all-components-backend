const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('./database')

const app = express();

// Settings
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: "50mb", extended: true}));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000}));
app.use(cors({ origin: ["http://localhost:3000", "https://all-components.web.app/"], credentials:  true }));

// Routes
app.use('/api/data', require('./routes/dataRouter.js'));
app.use('/api/pages', require('./routes/pagesRouter.js'));
app.use('/auth', require('./routes/userRouter.js'));
app.use('/customer', require('./routes/customerRouter.js'));

// Server

app.listen(app.get('port'), () =>{
    console.log(`Server running on port ${app.get('port')}`);
})