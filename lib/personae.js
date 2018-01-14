// this is the main class for generating a person
const randomWeighted = require('random-weighted');
const Nomina = require('nomina');
const Genetica = require('genetica');
const Roll = require('roll');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const defaults = require(path.join(libDir, 'defaults'));
const Saver = require(path.join(libDir, 'saver'));
const roll = new Roll();

class Personae {

  // init
  constructor(opts = {}) {
    this.opts = opts;
  }

  // list defaults
  static getDefaults() {
    return defaults;
  }

  // load a file and return person
  static load(filepath) {
    return Saver.load(filepath);
  }

  // validate the options
  validateOpts(opts = {}) {
    // type
    if ((opts.type === undefined) || (opts.type === '')) opts.type = defaults.type;
    if (!defaults.types.includes(opts.type)) opts.type = defaults.type;

    if ((opts.race === undefined) || (opts.race === '')) opts.race = defaults.races.sample();
    if (!defaults.races.includes(opts.race)) opts.race = defaults.races.sample();

    // class
    if ((opts.klass === undefined) || (opts.klass === '')) opts.klass = defaults.classes.sample();
    if (!defaults.classes.includes(opts.klass)) opts.klass = defaults.classes.sample();

    // background
    if ((opts.background === undefined) || (opts.background === '')) opts.background = defaults.backgrounds.sample();
    if (!defaults.backgrounds.includes(opts.background)) opts.background = defaults.backgrounds.sample();

    // alignment
    if ((opts.alignment === undefined) || (opts.alignment === '')) opts.alignment = defaults.alignments.sample();
    if (!defaults.alignments.includes(opts.alignment)) opts.alignment = defaults.alignments.sample();

    // gender
    if ((opts.gender === undefined) || (opts.gender === '')) opts.gender = defaults.genders.sample();
    if (!defaults.genders.includes(opts.gender)) opts.gender = defaults.genders.sample();

    // theme
    if ((opts.theme === undefined) || (opts.theme === '')) opts.theme = defaults.themes.sample();
    if (!defaults.themes.includes(opts.theme)) opts.theme = defaults.themes.sample();

    // name
    if ((opts.name === undefined) || (opts.name === '')) opts.name = Nomina.generate({ type: opts.gender, theme: opts.theme });

    // generate age and ageGroup
    if (((opts.age === undefined) || (opts.age === '')) && (opts.ageGroup)) {
      opts.age = Personae.generateAgeFromAgeGroup(opts.race, opts.ageGroup);
    } else if ((opts.age) && ((opts.ageGroup === undefined) || (opts.ageGroup === ''))) {
      opts.ageGroup = Personae.generateAgeGroup(opts.race, opts.age);
    } else if (((opts.age === undefined) || (opts.age === '')) && ((opts.ageGroup === undefined) || (opts.ageGroup === ''))) {
      opts.age = Personae.generateAge(opts.race);
      opts.ageGroup = Personae.generateAgeGroup(opts.race, opts.age);
    }

    this.opts = opts;

    return opts;
  }

  // reset opts
  resetOpts() {
    this.opts = {};
  }

  // generate age
  // ex: '15-80'
  static generateAge(race = 'Dragonborn') {
    const ageRange = defaults.ageRanges[race].split('-');
    const min = parseInt(ageRange[0], 10);
    const max = parseInt(ageRange[1], 10);
    let dice = max - min;

    // grab a random number based on the weights of age distributions
    const rnum = randomWeighted(defaults.ageWeights);

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
  static generateAgeGroup(race = 'Dragonborn', age = 0) {
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

  // generate a random age from an ageGroup
  static generateAgeFromAgeGroup(race = 'Dragonborn', ageGroup = 'young') {
    const ageRange = defaults.ageRanges[race].split('-');
    const min = parseInt(ageRange[0], 10);
    const max = parseInt(ageRange[1], 10);
    const diff = max - min;
    const group = Math.ceil(diff / 3);
    const old = max - (group * 1);
    const middle = max - (group * 2);
    const young = max - (group * 3);

    // generate a random roll from the diff dice
    // subtract one to not put them over
    const rnum = roll.roll(`1d${group - 1}`).result;

    if (ageGroup === 'old') {
      return old + rnum;
    } else if (ageGroup === 'middle') {
      return middle + rnum;
    }

    return young + rnum;
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

  // calculate modifier
  calculateMod(score = 0) {
    return Math.floor((score - 10) / 2);
  }

  // generate abilities
  generateAbilities() {
    const { race } = this.opts;
    const racialMod = defaults.racialMod[race];
    const available = Object.assign([], defaults.standardArray);
    const abilities = Object.assign({}, defaults.abilities);
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
  generateChild(opts = {}, motherPerson = {}, fatherPerson = {}) {
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
  generate(opts = {}) {
    const genOpts = this.validateOpts(Object.assign(this.opts, opts));
    const { type, race, klass, alignment, theme, name, gender, age, ageGroup, background } = genOpts;

    // generate person details
    const abilities = this.generateAbilities();
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

    // after generating a person reset DNA
    this.resetOpts();

    return {
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

module.exports = Personae;
