var fs = require('fs');
var files = fs.readdirSync('./assets/');
const mappingObj = {};
for (const file of files) {
  const word = file.split(' ')[1];
  const fileExtenstion = file.split('.')[1];
  if (fileExtenstion == 'png' || fileExtenstion == 'gif') {
    mappingObj[word] = { ...mappingObj[word], ...{ image: file } };
  } else {
    mappingObj[word] = { ...mappingObj[word], ...{ sound: file } };
  }
}
console.log(mappingObj);
