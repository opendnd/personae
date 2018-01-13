/* eslint-disable */

const expect = require('chai').expect;
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const Personae = require(path.join(libDir, 'personae'));
let personae, person, parents, child;

describe('Personae', () => {
  before(() => {
    personae = new Personae();
  });

  context('person', () => {
    before(() => {
      person = personae.generate();
    });

    it('can generate', () => {
      expect(person).to.be.an('object');
    });

    it('has a theme', () => {
      expect(person.theme).to.be.a('string');
    });

    it('has a name', () => {
      expect(person.name).to.be.a('string');
    });

    it('has a age', () => {
      expect(person.age).to.be.a('number');
    });

    it('has an ageGroup', () => {
      expect(person.ageGroup).to.be.a('string');
    });

    it('has abilities', () => {
      expect(person.abilities).to.be.an('object');
    });

    it('has a type', () => {
      expect(person.type).to.be.a('string');
    });

    it('has an alignment', () => {
      expect(person.type).to.be.a('string');
    });

    it('has a klass', () => {
      expect(person.klass).to.be.a('string');
    });

    it('has a background', () => {
      expect(person.background).to.be.a('string');
    });

    it('has a specialty', () => {
      expect(person.specialty).to.be.a('string');
    });

    it('has personalityTraits', () => {
      expect(person.personalityTraits).to.be.an('array');
    });

    it('has a ideal', () => {
      expect(person.ideal).to.be.a('string');
    });

    it('has a bond', () => {
      expect(person.bond).to.be.a('string');
    });

    it('has a flaw', () => {
      expect(person.flaw).to.be.a('string');
    });

    it('has a mannerism', () => {
      expect(person.mannerism).to.be.a('string');
    });

    it('has a talent', () => {
      expect(person.talent).to.be.a('string');
    });

    it('has a trait', () => {
      expect(person.trait).to.be.a('string');
    });

    it('has a characteristic', () => {
      expect(person.characteristic).to.be.a('string');
    });

    it('has DNA', () => {
      expect(person.DNA).to.be.an('object');
      expect(person.DNA.gender).to.be.a('string');
      expect(person.DNA.race).to.be.a('string');
    });    
  })

  it('generates with default options', () => {
    person = personae.generate();

    expect(person.type).to.eq('NPC');
  });

  it('generates parents', () => {
    person = personae.generate();
    parents = personae.generateParents(person);

    const { mother, father } = parents;

    expect(mother).to.be.an('object');
    expect(father).to.be.an('object');
  });

  it('generates a child', () => {
    const mother = personae.generate({ gender: 'female', race: 'Dragonborn' });
    const father = personae.generate({ gender: 'male', race: 'Dragonborn' });
    child = personae.generateChild({}, mother, father);

    expect(child).to.be.an('object');
  });

  it('getDefaults returns defaults with genders and races', () => {
    expect(Personae.getDefaults().genders).to.be.an('array');
    expect(Personae.getDefaults().races).to.be.an('array');
  });
});
