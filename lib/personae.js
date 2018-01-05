// this is the main class for generating a person
const randomWeighted = require('random-weighted');
const nomina = require('nomina');
const Genetica = require('genetica');
const Roll = require('roll');
const defaults = require('./defaults');
const roll = new Roll();

class Personae {

  // init
  constructor(opts = {}) {
    this.opts = opts;

    // weight the dice based on 3 weights of age distributions
    this.ageWeights = opts.ageWeights || [0.3, 0.5, 0.2];
  }

  // validate the options
  validateOpts(opts = {}) {
    // type
    if (opts.type === undefined) opts.type = defaults.type;
    if (!defaults.types.includes(opts.type)) opts.type = defaults.type;

    // race
    if (opts.race === undefined) opts.race = defaults.races.sample();
    if (!defaults.races.includes(opts.race)) opts.race = defaults.races.sample();

    // class
    if (opts.klass === undefined) opts.klass = defaults.classes.sample();
    if (!defaults.classes.includes(opts.klass)) opts.klass = defaults.classes.sample();

    // background
    if (opts.background === undefined) opts.background = defaults.backgrounds.sample();
    if (!defaults.backgrounds.includes(opts.background)) opts.background = defaults.backgrounds.sample();

    // alignment
    if (opts.alignment === undefined) opts.alignment = defaults.alignments.sample();
    if (!defaults.alignments.includes(opts.alignment)) opts.alignment = defaults.alignments.sample();

    // gender
    if (opts.gender === undefined) opts.gender = defaults.genders.sample();
    if (!defaults.genders.includes(opts.gender)) opts.gender = defaults.genders.sample();

    // name
    if (opts.name === undefined) opts.name = nomina({ gender: opts.gender });
    if (opts.name === '') opts.name = nomina({ gender: opts.gender });

    // age
    if (opts.age === undefined) opts.age = this.generateAge(opts.race);
    if (opts.age === '') opts.age = this.generateAge(opts.race);

    this.opts = opts;

    return opts;
  }

  // generate age
  // ex: '15-80'
  generateAge(race = 'Dragonborn') {
    const ageRange = defaults.ageRanges[race].split('-');
    const min = parseInt(ageRange[0], 10);
    const max = parseInt(ageRange[1], 10);
    let dice = max - min;

    // grab a random number based on the weights of age distributions
    const rnum = randomWeighted(this.ageWeights);

    // for the first group lower the dice by 1/3
    // for the second group lower the dice by 1/2
    if (rnum === 0) {
      dice /= 3;
    } else if (rnum === 1) {
      dice /= 2;
    }

    // calculate the results
    const result = roll.roll(`1d${Math.floor(dice)}`).result;

    return result + min;
  }

  // generate age group
  // dragonborn: '15-80'
  // young: '15-35'
  // middle: '36-57'
  // old: '58-80'
  generateAgeGroup(race = 'Dragonborn', age = 0) {
    const ageRange = defaults.ageRanges[race].split('-');
    const min = parseInt(ageRange[0], 10);
    const max = parseInt(ageRange[1], 10);
    const diff = max - min;
    const group = Math.ceil(diff / 3);
    const old = max - (group * 1);
    const middle = max - (group * 2);

    // return the age group
    if (age >= old) {
      return 'old';
    } else if (age >= middle) {
      return 'middle';
    }

    return 'young';
  }

  // generate personality traits
  generatePersonalityTraits(personalityTraits = []) {
    const personalityTraitA = personalityTraits.sample();
    const pesronalityTraitB = defaults.personalityTraits.sample();

    // if it's the same then try again
    if (personalityTraitA === pesronalityTraitB) return this.generatePersonalityTraits(personalityTraits);
    return [personalityTraitA, pesronalityTraitB];
  }

  // generate ideal
  generateIdeal(alignment = 'Lawfaul Good', ideals = { any: [], good: [], evil: [], lawful: [], neutral: [], chaotic: [] }) {
    const alignmentDetail = defaults.alignmentDetails[alignment];
    this.alignmentX = defaults.alignmentX[alignmentDetail.x].toLowerCase();
    this.alignmentY = defaults.alignmentY[alignmentDetail.y].toLowerCase();

    // generate a sample set
    let sampleSet = ideals.any.concat(ideals[this.alignmentX]).concat(ideals[this.alignmentY]);

    if (sampleSet.length < 2) {
      sampleSet = defaults.ideals.any.concat(defaults.ideals[this.alignmentX]).concat(defaults.ideals[this.alignmentY]);
    }

    return sampleSet.sample();
  }

  // generate a child
  generateChild(opts = {}, motherPerson = {}, fatherPerson = {}) {
    this.validateOpts(Object.assign(this.opts, opts));
    const { type, race, klass, alignment, name, gender, age, background } = this.opts;

    // generate person details
    const ageGroup = this.generateAgeGroup(race, age);
    const backgroundDetail = defaults.backgroundDetails[background];
    const specialty = backgroundDetail.specialties.sample();
    const personalityTraits = this.generatePersonalityTraits(backgroundDetail.personalityTraits);
    const ideal = this.generateIdeal(alignment, backgroundDetail.ideals);
    const bond = backgroundDetail.bonds.sample();
    const flaw = backgroundDetail.flaws.sample();
    const mannerism = defaults.mannerisms.sample();
    const talent = defaults.talents.sample();
    const trait = defaults.traits.sample();
    const characteristic = defaults.characteristics.sample();
    const genetica = new Genetica({
      race,
      gender,
    });
    const DNA = genetica.generateChild(this.opts, motherPerson.DNA, fatherPerson.DNA);

    return {
      name,
      gender,
      age,
      ageGroup,
      type,
      alignment,
      race,
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

  // generate parents
  generateParents(person) {
    const { DNA, type, race } = person;
    const genetica = new Genetica();
    const parentsDNA = genetica.generateParents(DNA);

    const mother = this.generate({
      type,
      race,
      gender: 'female',
      DNA: parentsDNA.motherDNA,
    });

    const father = this.generate({
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
  generate(opts = {}) {
    const genOpts = this.validateOpts(Object.assign(this.opts, opts));
    const { type, race, klass, alignment, name, gender, age, background } = genOpts;

    // generate person details
    const ageGroup = this.generateAgeGroup(race, age);
    const backgroundDetail = defaults.backgroundDetails[background];
    const specialty = backgroundDetail.specialties.sample();
    const personalityTraits = this.generatePersonalityTraits(backgroundDetail.personalityTraits);
    const ideal = this.generateIdeal(alignment, backgroundDetail.ideals);
    const bond = backgroundDetail.bonds.sample();
    const flaw = backgroundDetail.flaws.sample();
    const mannerism = defaults.mannerisms.sample();
    const talent = defaults.talents.sample();
    const trait = defaults.traits.sample();
    const characteristic = defaults.characteristics.sample();
    const genetica = new Genetica({
      race,
      gender,
    });
    const DNA = this.opts.DNA || genetica.generate();

    return {
      name,
      gender,
      age,
      ageGroup,
      type,
      alignment,
      race,
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

module.exports = Personae;
