var $ = require('jquery');

module.exports.getData = function () {
	return $.ajax({
		'method': 'GET',
		'url': '/mapData'
	});
}

module.exports.getDirectData = function () {
	return $.ajax({
		url: "https://data.cityofchicago.org/resource/8v9j-bter.json",
		type: "GET",
		data: {
			"$limit": 5000,
			"$$app_token": "HT9f6tBQ8PEoqTpKtLGufkpfc"
		}
	});
}
