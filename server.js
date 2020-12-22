const express = require('express');
const app = express();
const cors = require('cors');
// routes
const mainRoute = require('./routes/main');

// middlewere
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

app.use(cors({origin: (origin, callback) => callback(null, true), optionsSuccessStatus: 200, credentials: true}));

// init routes
app.use('/api' ,mainRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'));

    app.get(/.*/ , (req,res) => res.sendFile('build/index.html'))
}


const port = process.env.PORT || 5000;
app.listen(port, () =>   console.log('Server is running on port: ' + port));
