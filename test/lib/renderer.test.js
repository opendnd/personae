const expect = require('chai').expect;
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const Renderer = require(path.join(libDir, 'renderer'));
const Personae = require(path.join(libDir, 'personae'));

let personae, person;

describe('Renderer', () => {
  before(() => {
    personae = new Personae();
    person = personae.generate();
  });

  it('outputs to console', () => {
    const output = Renderer.toConsole(person);
    expect(output).to.be.a('string');
  });

  it('outputs to markdown', () => {
    const output = Renderer.toMarkdown(person);
    expect(output).to.be.a('string');
  });
});
