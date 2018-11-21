import Genetica from "genetica";
import {
  AgeGroups,
  ExpandedAlignments,
  expandedAlignmentsMatrix,
  expandedAlignmentsX,
  expandedAlignmentsY,
  Genders,
  ILinkBackground,
  ILinkKlass,
  ILinkRace,
  IPerson,
  PersonTypes,
} from "opendnd-core";
import * as uuidv1 from "uuid/v1";

import defaults from "./defaults";
import Renderer from "./renderer";
import Saver from "./saver";

import "./extensions";

// this is the main class for generating a person
const randomWeighted = require("random-weighted");
const Nomina = require("nomina");
const Roll = require("roll");
const path = require("path");
const rootDir = path.join(__dirname, "..");
const pinfo = require(path.join(rootDir, "package.json"));
const roll = new Roll();

export interface PersonaeOpts {
  defaults?: any;
  defaultsNomina?: any;
  type?: PersonTypes;
  race?: ILinkRace;
  klass?: ILinkKlass;
  background?: ILinkBackground;
  alignment?: ExpandedAlignments;
  gender?: Genders;
  theme?: string; // TODO: replace with cultures
  name?: string;
  age?: number;
  ageGroup?: AgeGroups;
}

class Personae {
  public defaults: any;
  public defaultsNomina: any;
  public nomina: any;
  public opts: any;
  public themes: any;
  public alignmentX: any;
  public alignmentY: any;

  // init
  constructor(opts: PersonaeOpts = {}) {
    this.opts = opts;

    this.defaults = opts.defaults || defaults;
    this.defaultsNomina = opts.defaultsNomina;
    this.nomina = new Nomina({
      defaults: this.defaultsNomina,
    });
    this.themes = this.nomina.getThemes();
  }

  // validate the options
  public validateOpts(opts: PersonaeOpts = {}) {
    // generate default type
    if (opts.type === undefined) { opts.type = PersonTypes.Playable; }

    // generate random race
    if (opts.race === undefined) {
      const sampleRace = this.defaults.races.sample();
      opts.race = { uuid: sampleRace, name: sampleRace }; 
    }

    // generate random klass
    if (opts.klass === undefined) { 
      const sampleClass = this.defaults.classes.sample();
      opts.klass = { uuid: sampleClass, name: sampleClass }; 
    }

    // generate random background
    if (opts.background === undefined) { 
      const sampleBackground = this.defaults.backgrounds.sample();
      opts.background = { uuid: sampleBackground, name: sampleBackground }; 
    }

    // generate random alignment
    if (opts.alignment === undefined) { opts.alignment = this.defaults.mapAlignments[this.defaults.alignments.sample()]; }

    // generate random gender
    if (opts.gender === undefined) { opts.gender = this.defaults.mapGenders[this.defaults.genders.sample()]; }

    // generate random theme
    if (opts.theme === undefined) { opts.theme = this.themes.sample(); }

    // generate random name
    if (opts.name === undefined) { opts.name = this.nomina.generate({ type: Genders[opts.gender], theme: opts.theme }); }

    // generate age and ageGroup
    if ((opts.age === undefined) && (opts.ageGroup === undefined)) {
      opts.ageGroup = Personae.generateAgeGroup();
      opts.age = Personae.generateAge(opts.race.uuid, opts.ageGroup);
    // generate ageGroup from age
    } else if ((opts.age !== undefined) && (opts.ageGroup === undefined)) {
      opts.ageGroup = Personae.generateAgeGroup();
    // generate age from ageGroup
    } else if ((opts.age === undefined) && (opts.ageGroup !== undefined)) {
      opts.age = Personae.generateAge(opts.race.uuid, opts.ageGroup);
    }

    this.opts = opts;

    return opts;
  }

  // list defaults
  public static getDefaults() {
    return defaults;
  }

  // load a file and return person
  public static load(filepath) {
    return Saver.load(filepath);
  }

  // save a person
  public static save(filepath, person) {
    return Saver.save(filepath, person);
  }

  // output
  public static output(person, type = "sh") {
    const mdTypes = ["md", "markdown"];

    // markdown
    if (mdTypes.includes(type)) { return Renderer.toMarkdown(person); }

    // default to console
    return Renderer.toConsole(person);
  }

  // generate age
  public static generateAge(raceUUID: string, ageGroup = AgeGroups.Child) {
    const { ageRanges, ageGroups, ageGroupDice } = defaults;
    const ageRange = ageRanges[raceUUID].split("/");
    const diceGroups = ageGroupDice[raceUUID].split("/");
    const currentGroupIndex = ageGroups.indexOf(ageGroup);
    const prevGroupIndex = currentGroupIndex - 1;
    const dice = diceGroups[currentGroupIndex];

    // set the previous group min
    let prevGroupMin = 0;
    if (prevGroupIndex >= 0) { prevGroupMin = parseInt(ageRange[prevGroupIndex], 10); }

    return prevGroupMin + roll.roll(dice).result;
  }

