const fs = require('fs');
const program = require('commander');
const questions = require('questions');
const colors = require('colors/safe');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const logo = fs.readFileSync(path.join(rootDir, 'logo.txt'), { encoding: 'utf-8' });
const Personae = require(path.join(libDir, 'personae'));

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .parse(process.argv);

// output welcome
console.log('\n' + colors.yellow(logo) + '\n');

// ask a few questions
questions.askMany({
  type: { 
    info: colors.cyan('What type of person do you want to generate? (PC | NPC)'),
    required: false
  },
}, (opts) => {
  const personae = new Personae(opts);
  console.log(personae);
});