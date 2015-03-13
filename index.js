var parse = require('csv-parse');
var fs = require('fs');

var file = 'contacts.csv';

fs.readFile(file, 'utf8', function(err, output){
  parse(output, function(err, parsedCSV){
    console.log(parsedCSV);
  });
});
