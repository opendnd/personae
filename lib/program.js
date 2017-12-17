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
const defaults = require('./defaults');

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .parse(process.argv);

const genders = ['male', 'female'];

// output welcome
process.stdout.write(`\n${colors.yellow(logo)}\n`);

// ask a few questions
questions.askMany({
  type: {
    info: colors.cyan('What type of person do you want to generate? ') + colors.white(`(${defaults.types.join(' | ')})`),
    required: false,
  },
  gender: {
    info: colors.cyan('What\'s this person\'s gender? ') + colors.white(`(${genders.join(' | ')})`),
    required: false,
  },
  name: {
    info: colors.cyan('What is this person\'s name?'),
    required: false,
  },
  alignment: {
    info: colors.cyan('What alignment does this person have? ') + colors.white(`(${defaults.alignments.join(' | ')})`),
    required: false,
  },
  race: {
    info: colors.cyan('What race does this person have? ') + colors.white(`(${defaults.races.join(' | ')})`),
    required: false,
  },
  klass: {
    info: colors.cyan('What class does this person have? ') + colors.white(`(${defaults.classes.join(' | ')})`),
    required: false,
  },
}, (opts) => {
  const personae = new Personae(opts);
  const person = personae.generate();
  process.stdout.write(person);
});
