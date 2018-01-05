const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const Renderer = require(path.join(libDir, 'renderer'));
const loader = require(path.join(libDir, 'loader'));
const wizard = require(path.join(libDir, 'wizard'));
const wizardDNA = require(path.join(libDir, 'wizard-dna'));

// program basics
program
  .option('-i, --input <file>', 'input *.per file')
  .option('-o, --output <dir>', 'output directory')
  .option('-d, --dna <file>', 'input *.dna file')
  .parse(process.argv);

// load a file or go through the wizard
if (program.input) {
  const person = loader(program.input);
  Renderer.output(person);

// generate person with DNA
} else if (program.dna) {
  wizardDNA(program.output, program.dna);

// go through the wizard
} else {
  wizard(program.output);
}
