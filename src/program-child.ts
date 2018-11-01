import wizardChild from './wizard-child';

const program = require('commander');

// program basics
program
  .option('-o, --output <dir>', 'output directory')
  .option('-m, --mother <file>', 'mother *.per file')
  .option('-f, --father <file>', 'father *.per file')
  .parse(process.argv);

wizardChild(program.output, program.mother, program.father);
