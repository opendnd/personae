import { saveMsg } from "./common";
import Personae from "./personae";
import Saver from "./saver";

const program = require("commander");

// program basics
program
  .option("-c, --child <file>", "child *.per file")
  .option("-o, --output <dir>", "output directory")
  .parse(process.argv);

if (program.child) {
  const outputDir = program.output || ".";
  const personae = new Personae();
  const person = Saver.load(program.child);
  const parents = personae.generateParents(person);

  process.stdout.write(Personae.output(parents.mother));
  Saver.finish(outputDir, saveMsg("mother"), parents.mother, parents.mother.name, () => {
    process.stdout.write(Personae.output(parents.father));
    Saver.finish(outputDir, saveMsg("father"), parents.father, parents.father.name, undefined);
  });
}
