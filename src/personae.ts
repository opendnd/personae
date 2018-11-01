import Genetica from 'genetica';
import { Person } from 'opendnd-core';

import defaults from './defaults';
import Saver from './saver';
import Renderer from './renderer';

import './extensions';

// this is the main class for generating a person
const randomWeighted = require('random-weighted');
const Nomina = require('nomina');
const Roll = require('roll');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const pinfo = require(path.join(rootDir, 'package.json'));
const roll = new Roll();

class Personae {
  defaults:any
  defaultsNomina:any
  nomina:any
  opts:any
  themes:any
  alignmentX:any
  alignmentY:any

  // init
  constructor(opts:any = {}) {
    this.opts = opts;

    this.defaults = opts.defaults || defaults;
    this.defaultsNomina = opts.defaultsNomina;
    this.nomina = new Nomina({
      defaults: this.defaultsNomina,
    });
    this.themes = this.nomina.getThemes();
  }

  // list defaults
  static getDefaults() {
    return defaults;
  }

  // load a file and return person
  static load(filepath) {
    return Saver.load(filepath);
  }

  // save a person
  static save(filepath, person) {
    return Saver.save(filepath, person);
  }

  // output
  static output(person, type = 'sh') {
    const mdTypes = ['md', 'markdown'];

    // markdown
    if (mdTypes.includes(type)) return Renderer.toMarkdown(person);

    // default to console
    return Renderer.toConsole(person);
  }

  // validate the options
  validateOpts(opts:any = {}) {
    // type
    if ((opts.type === undefined) || (opts.type === '')) opts.type = this.defaults.type;
    if (!this.defaults.types.ignoreCaseIncludes(opts.type)) opts.type = this.defaults.type;
    opts.type = opts.type.toUpperCase();

    if ((opts.race === undefined) || (opts.race === '')) opts.race = this.defaults.races.sample();
    if (!this.defaults.races.ignoreCaseIncludes(opts.race)) opts.race = this.defaults.races.sample();
    opts.race = opts.race.capitalizeAll();

    // class
    if ((opts.klass === undefined) || (opts.klass === '')) opts.klass = this.defaults.classes.sample();
    if (!this.defaults.classes.ignoreCaseIncludes(opts.klass)) opts.klass = this.defaults.classes.sample();
    opts.klass = opts.klass.capitalizeAll();

    // background
    if ((opts.background === undefined) || (opts.background === '')) opts.background = this.defaults.backgrounds.sample();
    if (!this.defaults.backgrounds.ignoreCaseIncludes(opts.background)) opts.background = this.defaults.backgrounds.sample();
    opts.background = opts.background.capitalizeAll();

    // alignment
    if ((opts.alignment === undefined) || (opts.alignment === '')) opts.alignment = this.defaults.alignments.sample();
    if (!this.defaults.alignments.ignoreCaseIncludes(opts.alignment)) opts.alignment = this.defaults.alignments.sample();
    opts.alignment = opts.alignment.capitalizeAll();

    // gender
    if ((opts.gender === undefined) || (opts.gender === '')) opts.gender = this.defaults.genders.sample();
    if (!this.defaults.genders.ignoreCaseIncludes(opts.gender)) opts.gender = this.defaults.genders.sample();
    opts.gender = opts.gender.toLowerCase();

    // theme
    if ((opts.theme === undefined) || (opts.theme === '')) opts.theme = this.themes.sample();
    if (!this.themes.ignoreCaseIncludes(opts.theme)) opts.theme = this.themes.sample();
    opts.theme = opts.theme.toLowerCase();

    // name
    if ((opts.name === undefined) || (opts.name === '')) opts.name = this.nomina.generate({ type: opts.gender, theme: opts.theme });

    // generate age and ageGroup
    if (((opts.age === undefined) || (opts.age === '')) && (opts.ageGroup)) {
      opts.age = Personae.generateAge(opts.race, opts.ageGroup);
    } else if ((opts.age) && ((opts.ageGroup === undefined) || (opts.ageGroup === ''))) {
      opts.ageGroup = Personae.generateAgeGroup();
    } else if (((opts.age === undefined) || (opts.age === '')) && ((opts.ageGroup === undefined) || (opts.ageGroup === ''))) {
      opts.ageGroup = Personae.generateAgeGroup();
      opts.age = Personae.generateAge(opts.race, opts.ageGroup);
    }

    this.opts = opts;

    return opts;
  }

  // reset opts
  resetOpts() {
    this.opts = {};
  }

  // generate age
  static generateAge(race = 'Dragonborn', ageGroup = 'child') {
    const { ageRanges, ageGroups, ageGroupDice } = defaults;
    const ageRange = ageRanges[race].split('/');
    const diceGroups = ageGroupDice[race].split('/');
    const currentGroupIndex = ageGroups.indexOf(ageGroup);
    const prevGroupIndex = currentGroupIndex - 1;
    const dice = diceGroups[currentGroupIndex];

    // set the previous group min
    let prevGroupMin = 0;
    if (prevGroupIndex >= 0) prevGroupMin = parseInt(ageRange[prevGroupIndex], 10);

    return prevGroupMin + roll.roll(dice).result;
  }

