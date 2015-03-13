var parse = require('csv-parse');
var vCard = require('vcards-js');
var fs = require('fs');

var file = 'contacts.csv';
var vcardContact;
var path;

fs.readFile(file, 'utf8', function(err, output) {
  parse(output, function(err, parsedCSV){
    parsedCSV.forEach(function(contact) {
      // positions from Outlook contacts schema in the README file of
      // this project
      if (contact[1] && contact[3] && contact[37]) {
        vcardContact = vCard();
        vcardContact.firstName = contact[1];
        vcardContact.lastName = contact[3];
        vcardContact.cellPhone = contact[37];
        path = './output/' +
          contact[1].toLowerCase().replace(/[\W]{1,}/ig, '-') + '-' +
          contact[3].toLowerCase().replace(/[\W]{1,}/ig, '-') + '.vcf';
        vcardContact.saveToFile(path);
        console.log('File saved in ' + path);
      }
    });
  });
});
