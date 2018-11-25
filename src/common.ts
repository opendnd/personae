import { ExpandedAlignments, Genders, PersonTypes } from "@opendnd/core";
import defaults from "./defaults";

const colors = require("colors/safe");

const {
  cultures,
  races,
  backgrounds,
  klasses,
  typeOptions,
  genderOptions,
  raceOptions,
  cultureOptions,
  backgroundOptions,
  klassOptions,
  alignmentOptions,
} = defaults;

export const sanitizeWizardOpts = (opts) => {
  if (opts.age) { opts.age = parseInt(opts.age, 10); }

  if (!genderOptions.includes(opts.gender)) { opts.gender = undefined; }
  if (!typeOptions.includes(opts.type)) { opts.type = undefined; }
  if (!alignmentOptions.includes(opts.alignment)) { opts.alignment = undefined; }

  if (opts.gender) { opts.gender = Genders[opts.gender]; }
  if (opts.type) { opts.type = PersonTypes[opts.type]; }
  if (opts.alignment) { opts.alignment = ExpandedAlignments[opts.alignment]; }

  if (opts.culture) {
    Object.values(cultures).forEach((culture) => {
      if (culture.name === opts.culture) { opts.culture = culture; }
    });
  }

  if (opts.background) {
    Object.values(backgrounds).forEach((background) => {
      if (background.name === opts.background) { opts.background = background; }
    });
  }

  if (opts.race) {
    Object.values(races).forEach((race) => {
      if (race.name === opts.race) { opts.race = race; }
    });
  }

  if (opts.klass) {
    Object.values(klasses).forEach((klass) => {
      if (klass.name === opts.klass) { opts.klass = klass; }
    });
  }

  // remove empty opts
  Object.keys(opts).forEach((key) => {
    if (opts[key] === "") { opts[key] = undefined; }
  });

  return opts;
};

export const saveMsg = (resource) => {
  return `Would you like to save the ${resource}? (y | n)`;
};

export const makeQuestion = (question: string = "", options: string = "", required: boolean = false) => {
  return {
    info: colors.cyan(`${question} `) + colors.white(options),
    required,
  };
};

export const standardQuestions = {
  type: makeQuestion(
    "What type of person do you want to generate?",
    `(${typeOptions.join(" | ")})`,
  ),
  culture: makeQuestion(
    "What is the person's culture theme?",
    `(${cultureOptions.join(" | ")})`,
  ),
  name: makeQuestion(
    "What is this person's name?",
  ),
  age: makeQuestion(
    "What is this person's age?",
    "*leave blank if age group provided*",
  ),
  ageGroup: makeQuestion(
    "What is this person's age group?",
    "(young | middle | old) *leave blank if age provided*",
  ),
  gender: makeQuestion(
    "What's this person's gender?",
    `(${genderOptions.join(" | ")})`,
  ),
  race: makeQuestion(
    "What race does this person have?",
    `(${raceOptions.join(" | ")})`,
  ),
  alignment: makeQuestion(
    "What alignment does this person have?",
    `(${alignmentOptions.join(" | ")})`,
  ),
  background: makeQuestion(
    "What background does this person have?",
    `(${backgroundOptions.join(" | ")})`,
  ),
  klass: makeQuestion(
    "What class does this person have?",
    `(${klassOptions.join(" | ")})`,
  ),
};
