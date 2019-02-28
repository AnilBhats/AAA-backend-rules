let rulesList = [
	{
		"name": "Rule1",
		"message": "Rule1 Set SVCP_TOT_COST value to Zero",
		"rule": [
			[
				"mc_membership_type",
				"in",
				"['Basic','']"
			],
			"and",
			[
				"SVCP_ID",
				"equal",
				"FL"
			]
		]
	},
	{
		"name": "Rule2",
		"message": "Rule2 Set SVCP_TOT_COST greater than 10",
		"rule": [
			[
				"mc_membership_type",
				"notEqual",
				"Basic"
			],
			"and",
			[
				"SVCP_ID",
				"equal",
				"FL"
			],
			"and",
			[
				"mc_facl_segment",
				"notEqual",
				"Rural"
			],
			"and",
			[
				"SVCP_TOT_COST",
				"greaterThan",
				"10"
			]
		]
	},
	{
		"name": "Rule3",
		"message": "Rule3 Set SVCP_TOT_COST greater than 20",
		"rule": [
			[
				"mc_membership_type",
				"notEqual",
				"Basic"
			],
			"and",
			[
				"SVCP_ID",
				"equal",
				"FL"
			],
			"and",
			[
				"mc_facl_segment",
				"equal",
				"Rural"
			],
			"and",
			[
				"SVCP_TOT_COST",
				"greaterThan",
				"20"
			],

		]
	},
	{
		"name": "Rule4",
		"message": "Rule4 then SVCP_TOT_COST for one or more of (OM/TW/PT/TS) = 0",
		"rule": [
			[
				"SC_ID",
				"equal",
				"1234"
			],
			"and",
			[
				"SVCP_ID",
				"in",
				"['RB','RC','RD','RE','OM','TW','PT','TS']"
			]
		]
	},
	{
		"name": "Rule5",
		"message": "Rule5  SVCP_TOT_COST equals to 0",
		"rule": [
			[
				"CALL_SOURCE",
				"equal",
				"ERS"
			],
			"and",
			[
				"SVCP_ID",
				"equal",
				"SC"
			]
		]
	},
	{
		"name": "Rule6",
		"message": "Rule6  SC_STS_RSN_CD  Equals to P2 / P3",
		"rule": [
			[
				"mc_facl_segment",
				"in",
				"['Rural','Suburban']"
			],
			"and",
			[
				"SC_STS_RSN_CD",
				"in",
				"['P4','P5']"
			]
		]
	},
	{
		"name": "Rule7",
		"message": "Rule7   change SC_STS_RSN_ID to XX",
		"rule": [
			[
				"SC_CALL_MBR_ID",
				"startsWith",
				"00"
			],
			"and",
			[
				"SC_STS_RSN_ID",
				"in",
				"['P1','S1']"
			],
			"and",
			[
				"Comments",
				"matchNumber",
				"/\\d{16}/"
			]
		]
	},
	{
		"name": "Rule8",
		"message": "Rule8  SVCP_TOT_COST  Equals to 0",
		"rule": [
			[
				"resolution_code",
				"startsWith",
				"g"
			],
			"and",
			[
				"SVCP_ID",
				"equal",
				"TW"
			],
			"and",
			[
				"UNITS",
				"equal",
				"sample text"
			]
		]
	},
	{
		"name": "Rule9",
		"message": "Rule9  change it to XX and cost = 0 for the call",
		"rule": [
			[
				"clear_code",
				"equal",
				""
			]
		]
	}, {
		"name": "Rule10",
		"message": "Rule10 change clear code to P3",
		"rule": [
			[
				"clear_code",
				"equal",
				"P1"
			],
			"and",
			[
				"resolution_code",
				"equal",
				""
			]
		]
	},
	{
		"name": "Rule11",
		"message": "Rule11 change clear code to P3",
		"rule": [
			[
				"clear_code",
				"in",
				"['XX', 'P2','P3','P4','P5']"
			],
			"and",
			[
				"SVCP_ID",
				"equal",
				"TW"
			],
			"and",
			[
				"UNITS",
				"greaterThan",
				"0"
			]
		]
	},
	{
		"name": "Rule12",
		"message": "Rule12 UNITS and TW cost  Zero",
		"rule": [
			[
				"member_type",
				"in",
				"['Basic','null']"
			]
		]
	},
	{
		"name": "Rule13",
		"message": "Rule13 UNITS <= 100 (TW) change cost according to ratio($ per unit)",
		"rule": [
			[
				"member_type",
				"equal",
				"Plus"
			]
		]
	},
	{
		"name": "Rule15",
		"message": "Rule15  UNITS = 0",
		"rule": [
			[
				"SVCP_ID",
				"equal",
				"TW"
			],
			"and",
			[
				"UNITS",
				"lessThan",
				"100"
			],
			"and",
			[
				"TwDestinationLat",
				"equal",
				""
			],
			"and",
			[
				"TwDestinationLong",
				"equal",
				""
			],
			"and",
			[
				"timestamp",
				"notEqual",
				""
			]
		]
	},
	{
		"name": "Rule16",
		"message": "Rule16  enter KIVERA MILES",
		"rule": [
			[
				"SVCP_ID",
				"equal",
				"TW"
			],
			"and",
			[
				"UNITS",
				"equal",
				"0"
			]
		]
	},
	{
		"name": "Rule17",
		"message": "Rule17  SVCP_ID = PT within that same SC_ID",
		"rule": [
			[
				"SVCP_ID",
				"equal",
				"TW"
			],
			"and",
			[
				"UNITS",
				"lessThan",
				"100"
			]
		]
	},

	{
		"name": "Rule19",
		"message": "Rule19  then input mile maker",
		"rule": [
			[
				"Comments",
				"contains",
				"mile maker"
			]
		]
	},
	{
		"name": "Rule20",
		"message": "Rule20  Change Clear Code to XX",
		"rule": [
			[
				"Member_number",
				"matchNumber",
				"/^(\\d)\\0*$/"
			]
		]
	},
	{
		"name": "Rule25",
		"message": "Rule25  then remove 1T/UNITS & TOT_COST = 0",
		"rule": [
			[
				"SVCP_ID",
				"in",
				"['T1','T3','T5']"
			],
			"and",
			[
				"Duplicate_SC_ID",
				"equal",
				"null"
			]
		]
	},
	{
		"name": "Rule26",
		"message": "Rule25  then remove 1T/UNITS & TOT_COST = 0",
		"rule": [
			[
				"Comments",
				"contains",
				"Msc Override"
			]
		]
	},
	{
		"name": "Rule27",
		"message": "Rule27  then remove TS/ UNITS & TOT_COST = 0",
		"rule": [
			[
				"SVCP_ID",
				"equal",
				"TW"
			],
			"and",
			[
				"Trouble_code",
				"notIn",
				"['8A','8X']"
			],
			"and",
			[
				"Facility_id",
				"startsWith",
				"N,C,U"
			]
		]
	},
	{
		"name": "Rule28",
		"message": "Rule28  remove SVCP_ID = AA/ UNITS = 0 and TOTAL_COST = 0",
		"rule": [
			[
				"CLUB",
				"notIn",
				"['005','002','066']"
			]
		]
	},
	{
		"name": "Rule29",
		"message": "Rule29 then TRUE",
		"rule": [
			[
				"CALL_SOURCE",
				"equal",
				"EDS"
			],
			"and",
			[
				"SC_CALL_CLB_CD",
				"equal",
				"005"
			],
			"and",
			[
				"SC_CALL_COST",
				"greaterThan",
				"0"
			],
			"and",
			[
				"CHG_ENTITLEMENT",
				"equal",
				"Y"
			]
		]
	}
]


