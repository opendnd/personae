import * as fs from "fs";
import * as path from "path";

import { Genders } from "opendnd-core";
import defaults from "./defaults";
import Personae from "./personae";
import Saver from "./saver";

const questions = require("questions");
const colors = require("colors/safe");

const rootDir = path.join(__dirname, "..");
const logo = fs.readFileSync(path.join(rootDir, "logo.txt"), { encoding: "utf-8" });

const Nomina = require("nomina");
const nomina = new Nomina();
const themes = nomina.getThemes();

const wizardChild = (outputDir, mother = "", father = "") => {
  if (outputDir === undefined) { outputDir = "."; }

  // output welcome
  process.stdout.write(`\n${colors.yellow(logo)}\n`);

  // ask a few questions
  questions.askMany({
    type: {
      info: colors.cyan("What type is the child? ") + colors.white(`(${defaults.types.join(" | ")})`),
      required: false,
    },
    theme: {
      info: colors.cyan("What is the child's culture theme? ") + colors.white(`(${themes.join(" | ")})`),
      required: false,
    },
    name: {
      info: colors.cyan("What is this child's name?"),
      required: false,
    },
    age: {
      info: colors.cyan("What is this child's age?") + colors.yellow(" *leave blank if age group provided*"),
      required: false,
    },
    ageGroup: {
      info: colors.cyan("What is this child's age group?") + colors.white(" (young | middle | old)") + colors.yellow(" *leave blank if age provided*"),
      required: false,
    },
    gender: {
      info: colors.cyan("What's this child's gender? ") + colors.white(`(${defaults.genders.join(" | ")})`),
      required: false,
    },
    alignment: {
      info: colors.cyan("What alignment does this child have? ") + colors.white(`(${defaults.alignments.join(" | ")})`),
      required: false,
    },
    background: {
      info: colors.cyan("What background does this child have? ") + colors.white(`(${defaults.backgrounds.join(" | ")})`),
      required: false,
    },
    klass: {
      info: colors.cyan("What class does this child have? ") + colors.white(`(${defaults.classes.join(" | ")})`),
      required: false,
    },
  }, (opts) => {
    const motherPerson = Saver.load(mother);
    const fatherPerson = Saver.load(father);

    // check for proper inputs
    if (motherPerson.DNA.race.uuid !== fatherPerson.DNA.race.uuid) { throw new Error("Cross-breeding between races is not yet supported!"); }
    if (motherPerson.DNA.gender !== Genders.Female) { throw new Error("The mother is not female!"); }
    if (fatherPerson.DNA.gender !== Genders.Male) { throw new Error("The father is not male!"); }

    // add mother's race
    opts.race = motherPerson.race;

    // make conversions for the opts
    if (opts.type) { opts.type = defaults.mapTypes[opts.type.toLowerCase()]; }
    if (opts.age) { opts.age = parseInt(opts.age); }
    if (opts.gender) { opts.gender = defaults.mapGenders[opts.gender.toLowerCase()]; }
    if (opts.alignment) { opts.alignment = defaults.mapAlignments[opts.alignment]; }
    if (opts.background) { opts.background = { uuid: opts.background }; }
    if (opts.klass) { opts.klass = { name: opts.klass }; }

    // remove empty opts
    Object.keys(opts).forEach((key) => {
      if (opts[key] === "") { opts[key] = undefined; }
    });

    const personae = new Personae(opts);
    const person = personae.generateChild(opts, motherPerson, fatherPerson);

    process.stdout.write(Personae.output(person));
    Saver.finish(outputDir, "Would you like to save your child? (y | n)", person, person.name, undefined);
  });
};

export default wizardChild;
