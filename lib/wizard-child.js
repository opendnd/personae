const fs = require('fs');
const questions = require('questions');
const colors = require('colors/safe');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const logo = fs.readFileSync(path.join(rootDir, 'logo.txt'), { encoding: 'utf-8' });
const Personae = require(path.join(libDir, 'personae'));
const defaults = require(path.join(libDir, 'defaults'));
const loader = require(path.join(libDir, 'loader'));
const Renderer = require(path.join(libDir, 'renderer'));
const saver = require(path.join(libDir, 'saver'));

const wizardChild = (outputDir, mother = '', father = '') => {
  if (outputDir === undefined) outputDir = '.';

  // output welcome
  process.stdout.write(`\n${colors.yellow(logo)}\n`);

  // ask a few questions
  questions.askMany({
    type: {
      info: colors.cyan('What type is the child? ') + colors.white(`(${defaults.types.join(' | ')})`),
      required: false,
    },
    name: {
      info: colors.cyan('What is this child\'s name?'),
      required: false,
    },
    age: {
      info: colors.cyan('What is this child\'s age?'),
      required: false,
    },
    gender: {
      info: colors.cyan('What\'s this child\'s gender? ') + colors.white(`(${defaults.genders.join(' | ')})`),
      required: false,
    },
    alignment: {
      info: colors.cyan('What alignment does this child have? ') + colors.white(`(${defaults.alignments.join(' | ')})`),
      required: false,
    },
    race: {
      info: colors.cyan('What race does this child have? ') + colors.white(`(${defaults.races.join(' | ')})`),
      required: false,
    },
    klass: {
      info: colors.cyan('What class does this child have? ') + colors.white(`(${defaults.classes.join(' | ')})`),
      required: false,
    },
    background: {
      info: colors.cyan('What background does this child have? ') + colors.white(`(${defaults.backgrounds.join(' | ')})`),
      required: false,
    },
  }, (opts) => {
    const motherPerson = loader(mother);
    const fatherPerson = loader(father);

    // check for proper inputs
    if (motherPerson.race !== fatherPerson.race) throw new Error('Cross-breeding between races is not yet supported!');
    if (motherPerson.gender !== 'female') throw new Error('The mother is not female!');
    if (fatherPerson.gender !== 'male') throw new Error('The father is not male!');

    // add mother's race
    opts.race = motherPerson.race;

    const personae = new Personae(opts);
    const person = personae.generateChild(opts, motherPerson, fatherPerson);

    Renderer.output(person);

    // save the file or not into a *.dyn file
    questions.askOne({ info: colors.cyan('Would you like to save your child? (y | n)') }, (result) => {
      if (result === 'y' || result === 'yes') {
        const filename = `${new Date().getTime()}.per`;
        const filepath = path.join(outputDir, filename);

        saver(filepath, person);
        process.stdout.write(colors.green(`Saving... ${filepath}\n`));
      } else {
        process.stdout.write(colors.white('Exited without save.\n'));
      }
    });
  });
};

module.exports = wizardChild;
