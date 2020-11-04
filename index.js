const Registering = require('./regNumber');
 const routes = require('./routes')
var express = require('express');
const flash = require('express-flash');
const session = require('express-session');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://bantu:s0ty@t0b@n2@localhost:5432/registration';

const pool = new Pool({
    connectionString
});

const register = Registering(pool);
const route = routes(register)

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({
    secret: "Please enter number!!",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.get('/addFlash', async function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});

app.get("/", route.ind);

app.post('/registering', route.posterReg)

app.post("/filter", route.regFilter);

app.get("/reset", route.regReset)

const PORT = process.env.PORT || 2022;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})