  // get ageGroup from age
  public static getAgeGroup(raceUUID: string, age: number = 1) {
    const { ageRanges } = defaults;
    const ageRange = ageRanges[raceUUID];
    const groups = ageRange.split("/");
    const child = parseInt(groups[0], 10);
    const young = parseInt(groups[1], 10);
    const middle = parseInt(groups[2], 10);
    const old = parseInt(groups[3], 10);

    // check conditionals
    if (age <= old) {
      return AgeGroups.Old;
    } else if (age <= middle) {
      return AgeGroups.Middle;
    } else if (age <= young) {
      return AgeGroups.Young;
    } else if (age <= child) {
      return AgeGroups.Child;
    }

    return null;
  }

  // generate ageGroup
  public static generateAgeGroup() {
    const { ageWeights, ageGroups } = defaults;

    return defaults.mapAgeGroups[ageGroups[randomWeighted(ageWeights)]];
  }

  // reset opts
  public resetOpts() {
    this.opts = {};
  }

  // generate personality traits
  public generatePersonalityTraits(personalityTraits = []) {
    const personalityTraitA = personalityTraits.sample();
    const pesronalityTraitB = this.defaults.personalityTraits.sample();

    // if it's the same then try again
    if (personalityTraitA === pesronalityTraitB) { return this.generatePersonalityTraits(personalityTraits); }
    return [personalityTraitA, pesronalityTraitB];
  }

  // generate ideal
  public generateIdeal(alignment = ExpandedAlignments.LG, ideals = { any: [], good: [], evil: [], lawful: [], neutral: [], chaotic: [] }) {
    const alignmentDetail = expandedAlignmentsMatrix[ExpandedAlignments[alignment]];
    this.alignmentX = expandedAlignmentsX[alignmentDetail.x];
    this.alignmentY = expandedAlignmentsY[alignmentDetail.y];

    // generate a sample set
    let sampleSet = ideals.any.concat(ideals[this.alignmentX]).concat(ideals[this.alignmentY]);

    if (sampleSet.length < 2) {
      sampleSet = this.defaults.ideals.any.concat(this.defaults.ideals[this.alignmentX]).concat(this.defaults.ideals[this.alignmentY]);
    }

    return sampleSet.sample();
  }

  // calculate modifier
  public calculateMod(score = 0) {
    return Math.floor((score - 10) / 2);
  }

  // generate abilities
  public generateAbilities() {
    const { race } = this.opts;
    const racialMod = this.defaults.racialMod[race.uuid];
    const available = Object.assign([], this.defaults.standardArray);
    const abilities = Object.assign({}, this.defaults.abilities);
    const abilityList = Object.keys(abilities); // create a list of abilities for RND to only assign to an ability once

    // assign abilities
    Object.keys(abilities).forEach((ability) => {
      const score = available.sample();

      // assign score and mod
      abilities[ability] = score;

      // remove from available
      available.splice(available.indexOf(score), 1);
    });

    // assign racial abilities
    racialMod.forEach((rule) => {
      // assign to all
      if (rule.ability === "ALL") {
        Object.keys(abilities).forEach((ability) => {
          const score = abilities[ability] + rule.amount;

          // assign score and mod
          abilities[ability] = score;
        });

        return;
      } else if (rule.ability === "RND") {
        // find a random ability and add to amount
        const rndAbility = abilityList.sample();
        const score = abilities[rndAbility] + rule.amount;

        abilities[rndAbility] = score;

        // remove from the random list so we don't assign it twice
        abilityList.splice(abilityList.indexOf(rndAbility), 1);

        return;
      }

      // do the standard rule
      const score = abilities[rule.ability] + rule.amount;

      abilities[rule.ability] = score;
    });

    return abilities;
  }

  // generate a child
  public generateChild(opts: any = {}, motherPerson: any = {}, fatherPerson: any = {}) {
    if (motherPerson.DNA.gender !== Genders.Female) { throw new Error("Mother is not female!"); }
    if (fatherPerson.DNA.gender !== Genders.Male) { throw new Error("Father is not male!"); }

    this.validateOpts(Object.assign(this.opts, opts));
    const { theme } = motherPerson;
    const { race } = motherPerson.DNA;
    const { gender } = this.opts;

    // generate DNA from mother and father
    const genetica = new Genetica({
      race,
      gender,
    });
    const DNA = genetica.generateChild({}, motherPerson.DNA, fatherPerson.DNA);

    const child = this.generate({
      theme,
      race,
      gender,
      DNA,
    });

    return child;
  }

