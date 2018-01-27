const colors = require('colors/safe');

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

class Renderer {
  static renderDescription(person) {
    const { name, ageGroup, type, characteristic, DNA } = person;
    const appearance = DNA.traits;
    const { gender, race } = DNA;

    const renderAppearance = (legendName) => {
      if (appearance[legendName] === undefined) return ''; // make sure this race has the legendName
      if ((legendName === 'skin-aging') && (ageGroup !== 'old')) return ''; // only apply aging if we're in the old ageGroup
      const gene = appearance[legendName];
      return gene.trait;
    };

    const posPro = (gender === 'male') ? 'his' : 'her';
    const perPro = (gender === 'male') ? 'he' : 'she';

    let descOutput = '';
    descOutput += `\t${name} is a ${gender} ${colors.bold(race)} (${type}) described as ${renderAppearance('general')} with ${renderAppearance('skin-aging')} ${renderAppearance('skin-general')} ${renderAppearance('skin-color')} skin.\n`;
    descOutput += `\t${posPro.capitalize()} most noticeable physical characteristic is that ${perPro}'s ${characteristic}.\n`;

    if (gender === 'male') {
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
    introOutput += `\tGreetings, my name is ${colors.bold(name)} and I'm ${age} years old (${ageGroup}-age).\n`;
    introOutput += `\tI am a ${gender} ${colors.bold(race)} ${colors.bold(klass)} and my alignment is ${colors.underline(alignment)}.\n`;

    if (background === 'Folk Hero') {
      introOutput += `\tI've been known as a ${colors.bold(background)} ever since ${specialty}\n`;
    } else if (background === 'Charlatan') {
      introOutput += `\tI'm a ${colors.bold(background)}, my favorite scam is ${specialty}\n`;
    } else if (background === 'Hermit') {
      introOutput += `\tI've been a ${colors.bold(background)}, I entered the life of seclusion as ${specialty}\n`;
    } else if (background === 'Urchin') {
      introOutput += `\tI grew up as a ${colors.bold(background)} as I was orphaned, ${specialty}\n`;
    } else {
      introOutput += `\tPreviously, I've been a ${colors.bold(background)} with the ${colors.bold(specialty)} specialty.\n`;
    }

    introOutput += `\t${personalityTraits[0]}\n`;
    introOutput += `\tAlso, ${personalityTraits[1]}\n`;
    introOutput += `\tMy ideal is ${ideal}\n`;
    introOutput += `\tMy bond is that ${bond}\n`;
    introOutput += `\tI'd say my biggest flaw is that ${flaw}\n`;
    introOutput += `\tPeople that interact with me say that ${mannerism}\n`;
    introOutput += `\tI've also been told that I'm ${trait.toLowerCase()}.\n`;
    introOutput += `\tA talent of mine is that ${talent}\n`;

    introOutput = introOutput.replace(/ {2}/gi, ' '); // remove double spaces

    return introOutput;
  }

  static renderAbilities(person) {
    const { abilities } = person;

    let abilitiesOutput = '';
    abilitiesOutput += `\t- STR: ${abilities.STR.score} (mod: ${abilities.STR.mod})\n`;
    abilitiesOutput += `\t- DEX: ${abilities.DEX.score} (mod: ${abilities.DEX.mod})\n`;
    abilitiesOutput += `\t- CON: ${abilities.CON.score} (mod: ${abilities.CON.mod})\n`;
    abilitiesOutput += `\t- INT: ${abilities.INT.score} (mod: ${abilities.INT.mod})\n`;
    abilitiesOutput += `\t- WIS: ${abilities.WIS.score} (mod: ${abilities.WIS.mod})\n`;
    abilitiesOutput += `\t- CHA: ${abilities.CHA.score} (mod: ${abilities.CHA.mod})\n`;
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

module.exports = Renderer;
