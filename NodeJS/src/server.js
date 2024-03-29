import Express from "express";
import bodyParser, { BodyParser } from "body-parser";
import viewEngine from "./config/viewEngine";
import innitWebRouter from "./route/Web";
import connectDB from "./config/connectDB";
import cors from 'cors';



require("dotenv").config();

let app = Express();

// app.use(cors({ origin: true }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// confic app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


viewEngine(app);
innitWebRouter(app);

connectDB();

let port = process.env.port || 6969;
// port == undefined => port = 6969

app.listen(port, () => {
    //call back
    console.log("backend nodejs is runging on the port : " + port)
}); 