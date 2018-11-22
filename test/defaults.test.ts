import { expect } from 'chai';
import defaults from '../src/defaults';

describe('defaults', () => {
  it('loads from default', () => {
    expect(defaults).to.be.an('object');
  });

  it('has race options', () => {
    expect(defaults.raceOptions).to.be.an('array');
  });

  it('has klass options', () => {
    expect(defaults.klassOptions).to.be.an('array');
  });

  it('has background options', () => {
    expect(defaults.backgroundOptions).to.be.an('array');
  });

  it('has culture options', () => {
    expect(defaults.cultureOptions).to.be.an('array');
  });

  it('has gender options', () => {
    expect(defaults.genderOptions).to.be.an('array');
  });

  it('has type options', () => {
    expect(defaults.typeOptions).to.be.an('array');
  });

  it('has alignment options', () => {
    expect(defaults.alignmentOptions).to.be.an('array');
  });
});
