// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get('/api/:input', function(req, res){
  let user_input = req.params.input

  if(user_input.match(/\d{5,}/)){
    user_input = +user_input
  }

  let unix = new Date(user_input).valueOf()
  let utc = new Date(user_input).toUTCString()

  if (utc == 'Invalid Date'){
    res.json({error: utc})
  }

  res.json({'unix':unix , 'utc':utc})
})

app.get('/api/', function(req, res){
  let unix = new Date().valueOf()
  let utc = new Date().toUTCString()

  res.json({'unix': unix, 'utc': utc})
})