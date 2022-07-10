import Express from "express";
import bodyParser, { BodyParser } from "body-parser";
import viewEngine from "./config/viewEngine";
import innitWebRouter from "./route/Web";
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = Express();

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