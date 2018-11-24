/* eslint-disable */
import * as fs from "fs";
import * as path from "path";

import {
  SRD,
  ILinkRace,
  ILinkCulture,
  ILinkBackground,
  ILinkKlass,
  IRace,
  IKlass,
  IBackground,
  ICulture,
  PersonTypes,
  Genders,
  ExpandedAlignments,
  IIdeals,
} from "opendnd-core";

const {
  races,
  klasses,
  backgrounds,
  cultures,
  racesDict,
  klassesDict,
  backgroundsDict,
  culturesDict,
} = SRD;

export interface IPersonaeDefaults {
  races: {
    [uuid:string]: ILinkRace
  }

  raceOptions?: string[];

  racesDict: {
    [uuid:string]: IRace
  }

  klasses: {
    [uuid:string]: ILinkKlass
  }

  klassOptions?: string[];

  klassesDict: {
    [uuid:string]: IKlass
  }

  backgrounds: {
    [uuid:string]: ILinkBackground
  }

  backgroundOptions?: string[];

  backgroundsDict: {
    [uuid:string]: IBackground
  }

  cultures: {
    [uuid:string]: ILinkCulture
  }

  cultureOptions?: string[];

  culturesDict: {
    [uuid:string]: ICulture
  }

  personalityTraits?: string[];
  ideals?: IIdeals;
  flaws?: string[];
  bonds?: string[];
  mannerisms?: string[];
  talents?: string[];
  traits?: string[];
  characteristics?: string[];
  typeOptions?: string[];
  genderOptions?: string[];
  alignmentOptions?: string[];
}

const home = process.env.HOME || process.env.USERPROFILE;
const userPath = path.join(home, ".dnd", "personae", "defaults.js");
let defaults:IPersonaeDefaults;

// get from the user path
if (fs.existsSync(userPath)) {
  defaults = require(userPath);
} else {
  const mannerisms = ["I slur my words.", "I bite my fingernails.", "I bounce on my heels when excited.", "I constantly chew on things.", "I clear my throat before speaking.", "I click my tongue.", "I drum my fingers on tables.", "I eat abnormally large amounts of food.", "I eat like a bird.", "I enunciate overly clearly.", "I'm extravagant and harsh.", "I fidget.", "I frequently use the wrong word.", "I have a funny accent.", "I have a lisp.", "I hug everyone.", "I hum to myself when idle.", "I laugh far too loud.", "I laugh far too much.", "I lie compulsively.", "I flaunt my coin.", "I wear too much perfume.", "I make constant jokes.", "I make constant puns.", "I mispronounce common words.", "I mumble quietly when alone.", "I never sit with my back to the door.", "I offer advice, needed or not.", "I pace.", "I have a particularly low voice.", "I have a particularly high voice.", "I'm prone to singing quietly.", "I'm prone to humming quietly.", "I refer to everyone I introduce as, “My good friend”.", "I sigh heavily.", "I slouch.", "I have beautiful smile.", "I sneeze frequently.", "I speak an uncommon language.", "I speak in rhyme.", "I speak infrequently.", "I speak loudly.", "I squint.", "I stand when making a point.", "I stare into the distance.", "I stutter.", "I talk to animals like they're people.", "I talk quickly.", "I talk slowly.", "I talk to myself when thinking.", "I often tap my fingers.", "I tell terrible jokes.", "I'm tone deaf.", "I twirl a coin between my fingers.", "I twirl my hair.", "I use flowery speech.", "I use long words.", "I use colorful words.", "I use loud exclamations.", "My voice cracks.", "I walk quickly.", "I walk with a limp.", "I wear flashy clothing.", "I wear ill-fitting clothing.", "I often whispers.", "I frequently whistle.", "I frequently whittle.", "I frequently wink.", "I yell when happy."];
  const talents = ["I'm a natural at making people laugh.", "I'm a natural with problem solving.", "I can read lips.", "I can uncannily predict the weather.", "I draw beautifully.", "I drink everyone under the table.", "I'm an expert dart thrower.", "I'm an expert rock skipper.", "I'm an expert at sewing.", "I'm an expert whittler.", "I'm an expert cook.", "I'm an expert juggler.", "I'm great at baking.", "I have a great bedside manner.", "I'm great at gardening.", "I'm great at impersonations.", "I'm great at one game.", "I'm great at reading people.", "I'm great at solving puzzles.", "I'm great at wrestling.", "I'm great with animals.", "I'm great with children.", "I have a high pain tolerance.", "I have a knack for languages.", "I have incredible survival skills.", "I'm mechanically-minded.", "I paint beautifully.", "I have perfect memory.", "I play a musical instrument.", "I sing beautifully.", "I'm a master of disguise.", "I'm a skilled at fishing.", "I'm a skilled at lying.", "I'm a skilled at sleight-of-hand.", "I'm a skilled dancer.", "I'm a skilled forager.", "I'm great at getting my point across.", "I speak with a silver tongue.", "I'm unbelievably lucky.", "I'm very swift-footed."];
  const traits = ["Active", "Adventurous", "Affectionate", "Affectionate", "Ambitious", "Angry", "Apathetic", "Argumentative", "Arrogant", "Blustering", "Boorish", "Bossy", "Brave", "Caustic", "Charismatic", "Charming", "Cheerful", "Cold-hearted", "Conceited", "Considerate", "Cooperative", "Courageous", "Cunning", "Curious", "Daring", "Dauntless", "Deceptive", "Determined", "Devoted", "Dishonest", "Disloyal", "Disparaging", "Disrespectful", "Domineering", "Educated", "Faithful", "Fearless", "Fidgety", "Friendly", "Funny", "Funny", "Greedy", "Groveling", "Grumpy", "Happy", "Honest", "Hot tempered", "Impatient", "Informed", "Irritable", "Kind", "Lively", "Lovestruck", "Loving", "Loyal", "Malicious", "Mean", "Obnoxious", "Optimistic", "Patient", "Persistent", "Persuasive", "Pessimistic", "Picky", "Playful", "Ponderous", "Quarrelsome", "Quiet", "Reliable", "Repugnant", "Rough", "Rowdy", "Rude", "Satisfied", "Self-centered", "Selfish", "Shy", "Silly", "Sincere", "Sly", "Smart", "Stern", "Strong", "Stubborn", "Submissive", "Suspicious", "Talkative", "Tough", "Ugly", "Unforgiving", "Unkind", "Unmerciful", "Wicked", "Wild", "Zany"];
  const characteristics = ["all thumbs", "anemic", "attractive", "bad smelling", "battle scarred", "birthmarked", "big footed", "big handed", "tiny handed", "burn scarred", "chaos-tainted", "cheap, gaudy ring wearing", "clean", "club footed", "clumsy", "colorful", "crippled", "crooked toothed", "decoratively clothed", "deep voiced", "demure", "diseased", "distinctively jeweled", "distinctively ringed", "raggedly dressed", "poorly dressed", "flamboyantly dressed", "outlandishly dressed", "formally dressed", "very cleanly dressed", "earring wearing", "elegant", "exceptionally beautiful", "exceptionally ugly", "eye-patch wearing", "face tattooed", "facial scarred", "feline", "filthy", "foul-smelling", "gap-toothed", "gap-toothed", "gold toothed", "good looking", "greasy haired", "grizzled", "haggard", "hard of hearing", "harelipped", "healthy-looking", "heavily pierced", "heavily tattooed", "high-pitched", "hook handed", "hunchbacked", "injured", "lame", "lanky", "maimed", "masked", "missing fingered", "missing toothed", "mute", "neat", "nimble", "one armed", "one eyed", "one legged", "perfumed", "pierced", "pointy toothed", "rosy-cheeked", "rough", "ruddy", "sallow", "scarred", "six fingered", "slobbish", "slouching", "squinting", "sweaty", "twisted lipped", "twitching eyed", "ugly", "unhealthy looking", "veiled", "very attractive", "wart covered", "wolfish"];

  defaults = {
    races,
    racesDict,
    klasses,
    klassesDict,
    backgrounds,
    backgroundsDict,
    cultures,
    culturesDict,
    mannerisms,
    talents,
    traits,
    characteristics,
  };
}

