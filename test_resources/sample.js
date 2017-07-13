var $ = require('jquery');

export function getData(){
	return $.ajax({
		'method': 'GET',
		'url': '/mapData'
	});
}
