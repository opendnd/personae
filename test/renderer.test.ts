import { expect } from 'chai';
import Personae from '../src/personae';
import Renderer from '../src/renderer';

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
