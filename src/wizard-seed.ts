import * as fs from "fs";
import Genetica from "genetica";
import * as path from "path";

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

const wizardSeed = (outputDir, seedPath) => {
  if (outputDir === undefined) { outputDir = "."; }

  // output welcome
  process.stdout.write(`\n${colors.yellow(logo)}\n`);

  // load seed
  const seed = Genetica.loadSeed(seedPath);
  const { race, gender } = seed;

  // ask a few questions
  questions.askMany({
    type: {
      info: colors.cyan("What type of person do you want to generate? ") + colors.white(`(${defaults.types.join(" | ")})`),
      required: false,
    },
    theme: {
      info: colors.cyan("What is the person's culture theme? ") + colors.white(`(${themes.join(" | ")})`),
      required: false,
    },
    name: {
      info: colors.cyan("What is this person's name?"),
      required: false,
    },
    age: {
      info: colors.cyan("What is this person's age?") + colors.yellow(" *leave blank if age group provided*"),
      required: false,
    },
    ageGroup: {
      info: colors.cyan("What is this person's age group?") + colors.white(" (young | middle | old)") + colors.yellow(" *leave blank if age provided*"),
      required: false,
    },
    alignment: {
      info: colors.cyan("What alignment does this person have? ") + colors.white(`(${defaults.alignments.join(" | ")})`),
      required: false,
    },
    background: {
      info: colors.cyan("What background does this person have? ") + colors.white(`(${defaults.backgrounds.join(" | ")})`),
      required: false,
    },
    klass: {
      info: colors.cyan("What class does this person have? ") + colors.white(`(${defaults.classes.join(" | ")})`),
      required: false,
    },
  }, (opts) => {
    opts.gender = gender;
    opts.race = race;
    opts.seed = seed;

    // make conversions for the opts
    if (opts.type) { opts.type = defaults.mapTypes[opts.type.toLowerCase()]; }
    if (opts.age) { opts.age = parseInt(opts.age); }
    if (opts.alignment) { opts.alignment = defaults.mapAlignments[opts.alignment]; }
    if (opts.background) { opts.background = { uuid: opts.background, name: opts.background }; }
    if (opts.klass) { opts.klass = { name: opts.klass }; }

    // remove empty opts
    Object.keys(opts).forEach((key) => {
      if (opts[key] === "") { opts[key] = undefined; }
    });

    const personae = new Personae(opts);
    const person = personae.generate();

    process.stdout.write(Personae.output(person));
    Saver.finish(outputDir, "Would you like to save your person? (y | n)", person, person.name, undefined);
  });
};

export default wizardSeed;
