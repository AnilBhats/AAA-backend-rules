const appRoot = require('app-root-path');
const winston = require('winston');

const expressWinston = require('express-winston');

const customFormat = winston.format.printf(info => {
// console.log(info)
	// console.log(info.message.replace(/\n/g, '').split(","))
	let UserRequest = info.message.replace(/\n/g, '').split(",");
	return JSON.stringify({
		host: UserRequest[0],
		"type": UserRequest[1],
		url: UserRequest[2],
		status:UserRequest[3],
		response_time: UserRequest[4],
		user_details: UserRequest[5],
		request_paramaters: UserRequest[6],
	})
	// return `${new Date(info.timestamp)} || [${info.label}] || ${info.level}: ${info.message} `
})
// define the custom settings for each transport (file, console)
var options = {
	file: {
		level: 'info',
		filename: `${appRoot}/logs/app.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: true,
		colorize: true,
	},
};

// instantiate a new Winston Logger with the settings defined above
let logger = new winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		customFormat
	),
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console)
	],
});

// let logger = expressWinston.logger({
// 	transports: [
// 		new winston.transports.File(options.file)
// 	],
// 	format: winston.format.combine(
// 		winston.format.colorize(),
// 		winston.format.json()
// 	),
// 	winstonInstance:winston,
// 		meta: true, // optional: control whether you want to log the meta data about the request (default to true)
// 	dynamicMeta: function (req, res) {
// 		return {
// 			user: "Hariprasad Nuttu",
// 			role:"Admin",
//    		}
// 	},
// })
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function (message, encoding) {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger.info(message)
	},
};

module.exports = logger;