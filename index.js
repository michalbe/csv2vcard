var parse = require('csv-parse');
var vCard = require('vcards-js');
var fs = require('fs');

var file = 'contacts.csv';
var vcardContact;

fs.readFile(file, 'utf8', function(err, output) {
  parse(output, function(err, parsedCSV){
    parsedCSV.forEach(function(contact) {
      if (contact[1] && contact[3] && contact[37]) {
        vcardContact = vCard();
        vcardContact.firstName = contact[1];
        vcardContact.lastName = contact[3];
        vcardContact.cellPhone = contact[37];
        vcardContact.saveToFile('./output/' + contact[1].toLowerCase() + '-' + contact[3].toLowerCase() + '.vcf');

      }
    });
  });
});