  // get ageGroup from age
  static getAgeGroup(race = 'Dragonborn', age = 1) {
    const { ageRanges } = defaults;
    const ageRange = ageRanges[race];
    const groups = ageRange.split('/');
    const child = parseInt(groups[0], 10);
    const young = parseInt(groups[1], 10);
    const middle = parseInt(groups[2], 10);
    const old = parseInt(groups[3], 10);

    // check conditionals
    if (age <= old) {
      return 'old';
    } else if (age <= middle) {
      return 'middle';
    } else if (age <= young) {
      return 'young';
    } else if (age <= child) {
      return 'child';
    }

    return 'unknown';
  }

  // generate ageGroup
  static generateAgeGroup() {
    const { ageWeights, ageGroups } = defaults;

    return ageGroups[randomWeighted(ageWeights)];
  }

  // generate personality traits
  generatePersonalityTraits(personalityTraits = []) {
    const personalityTraitA = personalityTraits.sample();
    const pesronalityTraitB = this.defaults.personalityTraits.sample();

    // if it's the same then try again
    if (personalityTraitA === pesronalityTraitB) return this.generatePersonalityTraits(personalityTraits);
    return [personalityTraitA, pesronalityTraitB];
  }

  // generate ideal
  generateIdeal(alignment = 'Lawfaul Good', ideals = { any: [], good: [], evil: [], lawful: [], neutral: [], chaotic: [] }) {
    const alignmentDetail = this.defaults.alignmentDetails[alignment];
    this.alignmentX = this.defaults.alignmentX[alignmentDetail.x].toLowerCase();
    this.alignmentY = this.defaults.alignmentY[alignmentDetail.y].toLowerCase();

    // generate a sample set
    let sampleSet = ideals.any.concat(ideals[this.alignmentX]).concat(ideals[this.alignmentY]);

    if (sampleSet.length < 2) {
      sampleSet = this.defaults.ideals.any.concat(this.defaults.ideals[this.alignmentX]).concat(this.defaults.ideals[this.alignmentY]);
    }

    return sampleSet.sample();
  }

  // calculate modifier
  calculateMod(score = 0) {
    return Math.floor((score - 10) / 2);
  }

  // generate abilities
  generateAbilities() {
    const { race } = this.opts;
    const racialMod = this.defaults.racialMod[race];
    const available = Object.assign([], this.defaults.standardArray);
    const abilities = Object.assign({}, this.defaults.abilities);
    const abilityList = Object.keys(abilities); // create a list of abilities for RND to only assign to an ability once

    // assign abilities
    Object.keys(abilities).forEach((ability) => {
      const score = available.sample();
      const mod = this.calculateMod(score);

      // assign score and mod
      abilities[ability] = {
        score,
        mod,
      };

      // remove from available
      available.splice(available.indexOf(score), 1);
    });

    // assign racial abilities
    racialMod.forEach((rule) => {
      // assign to all
      if (rule.ability === 'ALL') {
        Object.keys(abilities).forEach((ability) => {
          const score = abilities[ability].score + rule.amount;
          const mod = this.calculateMod(score);

          // assign score and mod
          abilities[ability] = {
            score,
            mod,
          };
        });

        return;
      } else if (rule.ability === 'RND') {
        // find a random ability and add to amount
        const rndAbility = abilityList.sample();
        const score = abilities[rndAbility].score + rule.amount;
        const mod = this.calculateMod(score);

        abilities[rndAbility] = {
          score,
          mod,
        };

        // remove from the random list so we don't assign it twice
        abilityList.splice(abilityList.indexOf(rndAbility), 1);

        return;
      }

      // do the standard rule
      const score = abilities[rule.ability].score + rule.amount;
      const mod = this.calculateMod(score);

      abilities[rule.ability] = {
        score,
        mod,
      };
    });

    return abilities;
  }

  // generate a child
  generateChild(opts:any = {}, motherPerson:any = {}, fatherPerson:any = {}) {
    if (motherPerson.DNA.gender !== 'female') throw new Error('Mother is not female!');
    if (fatherPerson.DNA.gender !== 'male') throw new Error('Father is not male!');

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
  generateParents(person) {
    const { DNA, type, theme } = person;
    const { race } = DNA;
    const genetica = new Genetica();

    const parentsDNA = genetica.generateParents(DNA);

    const mother = this.generate({
      theme,
      type,
      race,
      gender: 'female',
      DNA: parentsDNA.motherDNA,
    });

    const father = this.generate({
      theme,
      type,
      race,
      gender: 'male',
      DNA: parentsDNA.fatherDNA,
    });

    return {
      mother,
      father,
    };
  }

  // generate a person
  generate(opts = {}): Person {
    const genOpts = this.validateOpts(Object.assign(this.opts, opts));
    const { type, race, klass, alignment, theme, name, gender, age, ageGroup, background } = genOpts;
    const { version } = pinfo;

    // generate person details
    const abilities = this.generateAbilities();
    const backgroundDetail = this.defaults.backgroundDetails[background];
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
    if (this.opts.seed) DNA = genetica.generate(this.opts.seed); // set DNA to the seed if we have it

    // after generating a person reset DNA
    this.resetOpts();

    return {
      version,
      theme,
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
    };
  }
}

export default Personae;
