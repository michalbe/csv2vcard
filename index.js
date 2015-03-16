var parse = require('csv-parse');
var vCard = require('vcards-js');
var fs = require('fs');

var file = 'contacts.csv';

fs.readFile(file, 'utf8', function(err, output) {
  parse(output, function(err, parsedCSV){
    parsedCSV.forEach(function(contact){
      console.log(contact[1], contact[3], contact[37]);
    });
  });
});
