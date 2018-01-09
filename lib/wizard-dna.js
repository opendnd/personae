const fs = require('fs');
const questions = require('questions');
const colors = require('colors/safe');
const Genetica = require('genetica');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const logo = fs.readFileSync(path.join(rootDir, 'logo.txt'), { encoding: 'utf-8' });
const Personae = require(path.join(libDir, 'personae'));
const defaults = require(path.join(libDir, 'defaults'));
const Renderer = require(path.join(libDir, 'renderer'));
const finish = require(path.join(libDir, 'finish'));

const wizardDNA = (outputDir, DNApath) => {
  if (outputDir === undefined) outputDir = '.';

  // output welcome
  process.stdout.write(`\n${colors.yellow(logo)}\n`);

  // load DNA
  const DNA = Genetica.load(DNApath);
  const { race, gender } = DNA;

  // ask a few questions
  questions.askMany({
    type: {
      info: colors.cyan('What type of person do you want to generate? ') + colors.white(`(${defaults.types.join(' | ')})`),
      required: false,
    },
    theme: {
      info: colors.cyan('What is the person\'s culture theme? ') + colors.white(`(${defaults.themes.join(' | ')})`),
      required: false,
    },
    name: {
      info: colors.cyan('What is this person\'s name?'),
      required: false,
    },
    age: {
      info: colors.cyan('What is this person\'s age?'),
      required: false,
    },
    alignment: {
      info: colors.cyan('What alignment does this person have? ') + colors.white(`(${defaults.alignments.join(' | ')})`),
      required: false,
    },
    background: {
      info: colors.cyan('What background does this person have? ') + colors.white(`(${defaults.backgrounds.join(' | ')})`),
      required: false,
    },
    klass: {
      info: colors.cyan('What class does this person have? ') + colors.white(`(${defaults.classes.join(' | ')})`),
      required: false,
    },
  }, (opts) => {
    opts.gender = gender;
    opts.race = race;
    opts.DNA = DNA;

    const personae = new Personae(opts);
    const person = personae.generate();

    Renderer.output(person);
    finish(outputDir, 'Would you like to save your person? (y | n)', person);
  });
};

module.exports = wizardDNA;
