var parse = require('csv-parse');
var fs = require('fs');

var file = 'contacts.csv';

fs.readFile(file, 'utf8', function(err, output){
  console.log(output);
});
