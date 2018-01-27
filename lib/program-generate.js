const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const Renderer = require(path.join(libDir, 'renderer'));
const Saver = require(path.join(libDir, 'saver'));
const wizard = require(path.join(libDir, 'wizard'));
const wizardDNA = require(path.join(libDir, 'wizard-dna'));
const wizardSeed = require(path.join(libDir, 'wizard-seed'));

// program basics
program
  .option('-i, --input <file>', 'input *.per file')
  .option('-o, --output <dir>', 'output directory')
  .option('-d, --dna <file>', 'input *.dna file')
  .option('-s, --seed <file>', 'input *.seed file')
  .parse(process.argv);

// load a file or go through the wizard
if (program.input) {
  const person = Saver.load(program.input);
  Renderer.toMarkdown(person);

// generate person with DNA
} else if (program.dna) {
  wizardDNA(program.output, program.dna);

// generate person with seed
} else if (program.seed) {
  wizardSeed(program.output, program.seed);

// go through the wizard
} else {
  wizard(program.output);
}
