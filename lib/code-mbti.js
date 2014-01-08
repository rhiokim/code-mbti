var fs = require('fs');
var readdir = require('readdir');
var esprima = require('esprima');

var files = readdir.readSync( __dirname, [ '**.js' ]);
files.forEach(function(file) {
  var source = fs.readFileSync( file, 'utf8');
  
  var tokens = esprima.parse(source, { tokens: true }).tokens;
  
  var keywords = tokens.filter(function(token) {
    if (token.type == 'Keyword') {
      return true;
    }
  });

  var res = {}, key;
  keywords.forEach(function(keyword) {
    key = keyword.value; 

    if (res.hasOwnProperty(key)) {
      res[key]++;
    } else {
      res[key] = 1;
    }
  });

  console.log(JSON.stringify(res, null, 2));
});
