# csv2vcard

I broke my _windows phone_ recently. Outlook contact book on `live.com` allows me only to export contacts in `.csv` file. This small library helped me to convert them to `vcard`, so I was able to import them to my new _android_ device. Usage:

```bash
$ git clone git@github.com:michalbe/csv2vcard.git
$ cd csv2vcard
$ npm i
```

Then copy your `OutlookContacts.csv` file to `contacts.csv` and run
```bash
$ node index.js
```
Separate `vcard` file will be created in `output/` for every contact.

The input file and output directory can be passed as command line arguments
```bash
$ node index.js path/to/contacts.csv -o path/to/outputdir
```


```javascript
// Outlook CSV schema:

// 0 First Name
// 1 Middle Name
// 2 Last Name
// 3 Title
// 4 Suffix
// 5 Nickname
// 6 Given Yomi
// 7 Surname Yomi
// 8 E-mail Address
// 9 E-mail 2 Address
// 10 E-mail 3 Address
// 11 Home Phone
// 12 Home Phone 2
// 13 Business Phone
// 14 Business Phone 2
// 15 Mobile Phone
// 16 Car Phone
// 17 Other Phone
// 18 Primary Phone
// 19 Pager
// 20 Business Fax
// 21 Home Fax
// 22 Other Fax
// 23 Company Main Phone
// 24 Callback
// 25 Radio Phone
// 26 Telex
// 27 TTY/TDD Phone
// 28 IMAddress
// 29 Job Title
// 30 Department
// 31 Company
// 32 Office Location
// 33 Manager's Name
// 34 Assistant's Name
// 35 Assistant's Phone
// 36 Company Yomi
// 37 Business Street
// 38 Business City
// 39 Business State
// 40 Business Postal Code
// 41 Business Country/Region
// 42 Home Street
// 43 Home City
// 44 Home State
// 45 Home Postal Code
// 46 Home Country/Region
// 47 Other Street
// 48 Other City
// 49 Other State
// 50 Other Postal Code
// 51 Other Country/Region
// 52 Personal Web Page
// 53 Spouse
// 54 Schools
// 55 Hobby
// 56 Location
// 57 Web Page
// 58 Birthday
// 59 Anniversary
// 60 Notes
```
