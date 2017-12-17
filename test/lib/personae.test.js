const expect = require('chai').expect;
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const Personae = require(path.join(libDir, 'personae'));
let personae, person;

describe('Personae', () => {
  before(() => {
    personae = new Personae();
  });

  it('can generate', () => {
    person = personae.generate();

    expect(person).to.be.an('object');
  });

  it('generates with defaults', () => {
    person = personae.generate();

    expect(person.type).to.eq('NPC');
  });
});