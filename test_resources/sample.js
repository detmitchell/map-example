var $ = require('jquery');

module.exports.getData = function(){
	return $.ajax({
		'method': 'GET',
		'url': '/mapData'
	});
}
