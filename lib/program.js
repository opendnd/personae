const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const pinfo = require(path.join(rootDir, 'package.json'));

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .command('generate', 'generate a person', { isDefault: true })
  .command('child', 'generate a child')
  .command('parents', 'generate parents')
  .command('desc', 'generate a personality description')
  .parse(process.argv);
