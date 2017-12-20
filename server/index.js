const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/build`))
app.use(session({
    secret: process.env.SECRET_STRING,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);


// Swag
// const swagURL = "/api/swag";
app.get('/api/swag', swag_controller.read);

//Auth
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);


app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

app.get('/api/search', search_controller.search);




// app.listen(process.env.PORT, () => console.log(`We be JAMMIN' on ${process.env.PORT}`));

const port = 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );