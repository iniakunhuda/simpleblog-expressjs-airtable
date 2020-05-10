const express = require('express');
const app = express();
var path = require('path');
var routes = require('./routes/index');

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use('/', routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));