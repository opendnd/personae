const colors = require('colors/safe');

class Renderer {
  static output(person) {
    const { name, gender, type, alignment, race, klass, background, specialty, personalityTraits, ideal, bond, flaw, mannerism, talent, trait, appearance } = person;

    let output = 'Person Description: \n\n';
    output += `\tGreetings, my name is ${colors.bold(name)} (${type}).\n`;
    output += `\tI am a ${gender} ${colors.bold(race)} ${colors.bold(klass)} and my alignment is ${colors.underline(alignment)}.\n`;
    
    if (background === 'Folk Hero') {
      output += `\tI've been known as a ${colors.bold(background)} ever since ${specialty}\n`;
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
    output += `\tMy most noticeable physical trait is that I'm ${appearance}.\n\n`;

    process.stdout.write(colors.white(output));
  }
}

module.exports = Renderer;
