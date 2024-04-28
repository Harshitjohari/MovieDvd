var express = require("express");
var cors = require('cors')
const port = 5500;

const connection = require('./config/database') 
const path = require('path');

var bodyParser = require('body-parser');
var app = express();
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connection.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

var adminRoutes = require('./routes/admin');
var userRoutes = require('./routes/user');

app.use('/api/v1/admin',adminRoutes);
app.use('/api/v1/user',userRoutes);


app.get('/',(req,res) => {
  res.send("hello world");
})
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

