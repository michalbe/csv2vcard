var parse = require('csv-parse');
var vCard = require('vcards-js');
var fs = require('fs');

var argv = require('minimist')(process.argv.slice(2), { alias: { o: 'output' }});

var file = argv._[0] || 'contacts.csv';
var vcardContact;
var path;
var outputDir = argv.output || './output';

fs.mkdir(outputDir, function() {
  fs.readFile(file, 'utf8', function(err, output) {
    parse(output, function(err, parsedCSV){
      var header = parsedCSV.shift();
      var firstNameCol = header.findIndex(v => v.toLowerCase() === 'first name');
      var lastNameCol = header.findIndex(v => v.toLowerCase() === 'last name');
      var phoneColumns = [];
      header.forEach(function(v, i) {
        if (v.toLowerCase().match("phone")) {
          phoneColumns.push(i);
        }
      });
          console.log(firstNameCol, lastNameCol);

      parsedCSV.forEach(function(contact) {
        // positions from Outlook contacts schema in the README file of
        // this project
        var firstName = contact[firstNameCol];
        var lastName = contact[lastNameCol];

        var cellPhone;
        for (var col of phoneColumns) {
          if (contact[col]) {
            cellPhone = contact[col];
          }
        }

        if ((firstName || lastName) && cellPhone) {
          vcardContact = vCard();
          vcardContact.firstName = firstName;
          vcardContact.lastName = lastName;
          vcardContact.cellPhone = cellPhone
          path = outputDir + '/';
          // join with space, trim extra space, replace whitespace with '-'
          path += [firstName, lastName].join(' ').trim().toLowerCase().replace(/[\W]{1,}/ig, '-');
          path += '.vcf';
          vcardContact.saveToFile(path);
          console.log('File saved in ' + path);
        }
      });
    });
  });
});
