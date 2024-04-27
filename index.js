const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require('body-parser')
var session = require('express-session')
const ConnectDB = require('./DataBase/connectdb')
const router = require('./Routes/web')
const admin = require('./Routes/admin')
const doctor = require('./Routes/doctor')
const patient = require('./Routes/patient')
const pharma = require('./Routes/pharma')

const cookieParser = require('cookie-parser');

const staticPath = path.join(__dirname,'./images');
app.use(express.static(staticPath))


const DATABASE_URL = process.env.URL
ConnectDB(DATABASE_URL)
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine','ejs')
app.set('views','./views')

app.use('/',router)
app.use('/admin',admin)
app.use('/pharma',pharma)
app.use('/doctor',doctor)
app.use('/patient',patient)


app.listen(8081)