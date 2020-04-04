const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const cors = require('cors');

app.use(express.json());
app.use(cors());
//Init middleware
//app.use(logger);

//app.use(express.static(path.join(__dirname, 'public')));

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

app.use('/api/user', require('./routes/api/user'));

