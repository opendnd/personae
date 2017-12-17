// this is the main class for generating a person
const defaults = require('./defaults');

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
    if (!defaults.classes.includes(opts.class)) opts.klass = defaults.classes.sample();

    // alignment
    if (opts.alignment === undefined) opts.alignment = defaults.alignments.sample();
    if (!defaults.alignments.includes(opts.class)) opts.alignment = defaults.alignments.sample();

    return opts;
  }

  // generate a person
  generate(opts = {}) {
    const genOpts = this.validateOpts(Object.assign(this.opts, opts));
    const { type, race, klass, alignment } = genOpts;

    return {
      type,
      alignment,
      race,
      class: klass,
    };
  }
}

module.exports = Personae;