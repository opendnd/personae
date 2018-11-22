import * as fs from "fs";
import * as path from "path";

import { standardQuestions, sanitizeWizardOpts } from "./common";
import Personae from "./personae";
import Saver from "./saver";

const colors = require("colors/safe");
const questions = require("questions");

const rootDir = path.join(__dirname, "..");
const logo = fs.readFileSync(path.join(rootDir, "logo.txt"), { encoding: "utf-8" });

const wizard = (outputDir) => {
  if (outputDir === undefined) { outputDir = "."; }

  // output welcome
  process.stdout.write(`\n${colors.yellow(logo)}\n`);

  // ask a few questions
  questions.askMany(standardQuestions, (opts) => {
    opts = sanitizeWizardOpts(opts);

    const personae = new Personae(opts);
    const person = personae.generate();

    process.stdout.write(Personae.output(person));
    Saver.finish(outputDir, "Would you like to save your person? (y | n)", person, person.name, undefined);
  });
};

export default wizard;
