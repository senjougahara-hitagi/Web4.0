var fs = require('fs');

function readfile(file, callback){
  fs.readFile(file, function(err, data){
    if(err){
      console.log(err);
    }

    var string = data.toString();
    var array = [];
    var startString = 0;
    var endString;

    for(var i = 0; i < string.length; i++){
      if(string[i] == '\n'){
        endString = i;
        if(string[i - 1] == '\r'){
          array.push(string.slice(startString, endString - 1));
        }else{
          array.push(string.slice(startString, endString));
        }
        startString = endString + 1;
      }
    }

    // array = string.split('\r\n');
    // if(array[array.length - 1] == ''){
    //   array.pop();
    // }
    // console.log(array);
    callback(array);
  });
}

function writefile(file, data, callback){
  fs.writeFile(file, data + '\r\n', {'flag':'a'}, function(err){
    if(err){
      console.log(err);
    }
  });
}

module.exports.readfile = readfile;
module.exports.writefile = writefile;

// readfile('data.txt', function(data){
  // console.log(data);
  // writefile('test.txt', data, function(){});
// });
