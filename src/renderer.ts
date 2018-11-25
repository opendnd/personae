import "./extensions";

import { AgeGroups, Categories, Genders, Person } from "@opendnd/core";

const colors = require("colors/safe");

class Renderer {
  public static renderDescription(person: Person) {
    const { name, ageGroup, type, characteristic, DNA } = person;
    const appearance = DNA.traits;
    const { gender, race } = DNA;

    const renderAppearance = (categoryName) => {
      if (appearance[categoryName] === undefined) { return ""; } // make sure this race has the categoryName
      if ((categoryName === Categories.SkinAging) && (ageGroup !== AgeGroups.Old)) { return ""; } // only apply aging if we're in the old ageGroup
      const gene = appearance[categoryName];
      return gene.trait;
    };

    const posPro = (gender === Genders.Male) ? "his" : "her";
    const perPro = (gender === Genders.Male) ? "he" : "she";

    let descOutput = "";
    descOutput += `\t${name} is a ${gender} ${colors.bold(race.name)} (${type}) described as ${renderAppearance(Categories.General)} with ${renderAppearance(Categories.SkinAging)} ${renderAppearance(Categories.SkinGeneral)} ${renderAppearance(Categories.SkinColor)} skin.\n`;
    descOutput += `\t${posPro.capitalize()} most noticeable physical characteristic is that ${perPro}'s ${characteristic}.\n`;

    if (gender === Genders.Male) {
      descOutput += `\t${posPro.capitalize()} ${renderAppearance(Categories.HairGeneral)} ${renderAppearance(Categories.HairColor)} hair sits atop ${posPro} ${renderAppearance(Categories.HairFacial)} ${renderAppearance(Categories.FaceShape)} face and features ${posPro} ${renderAppearance(Categories.FaceNose)} nose and ${renderAppearance(Categories.FaceMouth)} mouth.\n`;
      if (renderAppearance(Categories.Sex).length >= 1) { descOutput += `\tAs a male ${race.name}, they say I'm ${renderAppearance(Categories.Sex)}.\n`; }
    } else {
      descOutput += `\t${posPro.capitalize()} ${renderAppearance(Categories.HairGeneral)} ${renderAppearance(Categories.HairColor)} hair sits atop ${posPro} ${renderAppearance(Categories.FaceShape)} face and features ${posPro} ${renderAppearance(Categories.FaceNose)} nose and ${renderAppearance(Categories.FaceMouth)} mouth.\n`;
      if (renderAppearance(Categories.Sex).length >= 1) { descOutput += `\tAs a female ${race.name}, they say I'm ${renderAppearance(Categories.Sex)}.\n`; }
    }

    descOutput += `\t${posPro.capitalize()} ${renderAppearance(Categories.EyeColor)} ${renderAppearance(Categories.EyeShape)} eyes sit beneath ${posPro} ${renderAppearance(Categories.EyeBrows)} brows.\n`;

    descOutput = descOutput.replace(/ {2}/gi, " "); // remove double spaces

    return descOutput;
  }

  public static renderIntro(person) {
    const { name, age, ageGroup, alignment, klass, background, specialty, personalityTraits, ideal, bond, flaw, mannerism, talent, trait, DNA } = person;
    const { gender, race } = DNA;

    let introOutput = "";
    introOutput += `\tGreetings, my name is ${colors.bold(name)} and I'm ${age} years old (${ageGroup}).\n`;
    introOutput += `\tI am a ${gender} ${colors.bold(race.name)} ${colors.bold(klass.name)} and my alignment is ${colors.underline(alignment)}.\n`;

    if (background.name === "Folk Hero") {
      introOutput += `\tI've been known as a ${colors.bold(background.name)} ever since ${specialty}\n`;
    } else if (background.name === "Charlatan") {
      introOutput += `\tI'm a ${colors.bold(background.name)}, my favorite scam is ${specialty}\n`;
    } else if (background.name === "Hermit") {
      introOutput += `\tI've been a ${colors.bold(background.name)}, I entered the life of seclusion as ${specialty}\n`;
    } else if (background.name === "Urchin") {
      introOutput += `\tI grew up as a ${colors.bold(background.name)} as I was orphaned, ${specialty}\n`;
    } else {
      introOutput += `\tPreviously, I've been a ${colors.bold(background.name)} with the ${colors.bold(specialty)} specialty.\n`;
    }

    introOutput += `\t${personalityTraits[0]}\n`;
    introOutput += `\tAlso, ${personalityTraits[1]}\n`;
    introOutput += `\tMy ideal is ${ideal}\n`;
    introOutput += `\tMy bond is that ${bond.lowerCaseFirst()}\n`;
    introOutput += `\tI'd say my biggest flaw is that ${flaw.lowerCaseFirst()}\n`;
    introOutput += `\tPeople that interact with me say that ${mannerism}\n`;
    introOutput += `\tI've also been told that I'm ${trait.toLowerCase()}.\n`;
    introOutput += `\tA talent of mine is that ${talent}\n`;

    introOutput = introOutput.replace(/ {2}/gi, " "); // remove double spaces

    return introOutput;
  }

  public static renderAbilities(person) {
    const { abilities } = person;

    let abilitiesOutput = "";
    abilitiesOutput += `\t- STR: ${abilities.STR}\n`;
    abilitiesOutput += `\t- DEX: ${abilities.DEX}\n`;
    abilitiesOutput += `\t- CON: ${abilities.CON}\n`;
    abilitiesOutput += `\t- INT: ${abilities.INT}\n`;
    abilitiesOutput += `\t- WIS: ${abilities.WIS}\n`;
    abilitiesOutput += `\t- CHA: ${abilities.CHA}\n`;
    abilitiesOutput += "\n";

    abilitiesOutput = abilitiesOutput.replace(/ {2}/gi, " "); // remove double spaces

    return abilitiesOutput;
  }

  public static toConsole(person) {
    const header = `\nPerson Description (made with Personae v${person.version}):\n\n`;
    const descOutput = Renderer.renderDescription(person);
    const desc = `${colors.bold("Description")}\n${descOutput}\n`;
    const introOutput = Renderer.renderIntro(person);
    const intro = `${colors.bold("Introduction")}\n${introOutput}\n`;
    const abilitiesOutput = Renderer.renderAbilities(person);
    const abilities = `${colors.bold("Abilities")}\n${abilitiesOutput}`;

    // combine to console output
    const consoleOutput = header + desc + intro + abilities;

    return colors.white(consoleOutput);
  }

  public static toMarkdown(person) {
    const header = `# ${person.name}\n\n`;

    // replace desc tabs with nothing
    const descOutput = Renderer.renderDescription(person).replace(/\t/g, "");
    const desc = `## Description\n${descOutput}\n`;

    // replace intro tabs with blockquote md
    const introOutput = Renderer.renderIntro(person).replace(/\t/g, "> ");
    const intro = `## Introduction\n${introOutput}\n`;

    // Replace \t characters with a hyphen for Markdown unordered lists
    const abilitiesOutput = Renderer.renderAbilities(person).replace(/\t/g, "");
    const abilities = `## Abilities\n${abilitiesOutput}`;

    // combine to markdown output
    const markdownOutput = header + desc + intro + abilities;

    return colors.white(markdownOutput);
  }
}

export default Renderer;
