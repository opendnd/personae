const expect = require('chai').expect;
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const Personae = require(path.join(libDir, 'personae'));
let personae;

describe('Personae', () => {
  before(() => {
    personae = new Personae();
  });

  it('can generate', () => {
    expect(personae.generate()).to.be.an('object');
  });
});