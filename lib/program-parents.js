const program = require('commander');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const Saver = require(path.join(libDir, 'saver'));
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
  const person = Saver.load(program.child);
  const parents = personae.generateParents(person);

  Renderer.output(parents.mother);
  Saver.finish(outputDir, 'Would you like to save the mother? (y | n)', parents.mother, parents.mother.name, () => {
    Renderer.output(parents.father);
    Saver.finish(outputDir, 'Would you like to save the father? (y | n)', parents.father, parents.father.name);
  });
}
