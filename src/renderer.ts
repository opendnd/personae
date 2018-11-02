import './extensions';

import { Person, Genders, AgeGroups, PersonTypes, ExpandedAlignments } from 'opendnd-core';

const colors = require('colors/safe');

class Renderer {
  static renderDescription(person:Person) {
    const { name, ageGroup, type, characteristic, DNA } = person;
    const appearance = DNA.traits;
    const { gender, race } = DNA;

    const renderAppearance = (legendName) => {
      if (appearance[legendName] === undefined) return ''; // make sure this race has the legendName
      if ((legendName === 'skin-aging') && (ageGroup !== AgeGroups.Old)) return ''; // only apply aging if we're in the old ageGroup
      const gene = appearance[legendName];
      return gene.trait;
    };

    const posPro = (gender === Genders.Male) ? 'his' : 'her';
    const perPro = (gender === Genders.Male) ? 'he' : 'she';

    let descOutput = '';
    descOutput += `\t${name} is a ${Genders[gender]} ${colors.bold(race.uuid)} (${PersonTypes[type]}) described as ${renderAppearance('general')} with ${renderAppearance('skin-aging')} ${renderAppearance('skin-general')} ${renderAppearance('skin-color')} skin.\n`;
    descOutput += `\t${posPro.capitalize()} most noticeable physical characteristic is that ${perPro}'s ${characteristic}.\n`;

    if (gender === Genders.Male) {
      descOutput += `\t${posPro.capitalize()} ${renderAppearance('hair-general')} ${renderAppearance('hair-color')} hair sits atop ${posPro} ${renderAppearance('hair-facial')} ${renderAppearance('face-shape')} face and features ${posPro} ${renderAppearance('face-nose')} nose and ${renderAppearance('face-mouth')} mouth.\n`;
      if (renderAppearance('sex').length >= 1) descOutput += `\tAs a male ${race}, they say I'm ${renderAppearance('sex')}.\n`;
    } else {
      descOutput += `\t${posPro.capitalize()} ${renderAppearance('hair-general')} ${renderAppearance('hair-color')} hair sits atop ${posPro} ${renderAppearance('face-shape')} face and features ${posPro} ${renderAppearance('face-nose')} nose and ${renderAppearance('face-mouth')} mouth.\n`;
      if (renderAppearance('sex').length >= 1) descOutput += `\tAs a female ${race}, they say I'm ${renderAppearance('sex')}.\n`;
    }

    descOutput += `\t${posPro.capitalize()} ${renderAppearance('eye-color')} ${renderAppearance('eye-shape')} eyes sit beneath ${posPro} ${renderAppearance('eye-brows')} brows.\n`;

    descOutput = descOutput.replace(/ {2}/gi, ' '); // remove double spaces

    return descOutput;
  }

  static renderIntro(person) {
    const { name, age, ageGroup, alignment, klass, background, specialty, personalityTraits, ideal, bond, flaw, mannerism, talent, trait, DNA } = person;
    const { gender, race } = DNA;

    let introOutput = '';
    introOutput += `\tGreetings, my name is ${colors.bold(name)} and I'm ${age} years old (${AgeGroups[ageGroup]}-age).\n`;
    introOutput += `\tI am a ${Genders[gender]} ${colors.bold(race.uuid)} ${colors.bold(klass.name)} and my alignment is ${colors.underline(ExpandedAlignments[alignment])}.\n`;

    if (background.uuid === 'Folk Hero') {
      introOutput += `\tI've been known as a ${colors.bold(background.uuid)} ever since ${specialty}\n`;
    } else if (background.uuid === 'Charlatan') {
      introOutput += `\tI'm a ${colors.bold(background.uuid)}, my favorite scam is ${specialty}\n`;
    } else if (background.uuid === 'Hermit') {
      introOutput += `\tI've been a ${colors.bold(background.uuid)}, I entered the life of seclusion as ${specialty}\n`;
    } else if (background.uuid === 'Urchin') {
      introOutput += `\tI grew up as a ${colors.bold(background.uuid)} as I was orphaned, ${specialty}\n`;
    } else {
      introOutput += `\tPreviously, I've been a ${colors.bold(background.uuid)} with the ${colors.bold(specialty)} specialty.\n`;
    }

    introOutput += `\t${personalityTraits[0]}\n`;
    introOutput += `\tAlso, ${personalityTraits[1]}\n`;
    introOutput += `\tMy ideal is ${ideal}\n`;
    introOutput += `\tMy bond is that ${bond.lowerCaseFirst()}\n`;
    introOutput += `\tI'd say my biggest flaw is that ${flaw.lowerCaseFirst()}\n`;
    introOutput += `\tPeople that interact with me say that ${mannerism}\n`;
    introOutput += `\tI've also been told that I'm ${trait.toLowerCase()}.\n`;
    introOutput += `\tA talent of mine is that ${talent}\n`;

    introOutput = introOutput.replace(/ {2}/gi, ' '); // remove double spaces

    return introOutput;
  }

  static renderAbilities(person) {
    const { abilities } = person;

    let abilitiesOutput = '';
    abilitiesOutput += `\t- STR: ${abilities.STR}\n`;
    abilitiesOutput += `\t- DEX: ${abilities.DEX}\n`;
    abilitiesOutput += `\t- CON: ${abilities.CON}\n`;
    abilitiesOutput += `\t- INT: ${abilities.INT}\n`;
    abilitiesOutput += `\t- WIS: ${abilities.WIS}\n`;
    abilitiesOutput += `\t- CHA: ${abilities.CHA}\n`;
    abilitiesOutput += '\n';

    abilitiesOutput = abilitiesOutput.replace(/ {2}/gi, ' '); // remove double spaces

    return abilitiesOutput;
  }

  static toConsole(person) {
    const header = `\nPerson Description (made with Personae v${person.version}):\n\n`;
    const descOutput = Renderer.renderDescription(person);
    const desc = `${colors.bold('Description')}\n${descOutput}\n`;
    const introOutput = Renderer.renderIntro(person);
    const intro = `${colors.bold('Introduction')}\n${introOutput}\n`;
    const abilitiesOutput = Renderer.renderAbilities(person);
    const abilities = `${colors.bold('Abilities')}\n${abilitiesOutput}`;

    // combine to console output
    const consoleOutput = header + desc + intro + abilities;

    return colors.white(consoleOutput);
  }

  static toMarkdown(person) {
    const header = `# ${person.name}\n\n`;

    // replace desc tabs with nothing
    const descOutput = Renderer.renderDescription(person).replace(/\t/g, '');
    const desc = `## Description\n${descOutput}\n`;

    // replace intro tabs with blockquote md
    const introOutput = Renderer.renderIntro(person).replace(/\t/g, '> ');
    const intro = `## Introduction\n${introOutput}\n`;

    // Replace \t characters with a hyphen for Markdown unordered lists
    const abilitiesOutput = Renderer.renderAbilities(person).replace(/\t/g, '');
    const abilities = `## Abilities\n${abilitiesOutput}`;

    // combine to markdown output
    const markdownOutput = header + desc + intro + abilities;

    return colors.white(markdownOutput);
  }
}

export default Renderer;
