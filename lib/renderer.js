const colors = require('colors/safe');

class Renderer {
  static output(person) {
    const { name, gender, age, type, alignment, race, klass, background, specialty, personalityTraits, ideal, bond, flaw, mannerism, talent, trait, characteristic, DNA } = person;
    const appearance = DNA.traits;

    const renderAppearance = (legend) => {
      if (appearance[legend] === undefined) return '';
      const gene = appearance[legend];
      return gene.trait;
    };

    let output = 'Person Description: \n\n';
    output += `\tGreetings, my name is ${colors.bold(name)} (${type}) and I'm ${age} years old.\n`;
    output += `\tI am a ${gender} ${colors.bold(race)} ${colors.bold(klass)} and my alignment is ${colors.underline(alignment)}.\n`;

    if (background === 'Folk Hero') {
      output += `\tI've been known as a ${colors.bold(background)} ever since ${specialty}\n`;
    } else if (background === 'Charlatan') {
      output += `\tI'm a ${colors.bold(background)}, my favorite scam is ${specialty}\n`;
    } else if (background === 'Hermit') {
      output += `\tI've been a ${colors.bold(background)}, I entered the life of seclusion as ${specialty}\n`;
    } else if (background === 'Urchin') {
      output += `\tI grew up as a ${colors.bold(background)} as I was orphaned, ${specialty}\n`;
    } else {
      output += `\tPreviously, I've been a ${colors.bold(background)} with the ${colors.bold(specialty)} specialty.\n`;
    }

    output += `\t${personalityTraits[0]}\n`;
    output += `\tAlso, ${personalityTraits[1]}\n`;
    output += `\tMy ideal is ${ideal}\n`;
    output += `\tMy bond is that ${bond}\n`;
    output += `\tI'd say my biggest flaw is that ${flaw}\n`;
    output += `\tPeople that interact with me say that ${mannerism}\n`;
    output += `\tI've also been told that I'm ${trait.toLowerCase()}.\n`;
    output += `\tA talent of mine is that ${talent}\n`;
    output += `\tI'd say my most noticeable physical characteristic is that I'm ${characteristic}.\n`;
    output += `\tMy ${renderAppearance('skin-general')} ${renderAppearance('skin-color')} skin coats my ${renderAppearance('general')} body.\n`;

    if (gender === 'male') {
      output += `\tMy ${renderAppearance('hair-general')} ${renderAppearance('hair-color')} hair sits atop my ${renderAppearance('hair-facial')} ${renderAppearance('face-shape')} face and features my ${renderAppearance('face-nose')} nose and ${renderAppearance('face-mouth')} mouth.\n`;
      if (renderAppearance('sex').length >= 1) output += `\tAs a male ${race}, they say I'm ${renderAppearance('sex')}.\n`;
    } else {
      output += `\tMy ${renderAppearance('hair-general')} ${renderAppearance('hair-color')} hair sits atop my ${renderAppearance('face-shape')} face and features my ${renderAppearance('face-nose')} nose and ${renderAppearance('face-mouth')} mouth.\n`;
      if (renderAppearance('sex').length >= 1) output += `\tAs a female ${race}, they say I'm ${renderAppearance('sex')}.\n`;
    }

    output += `\tMy ${renderAppearance('eye-color')} ${renderAppearance('eye-shape')} eyes sit beneath my ${renderAppearance('eye-brows')} brows.\n`;
    output += '\n';

    output = output.replace(/ {2}/gi, ' '); // remove double spaces

    process.stdout.write(colors.white(output));
  }
}

module.exports = Renderer;
