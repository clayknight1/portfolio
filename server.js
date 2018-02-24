const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 8080));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'CLAY',
      lastName: 'KNIGHT'
    }
  }
  res.render('index', data);
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

app.post('/thanks', (req, res) => {
  var userInfo = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  }
  
  client.messages
    .create({
      to: '+14155318563',
      from: '+14158959704',
      body: `Message from: ${userInfo.name}` + '\n' + `Email: ${userInfo.email}` + '\n' + `Message: ${userInfo.message}`,
    })
    .then((message) => console.log(message.sid));
  res.render('thanks', {userInfo: req.body})
});


app.listen(app.get('port'), () => {
  console.log('listening at http://localhost:' + app.get('port'));
});
