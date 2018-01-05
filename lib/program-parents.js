const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const loader = require(path.join(libDir, 'loader'));
const finish = require(path.join(libDir, 'finish'));
const Renderer = require(path.join(libDir, 'renderer'));
const Personae = require(path.join(libDir, 'personae'));

// program basics
program
  .option('-c, --child <file>', 'child *.per file')
  .option('-o, --output <dir>', 'output directory')
  .parse(process.argv);

if (program.child) {
  const outputDir = program.output || '.';
  const personae = new Personae();
  const person = loader(program.child);
  const parents = personae.generateParents(person);

  Renderer.output(parents.mother);
  finish(outputDir, 'Would you like to save the mother? (y | n)', parents.mother, () => {
    Renderer.output(parents.father);
    finish(outputDir, 'Would you like to save the father? (y | n)', parents.father);
  });
}
