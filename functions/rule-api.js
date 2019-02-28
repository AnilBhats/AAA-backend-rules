const { Engine } = require('json-rules-engine');
const engine = new Engine();
const { ruleColumnsList} = require('./rules-list')

 module.exports = {

	 buildRule: async (ruleObject) => {
		 let rules = ruleObject.rule
		 let RuleEngine = {
			 conditions: {
				 any: []
			 },
			 event: {
				 type: ruleObject.message,
				 params: {
					 message: ruleObject.message,
				 }
			 }
		 }
		 function createRule(object, index) {
			 if (rules.length - 1 == index) {
				 if (rules[index - 1] == 'and') {
					 RuleEngine.conditions.any.push({
						 all: [
							 {
								 fact: ruleObject.name,
								 path: object[0],
								 operator: object[1],
								 value: object[2]
							 }
						 ]
					 })

				 } else if (rules[index - 1] == 'or') {
					 RuleEngine.conditions.any.push({
						 fact: ruleObject.name,
						 path: object[0],
						 operator: object[1],
						 value: object[2]
					 })

				 }
			 } else {
				 if (rules[index + 1] == 'and') {
					 RuleEngine.conditions.any.push({
						 all: [
							 {
								 fact: ruleObject.name,
								 path: object[0],
								 operator: object[1],
								 value: object[2]
							 }
						 ]
					 })

				 } else if (rules[index + 1] == 'or') {
					 RuleEngine.conditions.any.push({
						 fact: ruleObject.name,
						 path: object[0],
						 operator: object[1],
						 value: object[2]
					 })

				 }

			 }
		 }
		 rules.forEach((object, index) => {
			 if (index == 0) {
				 createRule(object, index)
			 } else if (index % 2 == 0) {
				 createRule(object, index);
			 } else {
				 console.log("Could not be processed operators")
			 }

		 })
		 return RuleEngine;
	 },
	 executeQuery: async (engine, fact,data) => {
		 engine.addOperator('startsWith', (factValue, jsonValue) => {
			 if (!factValue.length) return false
			 if (jsonValue.split(",").length == 1) {
				 let matchLength = jsonValue.split(",")[0].toString().toLowerCase().length
				 return factValue.substring(0, matchLength).toLowerCase() === jsonValue.toLowerCase()
			 } else {
				 let isValid = false;
				 jsonValue.split(",").forEach((char) => {
					 if (factValue[0].toLowerCase() === char.toLowerCase()) {
						 isValid = true;
					 }
				 })
				 return isValid;
			 }
		 });

		 engine.addOperator('matchNumber', (factValue, jsonValue) => {
			 if (!factValue.length) return false
			 let testNumber = new RegExp(eval(jsonValue))
			 return (testNumber.test(factValue) || testNumber.test(parseInt(factValue)))
		 })



		 engine.addFact(fact, function (params, almanac) {
			 return almanac.factValue('user')
				 .then((user) => {
					 return data;
				 })
		 })

		return await engine.run({ user: "test" })
			
	 },
	 buildData: async (row, rule) => {
		 let index = rule.replace(/\'/g, '').split(/(\d+)/).filter(Boolean)[1]
		 let columnms = ruleColumnsList[index - 1].names;
		 let data={};
		 columnms.forEach(object => {
			 data[object] = row[object] 
		 })
		 console.log(data)
		 return data;
	 }

}


