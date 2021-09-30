const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./util/db-config');
const routes = require('./util/routes');

const port = 3001;

const corsOptions = {origin: `http://localhost:3000`};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));

db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to the database!');
    })
    .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
    });

app.get('/', routes.home);
app.post('/add', routes.add);
app.get('/article', routes.findTitle);
app.get('/update/:id', routes.findOne);
app.put('/update/:id', routes.update);
app.delete('/delete/:id', routes.delete);
app.delete('/', routes.deleteAll);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
