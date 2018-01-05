const questions = require('questions');
const colors = require('colors/safe');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const saver = require(path.join(libDir, 'saver'));

// defaults
const filetype = 'per';

// setup finish
const finish = (outputDir, question, data, cb) => {
  // save the file or not
  questions.askOne({ info: colors.cyan(question) }, (result) => {
    if (result === 'y' || result === 'yes') {
      questions.askOne({ info: colors.cyan('filename') }, (name) => {
        name = (name.length >= 1) ? name : new Date().getTime();

        const filename = `${name}.${filetype}`;
        const filepath = path.join(outputDir, filename);

        saver(filepath, data);
        process.stdout.write(colors.green(`Saving... ${filepath}\n`));

        if (cb) cb(true);
      });
    } else {
      process.stdout.write(colors.white('Exited without save.\n'));
      if (cb) cb(false);
    }
  });
};

module.exports = finish;