let columNames = ["SC_ID", "SC_DT", "COMM_CTR_ID", "CALL_SOURCE", "mc_membership_type", "mc_facl_segment", "SVC_FACL_ID", "SC_STS_RSN_CD", "SC_CALL_MBR_ID", "DTL_STS_RSN_CD", "BL_LAT", "BL_LONG", "mc_facl_first", "CALL_COST", "PROB1_CD", "CLUB", "SVCP_ID", "TOTAL_COST", "UNITS", "UNIT_COST", "f0_"]


let operators = ["=",">","<","<>",">=","<=","And","OR","!="]


let ruleColumnsList = [{ names: ['mc_membership_type', 'SVCP_ID'] },
{
	names:
		['mc_membership_type',
			'SVCP_ID',
			'mc_facl_segment',
			'SVCP_TOT_COST']
},
{
	names:
		['mc_membership_type',
			'SVCP_ID',
			'mc_facl_segment',
			'SVCP_TOT_COST']
},
{ names: ['SC_ID', 'SVCP_ID'] },
{ names: ['CALL_SOURCE', 'SVCP_ID'] },
{ names: ['mc_facl_segment', 'SC_STS_RSN_CD'] },
{ names: ['SC_CALL_MBR_ID', 'SC_STS_RSN_ID', 'Comments'] },
{ names: ['resolution_code', 'SVCP_ID', 'UNITS'] },
{ names: ['clear_code'] },
{ names: ['clear_code', 'resolution_code'] },
{ names: ['clear_code', 'SVCP_ID', 'UNITS'] },
{ names: ['member_type'] },
{ names: ['member_type'] },
{
	names:
		['SVCP_ID',
			'UNITS',
			'TwDestinationLat',
			'TwDestinationLong',
			'timestamp']
	},
{names:[]},
{ names: ['SVCP_ID', 'UNITS'] },
	{ names: ['SVCP_ID', 'UNITS'] },
{ names: ['Comments'] },
{ names: ['Member_number'] },
{ names: ['SVCP_ID', 'Duplicate_SC_ID'] },
{ names: ['Comments'] },
{ names: ['SVCP_ID', 'Trouble_code', 'Facility_id'] },
{ names: ['CLUB'] },
{
	names:
		['CALL_SOURCE',
			'SC_CALL_CLB_CD',
			'SC_CALL_COST',
			'CHG_ENTITLEMENT']
}]




module.exports = { rulesList, columNames, operators, ruleColumnsList};