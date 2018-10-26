const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const port = 3000;

app.get('/', (req, res) => {
	res.send("IT'S WORKING!");
});

const httpsOptions = {
	key: fs.readFileSync('./ssl/cert.key'),
	cert: fs.readFileSync('./ssl/cert.pem')
};
const server = https.createServer(httpsOptions, app).listen(port, () => {
	console.log('server running at ' + port);
});
