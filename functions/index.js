const functions = require('firebase-functions');
const expres = require('express');
const morgan = require('morgan');
const winstonStream = require('./config/winston');
const { rulesList, columNames, operators } = require('./rules-list');
const { BigQuery } = require('@google-cloud/bigquery');
const Api = require('./rule-api')
const { Engine } = require('json-rules-engine');

const admin = require('firebase-admin');

const config = {
	apiKey: "AIzaSyCC1TYhzHNy1w8wMgJK80RaW58S39b5kfs",
	authDomain: "aaa-demo-63cc0.firebaseapp.com",
	databaseURL: "https://aaa-demo-63cc0.firebaseio.com",
	projectId: "aaa-demo-63cc0",
	storageBucket: "aaa-demo-63cc0.appspot.com",
	messagingSenderId: "347421143644"
};

admin.initializeApp(config);

const app = expres();
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});


const db = admin.firestore();
var bigQuery = new BigQuery({ projectId: 'aaa-impact' });


let firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

function getUserDetails(req) {
	return {
		user: req.user ? req.user.email : "test@mailinator.com",
		role: req.user ? req.user.role : "Admin",
	}
}

app.use(morgan(function (tokens, req, res) {


	return [req.headers.host, tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), tokens['response-time'](req, res), getUserDetails(req).user, JSON.stringify(req.body)];
}, { stream: winstonStream.stream }))


app.get('/rules', async (req, res, next) => {
	let rulesList = []
	return await db.collection('rules').get()
		.then(snapshot => {
			snapshot.docs.map(doc => rulesList.push(doc.data()));
			res.send({ success: true, rules: rulesList });
			return null;
		})

})

app.post('/create', async (req, res, next) => {

	rulesList.forEach(rule => {
		Api.buildRule(rule).then(result => {
			data = result;
			// const ref =  db.collection('rules').add(data);
			const ruleRef = db.collection('rules').doc(rule.name);
			ruleRef.set(data);
			res.json({
				success: true,
				rule: ruleRef
			});
			return null;
		}).catch(error => {
			throw new Error("Table Doesn't exit");
		})
	})




});



app.post('/create_columns', async (req, res, next) => {


	columNames.forEach(column => {
		const ref = db.collection('db_columns').add({ name: column });
	})
	res.send({ success: true })
});

app.post('/create_operators', async (req, res, next) => {
	operators.forEach(operator => {
		const ref = db.collection('operators').add({ name: operator });
	})

	res.send({ success: true })
});


app.get("/column_names", async (req, res, next) => {
	const columnSnapshot = await db.collection('db_columns').get();
	const columns = [];
	columnSnapshot.forEach((doc) => {
		columns.push({
			id: doc.id,
			name: doc.get('name')
		});
	});
	res.send({ success: true, columns: columns })
})

app.get("/operators", async (req, res, next) => {
	const operatorSnapshot = await db.collection('operators').get();
	const operatorList = [];
	operatorSnapshot.forEach((doc) => {
		operatorList.push({
			id: doc.id,
			name: doc.get('name')
		});
	});
	res.send({ success: true, operators: operatorList })
})


app.get("/apply_rule", async (req, res, next) => {
	const { ruleName } = req.body;
	let rule;
	let result = await db.collection("rules").doc(ruleName).get()
		.then(function (doc) {
			if (doc.exists) {
				rule = doc.data();
				console.log("Document data:", doc.data());
			} else {
				console.log("No such document!");
			}
			return null;
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	// let rule=[];
	// result.forEach((doc) => {
	// 	rule.push(doc.data());
	// })
	let rows;
	await bigQuery.query({
		query: 'SELECT * FROM `aaa-impact.Rules_Tableau.' + ruleName + '` LIMIT 10'
	}).then(async results => {
		rows = results[0]; //get all fetched table rows
		// console.log(rows)
		const engine = new Engine();
		await engine.addRule(rule);
		// console.log(rows.length)

		rows.forEach(async row => {
			let data = await Api.buildData(row, ruleName)
			await Api.executeQuery(engine, ruleName, data)
				.then(function (events) {
					console.log(events.map(event => event.params.message), "============", row.TOTAL_COST);
					return null;
				})
				.catch(err => console.log(err.stack))
		})
		res.send({ success: true, rules: rule });
		return null;

	}).catch(function (error) {
		return error
	});



})


app.get("/create_rule", async (req, res, next) => {
	// Api.ruleFormation(req.rule[0]);
	let ruleForm = {}
	await Api.ruleFormation(req.body.ruleList[0]).then(result => {
		ruleForm = result;
		return null;
	}).catch(error => {
		throw error;
	})

	await Api.buildRule(ruleForm).then(async (result) => {
		try {
			data = result;
			console.log(JSON.stringify(data));
			const ruleRef = await db.collection('rules').doc('test Details').set(JSON.stringify(data));
			// ruleRef.
		} catch (e) {
			console.log('Error caught');
		}
		res.send({ success: true, ruleData: result });
		return null;
	}).catch(error => {
		throw error;
	})
	// })

})




exports.aaa_audit = functions.https.onRequest(app);