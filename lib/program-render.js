const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const Renderer = require(path.join(libDir, 'renderer'));
const Saver = require(path.join(libDir, 'saver'));

// program basics
program
  .option('-i, --input <file>', 'input *.per file')
  .option('-t, --type <type>', 'output type either markdown or console')
  .parse(process.argv);

// load a file or go through the wizard
if (program.input) {
  const person = Saver.load(program.input);

  const mdTypes = ['md', 'markdown'];
  const consoleTypes = ['txt', 'sh', 'console'];

  // set default to console
  if (program.type === undefined) program.type = 'sh';

  // console
  if (consoleTypes.includes(program.type)) {
    process.stdout.write(Renderer.toConsole(person));
  // markdown
  } else if (mdTypes.includes(program.type)) {
    process.stdout.write(Renderer.toMarkdown(person));
  }
}