defaults.raceOptions = Object.values(races).map((race) => {
  return race.name;
});

defaults.klassOptions = Object.values(klasses).map((klass) => {
  return klass.name;
});

defaults.backgroundOptions = Object.values(backgrounds).map((background) => {
  return background.name;
});

defaults.cultureOptions = Object.values(cultures).map((culture) => {
  return culture.name;
});

defaults.typeOptions = Object.keys(PersonTypes);
defaults.genderOptions = Object.keys(Genders);
defaults.alignmentOptions = Object.values(ExpandedAlignments).map(alignment => alignment.replace(/\_/g, ' '));
defaults.personalityTraits = [];
defaults.ideals = {
  any: [],
  good: [],
  moral: [],
  impure: [],
  evil: [],
  lawful: [],
  social: [],
  neutral: [],
  rebel: [],
  chaotic: [],
};
defaults.flaws = [];
defaults.bonds = [];

Object.values(defaults.backgroundsDict).forEach((background) => {
  defaults.personalityTraits = defaults.personalityTraits.concat(background.personalityTraits);
  defaults.ideals.any = defaults.ideals.any.concat(background.ideals.any);
  defaults.ideals.good = defaults.ideals.good.concat(background.ideals.good);
  defaults.ideals.moral = defaults.ideals.moral.concat(background.ideals.moral);
  defaults.ideals.impure = defaults.ideals.impure.concat(background.ideals.impure);
  defaults.ideals.evil = defaults.ideals.evil.concat(background.ideals.evil);
  defaults.ideals.lawful = defaults.ideals.lawful.concat(background.ideals.lawful);
  defaults.ideals.social = defaults.ideals.social.concat(background.ideals.social);
  defaults.ideals.neutral = defaults.ideals.neutral.concat(background.ideals.neutral);
  defaults.ideals.rebel = defaults.ideals.rebel.concat(background.ideals.rebel);
  defaults.ideals.chaotic = defaults.ideals.chaotic.concat(background.ideals.chaotic);
  defaults.bonds = defaults.bonds.concat(background.bonds);
  defaults.flaws = defaults.flaws.concat(background.flaws);
});

export default defaults;
