import wizard from "./wizard";
import wizardDNA from "./wizard-dna";
import wizardSeed from "./wizard-seed";

const program = require("commander");

// program basics
program
  .option("-o, --output <dir>", "output directory")
  .option("-d, --dna <file>", "input *.dna file")
  .option("-s, --seed <file>", "input *.seed file")
  .parse(process.argv);

// generate person with DNA
if (program.dna) {
  wizardDNA(program.output, program.dna);

// generate person with seed
} else if (program.seed) {
  wizardSeed(program.output, program.seed);

// go through the wizard
} else {
  wizard(program.output);
}
