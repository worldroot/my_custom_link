import express from "express";
import { Storage } from "./src/data/Storage.js";
import { cutURL } from "./src/cutURL.js";
import { redirect } from "./src/redirect.js";


const app = express();
const port = 8080;

app.use(express.json());

app.use(express.json({ extended: false }));
app.use('/images', express.static('/public'));
app.use(express.static('public'));


if (Storage.data.links === undefined) {
  Storage.data.links = [];
  Storage.write();
}

app.post("/cut", cutURL);
app.get("/[a-f0-9]{5}", redirect);

app.get('/', function(req, res){
  res.sendFile('/index.html', {root: "."});
});
app.listen(process.env.PORT || 8080)