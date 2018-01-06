const path = require('path');
const rootDir = path.join(__dirname, '..');
const defaults = require(path.join(rootDir, 'lib', 'defaults'));

const mapping = {
  personality: 'personalityTraits',
  bonds: 'bonds',
  ideals: 'ideals',
  flaws: 'flaws',
  mannerisms: 'mannerisms',
  talents: 'talents',
  traits: 'traits',
  characteristics: 'characteristics',
  list: 'list',
};

const option = mapping[process.argv[2]];

if (option) {
  if (option === 'ideals') {
    if (defaults.ideals[process.argv[3]]) {
      process.stdout.write(defaults.ideals[process.argv[3]].sample());
    }

    process.stdout.write('\n');
    process.exit();
  } else if (option === 'list') {
    process.stdout.write('Here are the available options:\n');
    Object.keys(mapping).forEach((item) => {
      if (item === 'ideals') {
        process.stdout.write(`\t${item} {alignment}\n`);
        return;
      }
      process.stdout.write(`\t${item}\n`);
    });
    process.stdout.write('\n');
    process.exit();
  }

  process.stdout.write(defaults[option].sample());
  process.stdout.write('\n');
}
