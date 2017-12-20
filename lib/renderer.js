const colors = require('colors/safe');

class Renderer {
  static output(person) {
    const { name, gender, age, type, alignment, race, klass, background, specialty, personalityTraits, ideal, bond, flaw, mannerism, talent, trait, appearance } = person;

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
    output += `\tMy greatest talent is that ${talent}\n`;
    output += `\tMy most noticeable physical characteristic is that I'm ${appearance.characteristic}.\n`;
    output += `\tMy ${appearance.skin.general} ${appearance.skin.color} skin covers my ${appearance.body.general} body.\n`;

    if (gender === 'male') {
      output += `\tMy ${appearance.hair.general} ${appearance.hair.color} hair sits atop my ${appearance.hair.facial} ${appearance.face.shape} face and features my ${appearance.face.nose} nose and ${appearance.face.mouth} mouth.\n`;
    } else {
      output += `\tMy ${appearance.hair.general} ${appearance.hair.color} hair sits atop my ${appearance.face.shape} face and features my ${appearance.face.nose} nose and ${appearance.face.mouth} mouth.\n`;
    }

    output += `\tMy ${appearance.eyes.color} ${appearance.eyes.shape} eyes sit beneath my ${appearance.eyes.brows} brows.\n`;
    output += '\n';

    process.stdout.write(colors.white(output));
  }
}

module.exports = Renderer;
