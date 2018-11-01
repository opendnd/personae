import Personae from './personae';
import Saver from './saver';

const program = require('commander');

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
