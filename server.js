const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'Clay',
      lastName: 'Knight'
    }
  }
  res.render('index', data);
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

app.post('/thanks', (req, res) => {
  var userInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName
    // name: req.body.name,
    // email: req.body.email,
    // message: req.body.message
  }
  res.render('thanks', {contact:userInfo})
});


app.listen(8080, ()=>{
  console.log('listening at http://localhost:8080')
})
