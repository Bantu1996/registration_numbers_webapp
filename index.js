const Registering = require('./regNumber');
// const routes = require('./routes')
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
// // const rout = routes(register)

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

app.get('/addFlash',  async function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});


    
    app.get("/", async function (req, res) {
        res.render('index');
    });



    app.post('/registering', async function (req, res) {
        // console.log(req.body);
        
        var text = req.body.texting;
        if (text === "") {
            req.flash('error', 'Please enter registration number')
        }
        else {
        
                await register.addReg(text)            
                console.log(await register.gettingReg())

            res.render('index', {
                reg : await register.gettingReg()
            });
        
    }
    })

    app.post("/filter", async function (req, res) {

        var placesFilter = req.body.placesFilter;
        let filteredData = [];
        if (placesFilter === "CA") {
            return "Cape Town"
        }
        else if (placesFilter === "CY") {
            return "Bellville"
        }
        else if (placesFilter === "CJ") {
            return "Paarl"
        }
        res.render("index", { regsList: filteredData });
    });




const PORT = process.env.PORT || 2021;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})