const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app); 


app.listen(process.env.PORT || 3000, (err) => {
    console.log('Servidor da TheAnimeApi Funcionando na porta:' + this.address().port);
});


