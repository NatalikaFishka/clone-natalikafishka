const express = require('express');

const path = require('path');

const router = express.Router();
const app = express();

const htmlPath = path.join(__dirname, '../dist');

app.use(express.static(htmlPath));
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
