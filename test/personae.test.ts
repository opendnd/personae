import { expect } from 'chai';
import Personae from '../src/personae';
import { PersonTypes, Genders } from 'opendnd-core';
let personae, person, parents, child;

import defaults from '../src/defaults';

// TODO: investigate what's setting this
Object.defineProperty(
  global,
  'token',
  { 
    set: (x) => { 
      debugger;
    } 
  }
);

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

    it('has a culture', () => {
      expect(person.culture.uuid).to.be.a('string');
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
      expect(person.klass.name).to.be.a('string');
    });

    it('has a background', () => {
      expect(person.background.uuid).to.be.a('string');
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
      expect(person.DNA.race.uuid).to.be.a('string');
    });    
  })

  it('generates with default options', () => {
    person = personae.generate();

    expect(person.type).to.eq(PersonTypes.Playable);
  });

  it('generates parents', () => {
    person = personae.generate();
    parents = personae.generateParents(person);

    const { mother, father } = parents;

    expect(mother).to.be.an('object');
    expect(father).to.be.an('object');
  });

  it('generates a child', () => {
    const race = Object.values(defaults.races).sample();
    const mother = personae.generate({ gender: Genders.Female, race });
    const father = personae.generate({ gender: Genders.Male, race });
    child = personae.generateChild({}, mother, father);

    expect(child).to.be.an('object');
  });
});
