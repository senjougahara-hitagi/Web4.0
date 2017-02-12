var FileUtils = require('./FileUtils.js');
var yargs = require('yargs');
 
var argv = yargs.argv._;

FileUtils.readfile(argv[0], function(array){
  var tempArray = [];
  for(var i = 0; i < array.length; i++){
    if(i == 0) tempArray.push(array[0]);
    else{
      for(var j = 0; j < tempArray.length; j++){
        if(array[i][0] == tempArray[j][0]){
          tempArray[j][2] += array[i][2];
          break;
        }
        if(j == tempArray.length - 1) tempArray.push(array[i]);
      }
    }
  }

  tempArray.sort();

  for(var j = 0; j < tempArray.length; j++){
    FileUtils.writefile(argv[1], tempArray[j], function(){});
  }
});