  // generate parents
  public generateParents(person) {
    const { DNA, type, theme } = person;
    const { race } = DNA;
    const genetica = new Genetica();

    const parentsDNA = genetica.generateParents(DNA);

    const mother = this.generate({
      theme,
      type,
      race,
      gender: Genders.Female,
      DNA: parentsDNA.motherDNA,
    });

    const father = this.generate({
      theme,
      type,
      race,
      gender: Genders.Male,
      DNA: parentsDNA.fatherDNA,
    });

    return {
      mother,
      father,
    };
  }

  // generate a person
  public generate(opts = {}): IPerson {
    const uuid = uuidv1();
    const genOpts = this.validateOpts(Object.assign(this.opts, opts));
    const { type, race, klass, alignment, theme, name, gender, age, ageGroup, background } = genOpts;
    const culture = { uuid: theme, name: theme };
    const { version } = pinfo;

    // generate person details
    const abilities = this.generateAbilities();
    const backgroundDetail = this.defaults.backgroundDetails[background.uuid];
    const specialty = backgroundDetail.specialties.sample();
    const personalityTraits = this.generatePersonalityTraits(backgroundDetail.personalityTraits);
    const ideal = this.generateIdeal(alignment, backgroundDetail.ideals);
    const bond = backgroundDetail.bonds.sample();
    const flaw = backgroundDetail.flaws.sample();
    const mannerism = this.defaults.mannerisms.sample();
    const talent = this.defaults.talents.sample();
    const trait = this.defaults.traits.sample();
    const characteristic = this.defaults.characteristics.sample();
    const genetica = new Genetica({
      race,
      gender,
    });
    let DNA = this.opts.DNA || genetica.generate();
    if (this.opts.seed) { DNA = genetica.generate(this.opts.seed); } // set DNA to the seed if we have it

    // after generating a person reset DNA
    this.resetOpts();

    return {
      version,
      uuid,
      culture,
      name,
      age,
      ageGroup,
      abilities,
      type,
      alignment,
      klass,
      background,
      specialty,
      personalityTraits,
      ideal,
      bond,
      flaw,
      mannerism,
      talent,
      trait,
      characteristic,
      DNA,

      // TODO: add new fields
      abstract: false,
      level: 0,
      XP: 0,
      playerName: "",
      power: 0,
      honor: 0,
      piety: 0,
      reputation: 0,
      treasury: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 0,
        pp: 0,
      },
      cost: 0,
      proficiencies: {
        skills: [],
        languages: [],
        armors: [],
        weapons: [],
        transportation: [],
        tools: [],
        bonus: 2,
      },
      initiative: 0,
      speed: 0,
      AC: 0,
      hitDice: [],
      maxHP: 0,
      tempHP: 0,
      HP: 0,
      conditions: [],
      exhaustion: 0,
      resistance: null,
      vulnerability: null,
      spellcasting: {
        ability: null,
        saveDC: 0,
        attackModifier: 0,
        spells: [],
      },
      faith: null,
      mother: null,
      father: null,
      siblings: [],
      spouse: null,
      children: [],
      family: null,
      liege: null,
      allies: [],
      enemies: [],
      factions: {
        memberOf: [],
        allies: [],
        enemies: [],
      },
      birth: {
        domain: null,
        date: null,
        rank: 0,
      },
      death: {
        domain: null,
        date: null,
      },
      features: [],
      actions: [],
      items: [],
      magicItems: [],
      weight: 0,
      capacity: 0,
      equipment: {
        head: null,
        leftBrow: null,
        leftEye: null,
        leftEar: null,
        rightBrow: null,
        rightEye: null,
        rightEar: null,
        eyes: null,
        nose: null,
        mouth: null,
        chin: null,
        neck: null,
        leftShoulder: null,
        leftBreast: null,
        leftArm: null,
        leftWrist: null,
        leftHand: null,
        leftFingers: null,
        leftGrip: null,
        rightShoulder: null,
        rightBreast: null,
        rightArm: null,
        rightWrist: null,
        rightHand: null,
        rightFingers: null,
        rightGrip: null,
        torso: null,
        back: null,
        abdomen: null,
        waist: null,
        groin: null,
        rear: null,
        leftThigh: null,
        leftLeg: null,
        leftKnee: null,
        leftShin: null,
        leftAnkle: null,
        leftFoot: null,
        leftToes: null,
        rightThigh: null,
        rightLeg: null,
        rightKnee: null,
        rightShin: null,
        rightAnkle: null,
        rightFoot: null,
        rightToes: null,
        mount: null,
      },
      chattel: [],
      domains: [],
      buildings: [],
      titles: [],
      familiars: [],
      vehicles: [],
      knowledge: [],
      backstory: "",
      campaigns: [],
      activeCampaign: null,
      quests: [],
      stories: [],
      dialogs: [],
      currentDialog: 0,
    };
  }
}

export default Personae;
