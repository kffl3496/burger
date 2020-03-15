const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const mysql = require('mysql');

portNumber = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'burgers_db',
  port: 3306
});

if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'burgers_db',
    port: 3306
  });
};

app.engine('handlebars', expbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connect as id: ', connection.threadId);
});

//routing
app.get('/', (req, res) => {
  getBurgers().then((data) => {
    res.render('index', {
      burger_data: data
    });
  });
});

app.post('/api/devour/:id', (req, res) => {
  const id = req.params.id;
  const _res = res;
  connection.query(`update burgers set devoured = 1 where id = ${id}`, (err, res) => {
    if (err) {
      throw err;
    }
    _res.redirect('/');
  });
});

app.post('/api/create', (req, res) => {
  const _res = res;
  connection.query(`insert into burgers (burger_name, devoured) values('${req.body.burger_name}', 0)`, (err, res) => {
    if (err) {
      throw err;
    }
    _res.redirect('/');
  });
});

function getBurgers() {
  return new Promise((resolve, reject) => {
    connection.query('select * from burgers;', (err, res) => {
      if (err) {
        throw error;
      }
      const ret = JSON.parse(JSON.stringify(res));
      resolve(ret);
    });
  });
}

app.listen(portNumber, () => {
  console.log('Server is starting on port ', portNumber);
});
