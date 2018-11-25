import Genetica from "@opendnd/genetica";
import * as fs from "fs";
import * as path from "path";

import { sanitizeWizardOpts, standardQuestions } from "./common";
import Personae from "./personae";
import Saver from "./saver";

const questions = require("questions");
const colors = require("colors/safe");

const rootDir = path.join(__dirname, "..");
const logo = fs.readFileSync(path.join(rootDir, "logo.txt"), { encoding: "utf-8" });

delete standardQuestions.race;
delete standardQuestions.gender;

const wizardSeed = (outputDir, seedPath) => {
  if (outputDir === undefined) { outputDir = "."; }

  // output welcome
  process.stdout.write(`\n${colors.yellow(logo)}\n`);

  // load seed
  const seed = Genetica.loadSeed(seedPath);
  const { race, gender } = seed;

  // ask a few questions
  questions.askMany(standardQuestions, (opts) => {
    opts.gender = gender;
    opts.race = race;
    opts.seed = seed;

    opts = sanitizeWizardOpts(opts);

    const personae = new Personae(opts);
    const person = personae.generate();

    process.stdout.write(Personae.output(person));
    Saver.finish(outputDir, "Would you like to save your person? (y | n)", person, person.name, undefined);
  });
};

export default wizardSeed;
