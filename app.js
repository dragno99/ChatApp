const express = require('express');
const app = express();
const siteController = require('./controllers/sitecontroller');
app.use(express.static('./public'));
app.set('view engine' , 'ejs');
app.engine('ejs' , require('ejs').__express);

siteController(app);

app.listen(process.env.PORT || 3000);

console.log('You are listening at port 3000');
