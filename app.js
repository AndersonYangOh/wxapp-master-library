const https = require('https');
const fs = require('fs');
const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const queryString = require('querystring');
const URL = require('url');
const socket = require('./service/socket');

const router = require('./routes/router').router;

//获取认证证书
var key = fs.readFileSync('./key/lib.gg.unicomlabs.com.key');
var cert = fs.readFileSync('./key/fullchain.cer');

var options = {
	key : key,
	cert : cert,
};

//配置小程序二维码生成文件
app.use('/index', express.static('index'));

app.use(cookieParser());
app.use(bodyParser.json());

const httpsServer = https.createServer(options,app);
//const httpsServer = https.createServer(app);

httpsServer.listen(443,() =>{
	console.log('listening 443 port');
});

socket(httpsServer);

app.use(router);

app.get('/', (req , res) =>{
	console.log('someone requested!');
	res.cookie('mycookie','value',{time : new Date()});
	res.status(200).send('Welcome to liudongtushuguan!');
});

//app.get('/cookie',(req , res) => {
//	console.log(req.cookies);
//	var mycookie = req.cookies.mycookie;
//	res.end('mycookie');
//});

//const wss = new WebSocket.Server({server : httpsServer});

// wss.on('connection',(ws, req) => {
// 		let sessionId = queryString.parse(URL.parse(req.url).query).sessionId;
// 		ws.id = sessionId;
//     console.log('someone connect');
//     console.log(wss.clients);
//     wss.clients.forEach((client) => {
//     	console.log(Object.keys(client));
//     });

//     ws.on('message' , (msg) => {
//     		let msgObj = JSON.parse(msg);
//     		if(sessions[msgObj.targetId]){
//     			wss.clients.forEach((client) => {
// 				if(client.id === msgObj.targetId){
// 					let data = {
// 						time : msgObj.time,
// 						borrower :msgObj.nickName,
// 						book :msgObj.bookName,
// 						borrowerId : sessions[sessionId],
// 						bookId : msgObj.bookId,
// 						wxNum : msgObj.wxNum,
// 						phoneNum : msgObj.phoneNum,
// 						msg : msgObj.msg
// 					};
// 					client.send(JSON.stringify(data));
// 				}
// 			});
//     		}
//         console.log(msg);
// 				//ws.send('you send '+msg);
//     });
//     //ws.send('hello');
// });


app.get('/login',(req,res)  => {
	res.status(200);
	console.log(req.query);
	res.json({"code" : req.query});
});