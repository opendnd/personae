/* eslint-disable */

const fs = require('fs');
const path = require('path');
const Nomina = require('nomina');
const Genetica = require('genetica');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const home = process.env.HOME || process.env.USERPROFILE;
const userPath = path.join(home, '.dnd', 'personae', 'defaults.js');
let defaults;

// only push unique elements
Array.prototype.pushUnique = function(element) { 
  if (this.indexOf(element) === -1) {
    this.push(element);
  }
};

// grab a random element
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
};

// get from the user path
if (fs.existsSync(userPath)) {
  defaults = require(userPath);
} else {
  defaults = require(path.join(libDir, 'defaults-default'));
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

// add themes from nomina
defaults.themes = Nomina.getThemes();

const geneticaDefaults = Genetica.getDefaults();
defaults.races = geneticaDefaults.races;
defaults.genders = geneticaDefaults.genders;

module.exports = defaults;
