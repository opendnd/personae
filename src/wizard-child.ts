import * as fs from "fs";
import * as path from "path";

import { Genders } from "@opendnd/core";
import { sanitizeWizardOpts, saveMsg, standardQuestions } from "./common";
import Personae from "./personae";
import Saver from "./saver";

const questions = require("questions");
const colors = require("colors/safe");

const rootDir = path.join(__dirname, "..");
const logo = fs.readFileSync(path.join(rootDir, "logo.txt"), { encoding: "utf-8" });

delete standardQuestions.race;

const wizardChild = (outputDir, mother = "", father = "") => {
  if (outputDir === undefined) { outputDir = "."; }

  // output welcome
  process.stdout.write(`\n${colors.yellow(logo)}\n`);

  // ask a few questions
  questions.askMany(standardQuestions, (opts) => {
    const motherPerson = Saver.load(mother);
    const fatherPerson = Saver.load(father);

    // check for proper inputs
    if (motherPerson.DNA.race.uuid !== fatherPerson.DNA.race.uuid) {
      throw new Error("Cross-breeding between races is not yet supported!");
    }
    if (motherPerson.DNA.gender !== Genders.Female) {
      throw new Error("The mother is not female!");
    }
    if (fatherPerson.DNA.gender !== Genders.Male) {
      throw new Error("The father is not male!");
    }

    // add mother's race
    opts.race = motherPerson.race;

    opts = sanitizeWizardOpts(opts);

    const personae = new Personae(opts);
    const person = personae.generateChild(opts, motherPerson, fatherPerson);

    process.stdout.write(Personae.output(person));
    Saver.finish(outputDir, saveMsg("child"), person, person.name, undefined);
  });
};

export default wizardChild;
