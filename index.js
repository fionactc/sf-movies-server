require('dotenv').config();

let express    = require('express');
let app        = express();
let bodyParser = require('body-parser');
let cors       = require('cors'); 

let cache = require('./src/cache').cache;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{ res.send('Welcome') })
app.use('/api', cache(86400), require('./src/movie'));

module.exports = app;

app.listen(8000, function() {
  console.log('Listening on port 8000');
})
