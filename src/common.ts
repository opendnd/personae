import defaults from "./defaults";
import { Genders, PersonTypes, ExpandedAlignments } from "opendnd-core";

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
  if (opts.age) { opts.age = parseInt(opts.age); }

  if (!genderOptions.includes(opts.gender)) opts.gender = undefined;
  if (!typeOptions.includes(opts.type)) opts.type = undefined;
  if (!alignmentOptions.includes(opts.alignment)) opts.alignment = undefined;

  if (opts.gender) opts.gender = Genders[opts.gender];
  if (opts.type) opts.type = PersonTypes[opts.type];
  if (opts.alignment) opts.alignment = ExpandedAlignments[opts.alignment];

  if (opts.culture) {
    Object.values(cultures).forEach((culture) => {
      if (culture.name === opts.culture) opts.culture = culture;
    });
  }

  if (opts.background) {
    Object.values(backgrounds).forEach((background) => {
      if (background.name === opts.background) opts.background = background;
    });
  }

  if (opts.race) {
    Object.values(races).forEach((race) => {
      if (race.name === opts.race) opts.race = race;
    });
  }

  if (opts.klass) {
    Object.values(klasses).forEach((klass) => {
      if (klass.name === opts.klass) opts.klass = klass;
    });
  }

  // remove empty opts
  Object.keys(opts).forEach((key) => {
    if (opts[key] === "") { opts[key] = undefined; }
  });

  return opts;
};

export const standardQuestions = {
  type: {
    info: colors.cyan("What type of person do you want to generate? ") + colors.white(`(${typeOptions.join(" | ")})`),
    required: false,
  },
  culture: {
    info: colors.cyan("What is the person's culture theme? ") + colors.white(`(${cultureOptions.join(" | ")})`),
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
  gender: {
    info: colors.cyan("What's this person's gender? ") + colors.white(`(${genderOptions.join(" | ")})`),
    required: false,
  },
  race: {
    info: colors.cyan("What race does this person have? ") + colors.white(`(${raceOptions.join(" | ")})`),
    required: false,
  },
  alignment: {
    info: colors.cyan("What alignment does this person have? ") + colors.white(`(${alignmentOptions.join(" | ")})`),
    required: false,
  },
  background: {
    info: colors.cyan("What background does this person have? ") + colors.white(`(${backgroundOptions.join(" | ")})`),
    required: false,
  },
  klass: {
    info: colors.cyan("What class does this person have? ") + colors.white(`(${klassOptions.join(" | ")})`),
    required: false,
  },
};
