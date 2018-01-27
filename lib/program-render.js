const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const Personae = require(path.join(libDir, 'personae'));
const Saver = require(path.join(libDir, 'saver'));

// program basics
program
  .option('-i, --input <file>', 'input *.per file')
  .option('-t, --type <type>', 'output type either markdown or console')
  .parse(process.argv);

// load a file or go through the wizard
if (program.input) {
  const person = Saver.load(program.input);

  // set default to console
  const type = program.type || 'sh';

  process.stdout.write(Personae.output(person, type));
}
