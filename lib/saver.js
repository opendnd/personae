const NodeZip = require('node-zip');
const fs = require('fs');

const saver = (filepath, person) => {
  const zip = new NodeZip();
  zip.file('person.json', JSON.stringify(person));

  // write the file
  const data = zip.generate({ base64: false, compression: 'DEFLATE' });
  fs.writeFileSync(filepath, data, 'binary');
};

module.exports = saver;
