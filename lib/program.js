const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const pinfo = require(path.join(rootDir, 'package.json'));
const Renderer = require(path.join(libDir, 'renderer'));
const loader = require(path.join(libDir, 'loader'));
const wizard = require(path.join(libDir, 'wizard'));
const wizardChild = require(path.join(libDir, 'wizard-child'));
const wizardDNA = require(path.join(libDir, 'wizard-dna'));

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .option('-i, --input <file>', 'input *.per file')
  .option('-o, --output <dir>', 'output directory')
  .option('-m, --mother <file>', 'mother *.per file')
  .option('-f, --father <file>', 'father *.per file')
  .option('-d, --dna <file>', 'input *.dna file')
  .parse(process.argv);

// load a file or go through the wizard
if (program.input) {
  const person = loader(program.input);
  Renderer.output(person);

// generate a child
} else if (program.mother && program.father) {
  wizardChild(program.output, program.mother, program.father);

// generate person with DNA
} else if (program.dna) {
  wizardDNA(program.output, program.dna);

// go through the wizard
} else {
  wizard(program.output);
}
