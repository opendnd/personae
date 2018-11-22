import Genetica from "genetica";
import {
  AgeGroups,
  ExpandedAlignments,
  expandedAlignmentsMatrix,
  standardArray,
  Genders,
  ShortAbilityTypes,
  ILinkBackground,
  ILinkKlass,
  ILinkRace,
  IPerson,
  PersonTypes,
  ILinkCulture,
  IRace,
  ExpandedAlignmentsY,
  ExpandedAlignmentsX,
  IExpandedAlignmentMatrixDetail,
  IKlass,
  ICulture,
  IBackground,
  AbilityMethods,
  RacialAbilityIncreaseTypes,
  IIdeals,
  IDNA,
  roll,
} from "opendnd-core";
import defaults, { IPersonaeDefaults } from './defaults';
import * as uuidv1 from "uuid/v1";

import Renderer from "./renderer";
import Saver from "./saver";

import "./extensions";

// this is the main class for generating a person
const randomWeighted = require("random-weighted");
const Nomina = require("nomina");
const path = require("path");
const rootDir = path.join(__dirname, "..");
const pinfo = require(path.join(rootDir, "package.json"));

export interface IPersonaeOpts {
  defaults?: IPersonaeDefaults;
  type?: PersonTypes;
  race?: ILinkRace;
  klass?: ILinkKlass;
  culture?: ILinkCulture;
  background?: ILinkBackground;
  alignment?: ExpandedAlignments;
  gender?: Genders;
  name?: string;
  age?: number;
  ageGroup?: AgeGroups;
  DNA?: IDNA;
  seed?: any;
}

class Personae {
  public defaults: IPersonaeDefaults;
  public opts: IPersonaeOpts;
  public race: IRace;
  public klass: IKlass;
  public background: IBackground;
  public culture: ICulture;
  public alignmentX: ExpandedAlignmentsX;
  public alignmentY: ExpandedAlignmentsY;

  // init
  constructor(opts: IPersonaeOpts = {}) {
    this.opts = opts;
    this.defaults = opts.defaults || defaults;
  }

