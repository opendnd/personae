import Saver from "./saver";

const program = require("commander");

// program basics
program
  .option("-i, --input <file>", "input *.per|*.json file")
  .option("-t, --type <type>", "either json2per or per2json")
  .parse(process.argv);

// load a file or go through the wizard
if (program.input) {
  if (program.type === "json2per") {
    Saver.convertJSONToDnD(program.input);
  } else {
    Saver.convertDnDToJSON(program.input);
  }
}
