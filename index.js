var parse = require('csv-parse');
var vCard = require('vcards-js');
var fs = require('fs');

var argv = require('minimist')(process.argv.slice(2), { alias: { o: 'output' }});

var file = argv._[0] || 'contacts.csv';
var vcardContact;
var path;
var outputDir = argv.output || './output';

function getColumns(header, match) {
  var cols = [];
  header.forEach(function(v, i) {
    if (v.toLowerCase().match(match)) {
      cols.push(i);
    }
  });
  return cols;
}

function getEntries(entry, cols) {
  var r = cols.map(i => entry[i]).filter(v => (v !== undefined && v !== ""));
  return r.length <= 1 ? r[0] : r;
}

fs.mkdir(outputDir, function() {
  fs.readFile(file, 'utf8', function(err, output) {
    parse(output, function(err, parsedCSV){
      var header = parsedCSV.shift();
      var firstNameCol = header.findIndex(v => v.toLowerCase() === 'first name');
      var middleNameCol = header.findIndex(v => v.toLowerCase() === 'middle name');
      var lastNameCol = header.findIndex(v => v.toLowerCase() === 'last name');
      var cellPhoneCols = getColumns(header, /(primary|mobile) phone/);
      var homePhoneCols = getColumns(header, 'home phone');
      var workPhoneCols = getColumns(header, /(company.*|business|work|assistant.s) phone/);
      var otherPhoneCols = getColumns(header, 'other phone');
      var emailCols = getColumns(header, /e.?mail .*address/);

      parsedCSV.forEach(function(contact) {
        // positions from Outlook contacts schema in the README file of
        // this project
        var firstName = contact[firstNameCol];
        var middleName = contact[middleNameCol];
        var lastName = contact[lastNameCol];

        if (firstName || lastName) {
          vcardContact = vCard();
          vcardContact.firstName = firstName;
          vcardContact.middleName = middleName;
          vcardContact.lastName = lastName;

          vcardContact.cellPhone = getEntries(contact, cellPhoneCols);
          vcardContact.homePhoneCols = getEntries(contact, homePhoneCols);
          vcardContact.workPhone = getEntries(contact, workPhoneCols);
          vcardContact.otherPhone = getEntries(contact, otherPhoneCols);
          vcardContact.email = getEntries(contact, emailCols);

          path = outputDir + '/';
          // join with space, trim extra space, replace whitespace with '-'
          path += [firstName, middleName, lastName].join(' ').trim().toLowerCase().replace(/[\W]{1,}/ig, '-');
          path += '.vcf';
          vcardContact.saveToFile(path);
          console.log('File saved in ' + path);
        }
      });
    });
  });
});
