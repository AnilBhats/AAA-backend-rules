


let test = [{
	"name" : "Rule1",
		"message": "Rule1 Set SVCP_TOT_COST value to Zero",
	"rule": [{ "name": "IF", "type": "other", "disabled": true }, { "type": "column", "name": "BL_LAT" }, { "type": "condition", "name": "=" }, { "type": "text", "name": "123" }, { "type": "condition", "name": "And" }, { "type": "column", "name": "STATION TYPE" }, { "type": "condition", "name": "=" }, { "type": "text", "name": "586" }, , { "type": "condition", "name": "And" }, { "type": "column", "name": "STATION TYPE" }, { "type": "condition", "name": "=" }, { "type": "text", "name": "586" }, { "type": "other", "name": "THEN" }, { "type": "column", "name": "SERVICE ITEM" }, { "type": "condition", "name": "=" }, { "type": "text", "name": "457" }, { "type": "condition", "name": "And" }, { "type": "column", "name": "STATION TYPE" }, { "type": "condition", "name": "=" }, { "type": "text", "name": "586" }]
}]


let testArray = test[0].rule.splice(0, 1);
let elementCount = 0;
const customizedArray = {
	ruleDetails: [],
	updateColumns:[]
};
let ruleIndividual = []
let columnIndividual = [];
updateColumns = false;
updateElementCount = 0;
test[0].rule.forEach((object, index) => {
	if (object.type === 'other' && object.name === 'THEN') {
		customizedArray.ruleDetails.push(ruleIndividual);
		ruleIndividual = [];
		updateColumns = true;
		return;
	}
	if (!updateColumns) {
		
		elementCount++;
		if (elementCount <= 3) {
			ruleIndividual.push(object.name);
		}

		if (elementCount == 4) {
			customizedArray.ruleDetails.push(ruleIndividual);
				customizedArray.ruleDetails.push(object.name);
			ruleIndividual = [];
			elementCount = 0;
		}

	}
	if (updateColumns) {
		updateElementCount++;
		if (updateElementCount <= 3) {
			if (object.type === 'other' && object.name === 'THEN') {

			} else {
				columnIndividual.push(object.name);	
			}
			
		}
		if (updateElementCount == 4 || index === test[0].rule.length-1) {
			customizedArray.updateColumns.push(columnIndividual);
			if (index !== test[0].rule.length - 1)
			customizedArray.updateColumns.push(object.name);	
			columnIndividual = [];
			updateElementCount = 0;
		}

	} 
	// else {
		
		// elementCount++;
		// if (elementCount <= 3) {
		// 	ruleIndividual.push(object.name);
		// }

		// if (elementCount == 4) {
		// 	customizedArray.ruleDetails.push(ruleIndividual);
		// 	if (object.type != 'other') {
		// 		console.log(object)
		// 		customizedArray.ruleDetails.push(object.name);
		// 	}

		// 	ruleIndividual = [];
		// 	elementCount = 0;
		// }

	// }
	
	// if (index === 0) {
	// 	createRule(object, index)
	// } else if (index % 2 === 0) {
	// 	createRule(object, index);
	// } else {
	// 	console.log("Could not be processed operators")
	// }

})

console.log(customizedArray);


let RuleEngine = {
	conditions: {
		any: []
	},
	event: {
		type: test.message,
		params: {
			message: test.message,
		}
	}
}


// function createRule(object, index) {
// 	if ((rules.length - 1) === index) {
// 		if (rules[index - 1] === 'and') {
// 			RuleEngine.conditions.any.push({
// 				all: [
// 					{
// 						fact: ruleObject.name,
// 						path: object[0],
// 						operator: object[1],
// 						value: object[2]
// 					}
// 				]
// 			})

// 		} else if (rules[index - 1] === 'or') {
// 			RuleEngine.conditions.any.push({
// 				fact: ruleObject.name,
// 				path: object[0],
// 				operator: object[1],
// 				value: object[2]
// 			})

// 		}
// 	} else {
// 		if (rules[index + 1] === 'and') {
// 			RuleEngine.conditions.any.push({
// 				all: [
// 					{
// 						fact: ruleObject.name,
// 						path: object[0],
// 						operator: object[1],
// 						value: object[2]
// 					}
// 				]
// 			})

// 		} else if (rules[index + 1] === 'or') {
// 			RuleEngine.conditions.any.push({
// 				fact: ruleObject.name,
// 				path: object[0],
// 				operator: object[1],
// 				value: object[2]
// 			})

// 		}

// 	}
// }




