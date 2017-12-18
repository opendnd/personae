// this is the main class for generating a person
const defaults = require('./defaults');
const nomina = require('nomina');
const genders = ['male', 'female'];

class Personae {
  // init
  constructor(opts = {}) {
    this.opts = opts;
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
    if (opts.gender === undefined) opts.gender = genders.sample();
    if (!genders.includes(opts.gender)) opts.gender = genders.sample();

    // name
    if (opts.name === undefined) opts.name = nomina({ gender: opts.gender });
    if (opts.name === '') opts.name = nomina({ gender: opts.gender });

    this.opts = opts;

    return opts;
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

  // generate a person
  generate(opts = {}) {
    const genOpts = this.validateOpts(Object.assign(this.opts, opts));
    const { type, race, klass, alignment, name, gender, background } = genOpts;

    // generate person details
    const backgroundDetail = defaults.backgroundDetails[background];
    const specialty = backgroundDetail.specialties.sample();
    const personalityTraits = this.generatePersonalityTraits(backgroundDetail.personalityTraits);
    const ideal = this.generateIdeal(alignment, backgroundDetail.ideals);
    const bond = backgroundDetail.bonds.sample();
    const flaw = backgroundDetail.flaws.sample();
    const mannerism = defaults.mannerisms.sample();
    const talent = defaults.talents.sample();
    const trait = defaults.traits.sample();
    const appearance = defaults.appearance.generic.concat(defaults.appearance[gender]).sample();

    return {
      name,
      gender,
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
      appearance,
    };
  }
}

module.exports = Personae;