  // validate the options
  public validateOpts(opts: IPersonaeOpts = {}) {
    // generate default type
    if (opts.type === undefined) { opts.type = PersonTypes.Playable; }

    // generate random race
    if (opts.race === undefined) opts.race = Object.values(this.defaults.races).sample();
    this.race = this.defaults.racesDict[opts.race.uuid];

    // generate random klass
    if (opts.klass === undefined) opts.klass = Object.values(this.defaults.klasses).sample(); 
    this.klass = this.defaults.klassesDict[opts.klass.uuid];

    // generate random background
    if (opts.background === undefined) opts.background = Object.values(this.defaults.backgrounds).sample();
    this.background = this.defaults.backgroundsDict[opts.background.uuid];

    // generate random culture
    if (opts.culture === undefined) opts.culture = Object.values(this.defaults.cultures).sample();
    this.culture = this.defaults.culturesDict[opts.culture.uuid];

    // generate random alignment
    if (opts.alignment === undefined) opts.alignment = Object.values(ExpandedAlignments).sample();

    // generate random gender
    if (opts.gender === undefined) opts.gender = Object.values(Genders).sample();

    // generate random name
    if (opts.name === undefined) opts.name = new Nomina().generate(); // TODO: replace w/ properties and update nomina

    if (this.race === undefined) {
      console.log(opts.race);
    }

    // generate age and ageGroup
    if ((opts.age === undefined) && (opts.ageGroup === undefined)) {
      opts.ageGroup = Personae.generateAgeGroup(this.race);
      opts.age = Personae.generateAge(this.race, opts.ageGroup);
    // generate ageGroup from age
    } else if ((opts.age !== undefined) && (opts.ageGroup === undefined)) {
      opts.ageGroup = Personae.generateAgeGroup(this.race);
    // generate age from ageGroup
    } else if ((opts.age === undefined) && (opts.ageGroup !== undefined)) {
      opts.age = Personae.generateAge(this.race, opts.ageGroup);
    }

    this.opts = opts;

    return opts;
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
  public static generateAge(race: IRace, ageGroup = AgeGroups.Child) {
    const { ageRanges } = race;
    const group = ageRanges[ageGroup];
    const { min, dice } = group;

    return min + roll(dice);
  }

  // get ageGroup from age
  public static getAgeGroup(race: IRace, age: number = 1) {
    const { ageRanges } = race;
    const { child, young, middle, old } = ageRanges;

    // check conditionals
    if (age <= old.max) {
      return AgeGroups.Old;
    } else if (age <= middle.max) {
      return AgeGroups.Middle;
    } else if (age <= young.max) {
      return AgeGroups.Young;
    } else if (age <= child.max) {
      return AgeGroups.Child;
    } else {
      throw new Error('There was an error with the age group maximums!');
    }
  }

  // generate ageGroup
  public static generateAgeGroup(race:IRace) {
    const { ageRanges } = race;
    const ageWeights = [
      ageRanges.child.weight,
      ageRanges.young.weight,
      ageRanges.middle.weight,
      ageRanges.old.weight,
    ];

    return Object.values(AgeGroups)[randomWeighted(ageWeights)];
  }

  // reset opts
  public resetOpts() {
    this.opts = {};
  }

  // generate personality traits
  public generatePersonalityTraits(personalityTraits = []) {
    const personalityTraitA = personalityTraits.sample();
    const pesronalityTraitB = personalityTraits.sample();;

    // if it's the same then try again
    if (personalityTraitA === pesronalityTraitB) { return this.generatePersonalityTraits(personalityTraits); }
    return [personalityTraitA, pesronalityTraitB];
  }

  // generate ideal
  public generateIdeal(alignment:ExpandedAlignments, ideals:IIdeals) {
    const alignmentDetail:IExpandedAlignmentMatrixDetail = expandedAlignmentsMatrix[alignment];
    this.alignmentX = alignmentDetail.x;
    this.alignmentY = alignmentDetail.y;

    // generate a sample set to choose from at random
    let sampleSet = ideals.any.concat(ideals[this.alignmentX]).concat(ideals[this.alignmentY]);

    if (sampleSet.length < 2) {
      sampleSet = this.defaults.ideals.any.concat(this.defaults.ideals[this.alignmentX])
                                          .concat(this.defaults.ideals[this.alignmentY]);
    }

    // TODO: clean this up, happening due to impure/social, etc coming back as undeined
    const finalSet = [];
    sampleSet.forEach((el) => {
      if (el === undefined) return;
      finalSet.push(el);
    });

    return finalSet.sample();
  }

  // calculate modifier
  public calculateMod(score = 0) {
    return Math.floor((score - 10) / 2);
  }

  // generate abilities
  public generateAbilities(method:string = AbilityMethods.StandardArray) {
    const { abilitiyIncreases } = this.race;

    // setup the ability object
    const abilities = {
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10,
    };

    // TODO: implement other methods of generating abilities
    if (method === AbilityMethods.StandardArray) {
      const available = Object.assign([], Object.keys(ShortAbilityTypes));

      // iterate through each score in the standard array
      standardArray.forEach((score) => {
        const ability = available.sample();
        abilities[ability] = score;
        available.splice(available.indexOf(ability), 1);
      });
    } else {
      throw new Error('Method not implemented for ability generation!');
    }

    // compute the racial ability increase
    abilitiyIncreases.forEach((rule) => {
      const { ability, amount } = rule;

      // increase all
      if (ability === RacialAbilityIncreaseTypes.All) {
        Object.keys(abilities).forEach((key) => {
          abilities[key] += amount;
        })
      // increase the ability of your choice
      } else if (ability === RacialAbilityIncreaseTypes.Choice) {
        abilities[Object.keys(abilities).sample()] += amount;
      // increase the specific ability
      } else {
        abilities[ShortAbilityTypes[ability]] += amount;
      }
    });

    // TODO: compute ability increases from other sources as well

    return abilities;
  }

  // generate a child
  public generateChild(opts: any = {}, motherPerson: any = {}, fatherPerson: any = {}) {
    if (motherPerson.DNA.gender !== Genders.Female) { throw new Error("Mother is not female!"); }
    if (fatherPerson.DNA.gender !== Genders.Male) { throw new Error("Father is not male!"); }

    this.validateOpts(Object.assign(this.opts, opts));
    const { culture } = motherPerson;
    const { race:tmpRace } = motherPerson.DNA;
    const { gender } = this.opts;

    // TODO: short term fix as the uuid/name is messed up in Genetica
    let race:ILinkRace;
    Object.values(this.defaults.races).forEach((linkRace) => {
      if (linkRace.name === tmpRace.uuid) race = linkRace;
    });

    // generate DNA from mother and father
    const genetica = new Genetica({
      race,
      gender,
    });
    const DNA = genetica.generateChild({}, motherPerson.DNA, fatherPerson.DNA);

    const child = this.generate({
      culture,
      race,
      gender,
      DNA,
    });

    return child;
  }

  // generate parents
  public generateParents(person) {
    const { DNA, type, culture } = person;
    const { race:tmpRace } = DNA;
    const genetica = new Genetica();

    const parentsDNA = genetica.generateParents(DNA);

    // TODO: short term fix as the uuid/name is messed up in Genetica
    let race:ILinkRace;
    Object.values(this.defaults.races).forEach((linkRace) => {
      if (linkRace.name === tmpRace.uuid) race = linkRace;
    });

    const mother = this.generate({
      culture,
      type,
      race,
      gender: Genders.Female,
      DNA: parentsDNA.motherDNA,
    });

    const father = this.generate({
      culture,
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
    const { version } = pinfo;
    const { type, alignment, name, gender, age, ageGroup } = genOpts;
    const { race, background, culture, klass } = this;

    // generate person details
    const abilities = this.generateAbilities();
    const specialty = background.specialties.sample();
    const personalityTraits = this.generatePersonalityTraits(background.personalityTraits);
    const ideal = this.generateIdeal(alignment, background.ideals);
    const bond = background.bonds.sample();
    const flaw = background.flaws.sample();
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
