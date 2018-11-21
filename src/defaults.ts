/* eslint-disable */
import * as fs from "fs";
import Genetica from "genetica";
import * as path from "path";

import { AgeGroups, ExpandedAlignments, Genders, PersonTypes } from "opendnd-core";
import defaultsDefault from "./defaults-default";

const home = process.env.HOME || process.env.USERPROFILE;
const userPath = path.join(home, ".dnd", "personae", "defaults.js");
let defaults;

// get from the user path
if (fs.existsSync(userPath)) {
  defaults = require(userPath);
} else {
  defaults = defaultsDefault;
}

// put all of the backgrounds into a single master set
Object.keys(defaults.backgroundDetails).forEach((background) => {
  const template = defaults.backgroundDetails[background];

  defaults.personalityTraits = defaults.personalityTraits.concat(template.personalityTraits);
  defaults.ideals.any = defaults.ideals.any.concat(template.ideals.any);
  defaults.ideals.good = defaults.ideals.good.concat(template.ideals.good);
  defaults.ideals.evil = defaults.ideals.evil.concat(template.ideals.evil);
  defaults.ideals.lawful = defaults.ideals.lawful.concat(template.ideals.lawful);
  defaults.ideals.neutral = defaults.ideals.neutral.concat(template.ideals.neutral);
  defaults.ideals.chaotic = defaults.ideals.chaotic.concat(template.ideals.chaotic);
  defaults.bonds = defaults.bonds.concat(template.bonds);
  defaults.flaws = defaults.flaws.concat(template.flaws);
});

defaults.backgrounds = Object.keys(defaults.backgroundDetails);

const geneticaDefaults = Genetica.getDefaults();
defaults.races = geneticaDefaults.races;
defaults.genders = geneticaDefaults.genders;

// TODO: replace with new enums
defaults.mapTypes = {
  PC: PersonTypes.Playable,
  NPC: PersonTypes.NonPlayable,
};
defaults.mapAlignments = {
  "Lawful Good": ExpandedAlignments.LG,
  "Neutral Good": ExpandedAlignments.NG,
  "Chaotic Good": ExpandedAlignments.CG,
  "Lawful Neutral": ExpandedAlignments.LN,
  "True Neutral": ExpandedAlignments.NN,
  "Chaotic Neutral": ExpandedAlignments.CN,
  "Lawful Evil": ExpandedAlignments.LE,
  "Neutral Evil": ExpandedAlignments.NE,
  "Chaotic Evil": ExpandedAlignments.CE,
};
defaults.mapGenders = {
  male: Genders.Male,
  female: Genders.Female,
};
defaults.mapAgeGroups = {
  child: AgeGroups.Child,
  young: AgeGroups.Young,
  middle: AgeGroups.Middle,
  old: AgeGroups.Old,
};

export default defaults;
