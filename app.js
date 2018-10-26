const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const port = 3000;
const BBCMicrobit = require('bbc-microbit');

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('./index.html');
});

const httpsOptions = {
	key: fs.readFileSync('./ssl/cert.key'),
	cert: fs.readFileSync('./ssl/cert.pem')
};
const server = https.createServer(httpsOptions, app).listen(port, () => {
	console.log('server running at ' + port);
});

const EVENT_FAMILY = 0x22b8;
const EVENT_VALUE = 1001;
const EVENTSERVICE_SERVICE_UUID = 'e95d93af-251d-470a-a062-fa1922dfa9a8';
const MICROBITEVENT_CHARACTERISTIC_UUID =
	'e95d9775-251d-470a-a062-fa1922dfa9a8';
const CLIENTEVENT_CHARACTERISTIC_UUID = 'e95d5404-251d-470a-a062-fa1922dfa9a8';
const CLIENTREQUIREMENTS_CHARACTERISTIC_UUID =
	'e95d23c4-251d-470a-a062-fa1922dfa9a8';

const Bluetooth = require('node-web-bluetooth');

// async function connect() {
// 	const device = await Bluetooth.requestDevice({
// 		filters: [
// 			{
// 				namePrefix: 'BBC micro:bit'
// 			}
// 		]
// 	});
// 	const server = await device.gatt.connect();
// 	const service = await server.getPrimaryService(EVENTSERVICE_SERVICE_UUID);
// 	const writeCharacteristic = await service.getCharacteristic(
// 		MICROBITEVENT_CHARACTERISTIC_UUID
// 	);
//
// 	const writeClientEvtCharacteristic = await service.getCharacteristic(
// 		CLIENTEVENT_CHARACTERISTIC_UUID
// 	);
//
// 	const writeClientReqCharacteristic = await service.getCharacteristic(
// 		CLIENTREQUIREMENTS_CHARACTERISTIC_UUID
// 	);
//
// 	if (writeCharacteristic) {
// 		console.log(writeCharacteristic);
// 		const bytes = [0x22b8, 1001];
// 		dataInUint8 = Uint8Array.from(bytes);
//
// 		writeClientEvtCharacteristic.writeValue(dataInUint8).then(() => {
// 			console.log('written');
// 		});
// 	}
//
// 	//await server.disconnect();
// }
// connect();
