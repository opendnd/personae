import { ILinkPerson, IPerson } from "opendnd-core";
import Saver from "./saver";

const PDFDocument = require("pdfkit");
const SVGtoPDF = require("svg-to-pdfkit");
const fs = require("fs");
const path = require("path");
const Avataria = require("avataria");
const rootDir = path.join(__dirname, "..");
const assetsDir = path.join(rootDir, "assets");
const doc = new PDFDocument();

let filename = process.argv[2];
if (filename === undefined) { throw new Error("You must pass in a person as an input!"); }
filename = path.resolve(filename);

const avataria = new Avataria();
const person: IPerson = Saver.load(filename);

console.log(person); // eslint-disable-line no-console

const sheet1 = fs.readFileSync(path.join(assetsDir, "sheet1.svg"), "utf-8");
const sheet2 = fs.readFileSync(path.join(assetsDir, "sheet2.svg"), "utf-8");
const sheet3 = fs.readFileSync(path.join(assetsDir, "sheet3.svg"), "utf-8");
const sheet4 = fs.readFileSync(path.join(assetsDir, "sheet4.svg"), "utf-8");
const sheet5 = fs.readFileSync(path.join(assetsDir, "sheet5.svg"), "utf-8");

// add svg to doc
PDFDocument.prototype.addSVG = function(svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this; // eslint-disable-line no-sequences
};

doc.pipe(fs.createWriteStream(filename.replace(".per", ".pdf")));

const PDFOptions = {
  preserveAspectRatio: "xMaxYMax",
};

const renderBonus = (n) => {
  if (n >= 0) { return `+${n}`; }
  return n;
};

const calculateModifier = (score) => {
  return Math.floor((score - 10) / 2);
};

const calculateSkills = (skills) => {
  return {
    survival: 0,
    stealth: 0,
    sleightOfHand: 0,
    religion: 0,
    persuasion: 0,
    performance: 0,
    perception: 0,
    nature: 0,
    medicine: 0,
    investigation: 0,
    intimidation: 0,
    insight: 0,
    history: 0,
    deception: 0,
    athletics: 0,
    arcana: 0,
    animalHandling: 0,
    acrobatics: 0,
  };
};

const calculateSenses = (skills) => {
  return {
    passivePerception: 0,
    passiveInsight: 0,
    passiveIntelligence: 0,
  };
};

const renderMain = (svg) => {
  const {
    name ,
    klass,
    XP,
    level,
    background,
    playerName,
    DNA,
    speed,
    abilities,
    proficiencies,
    resistance,
    initiative,
    AC,
    HP,
    maxHP,
    tempHP,
    hitDice,
  } = person;
  const {
    skills,
    weapons,
    tools,
    languages,
    bonus: profBonus,
  } = proficiencies;
  const {
    STR,
    DEX,
    CON,
    INT,
    WIS,
    CHA,
  } = abilities;
  const {
    race,
  } = DNA;
  const {
    survival,
    stealth,
    sleightOfHand,
    religion,
    persuasion,
    performance,
    perception,
    nature,
    medicine,
    investigation,
    intimidation,
    insight,
    history,
    deception,
    athletics,
    arcana,
    animalHandling,
    acrobatics,
  } = calculateSkills(skills);

  const {
    passivePerception,
    passiveInsight,
    passiveIntelligence,
  } = calculateSenses(abilities);

  const weaponsProf = weapons.join(", ");
  const toolsProf = tools.join(", ");
  const languagesProf = languages.join(", ");

  const speedTxt = `${speed} ft. (Walking)`;
  const defensesTxt = `Resistances: ${resistance}`;
  const proficienciesTxt = `Weapons: ${weaponsProf}\nTools: ${toolsProf}\nLanguages: ${languagesProf}`;
  const actionsTxt = "";

  let displayHitDice = "";
  if (hitDice.length > 0) { displayHitDice = `${hitDice.length} ${hitDice[0]}`; }

  svg = svg
    .replace(/{character-name}/gi, name)
    .replace(/{class-level}/gi, `${klass.name} Level ${level}`)
    .replace(/{xp}/gi, XP)
    .replace(/{race}/gi, race.uuid)
    .replace(/{background}/gi, background.uuid)
    .replace(/{player-name}/gi, playerName)
    .replace(/{str}/gi, STR)
    .replace(/{str-mod}/gi, renderBonus(calculateModifier(STR)))
    .replace(/{dex}/gi, DEX)
    .replace(/{dex-mod}/gi, renderBonus(calculateModifier(DEX)))
    .replace(/{con}/gi, CON)
    .replace(/{con-mod}/gi, renderBonus(calculateModifier(CON)))
    .replace(/{int}/gi, INT)
    .replace(/{int-mod}/gi, renderBonus(calculateModifier(INT)))
    .replace(/{wis}/gi, WIS)
    .replace(/{wis-mod}/gi, renderBonus(calculateModifier(WIS)))
    .replace(/{cha}/gi, CHA)
    .replace(/{cha-mod}/gi, renderBonus(calculateModifier(CHA)))
    .replace(/{survival}/gi, renderBonus(survival))
    .replace(/{stealth}/gi, renderBonus(stealth))
    .replace(/{sleight-of-hand}/gi, renderBonus(sleightOfHand))
    .replace(/{religion}/gi, renderBonus(religion))
    .replace(/{persuasion}/gi, renderBonus(persuasion))
    .replace(/{performance}/gi, renderBonus(performance))
    .replace(/{perception}/gi, renderBonus(perception))
    .replace(/{nature}/gi, renderBonus(nature))
    .replace(/{medicine}/gi, renderBonus(medicine))
    .replace(/{investigation}/gi, renderBonus(investigation))
    .replace(/{intimidation}/gi, renderBonus(intimidation))
    .replace(/{insight}/gi, renderBonus(insight))
    .replace(/{history}/gi, renderBonus(history))
    .replace(/{deception}/gi, renderBonus(deception))
    .replace(/{athletics}/gi, renderBonus(athletics))
    .replace(/{arcana}/gi, renderBonus(arcana))
    .replace(/{animal-handling}/gi, renderBonus(animalHandling))
    .replace(/{acrobatics}/gi, renderBonus(acrobatics))
    .replace(/{passive-perception}/gi, passivePerception)
    .replace(/{passive-insight}/gi, passiveInsight)
    .replace(/{passive-intelligence}/gi, passiveIntelligence)
    .replace(/{max-hp}/gi, maxHP)
    .replace(/{current-hp}/gi, HP)
    .replace(/{temp-hp}/gi, tempHP)
    .replace(/{hit-dice}/gi, displayHitDice)
    .replace(/{saving-str}/gi, renderBonus(calculateModifier(STR)))
    .replace(/{saving-dex}/gi, renderBonus(calculateModifier(DEX)))
    .replace(/{saving-con}/gi, renderBonus(calculateModifier(CON)))
    .replace(/{saving-int}/gi, renderBonus(calculateModifier(INT)))
    .replace(/{saving-wis}/gi, renderBonus(calculateModifier(WIS)))
    .replace(/{saving-cha}/gi, renderBonus(calculateModifier(CHA)))
    .replace(/{ac}/gi, AC)
    .replace(/{prof-bonus}/gi, renderBonus(profBonus))
    .replace(/{speed}/gi, speedTxt)
    .replace(/{proficiencies}/gi, proficienciesTxt)
    .replace(/{defenses}/gi, defensesTxt)
    .replace(/{initiative}/gi, initiative)
    .replace(/{actions}/gi, actionsTxt);

  // weapons
  [...Array(6).keys()].forEach((i) => {
    const n = i + 1;
    svg = svg.replace(`{weapon-${n}}`, "");
  });

  return svg;
};

const renderFeatures = (svg) => {
  const {
    name,
    klass,
    XP,
    level,
    background,
    playerName,
    DNA,
    treasury,
  } = person;
  const {
    race,
  } = DNA;
  const {
    cp,
    sp,
    ep,
    gp,
    pp,
  } = treasury;

  const featuresTxt = "";
  const weightTxt = `${0} lb.`;
  const encumberedTxt = `${0} lb.`;
  const pushTxt = `${0} lb.`;

  svg = svg
    .replace(/{character-name}/gi, name)
    .replace(/{class-level}/gi, `${klass.name} Level ${level}`)
    .replace(/{xp}/gi, XP)
    .replace(/{race}/gi, race.uuid)
    .replace(/{background}/gi, background.uuid)
    .replace(/{player-name}/gi, playerName)
    .replace(/{features}/gi, featuresTxt)
    .replace(/{cp}/gi, cp)
    .replace(/{sp}/gi, sp)
    .replace(/{ep}/gi, ep)
    .replace(/{gp}/gi, gp)
    .replace(/{pp}/gi, pp)
    .replace(/{weight}/gi, weightTxt)
    .replace(/{encumbered}/gi, encumberedTxt)
    .replace(/{push}/gi, pushTxt);

  // items
  [...Array(26).keys()].forEach((i) => {
    const n = i + 1;
    svg = svg.replace(`{item-${n}}`, "");
  });

  // magic items
  [...Array(3).keys()].forEach((i) => {
    const n = i + 1;
    svg = svg.replace(`{magic-item-${n}}`, "");
  });

  return svg;
};

const renderAppearance = (svg) => {
  const {
    name,
    age,
    alignment,
    faith,
    DNA,
    personalityTraits,
    ideal: ideals,
    bond: bonds,
    flaw: flaws,
    allies,
  } = person;
  const {
    race,
    gender,
    traits,
    weight,
    height,
    size,
  } = DNA;
  const {
    "skin-color": skinColor = {},
    "skin-general": skinGeneral = {},
    "eye-color": eyeColor = {},
    "eye-shape": eyeShape = {},
    "hair-color": hairColor = {},
    "hair-general": hairGeneral = {},
  } = traits as any; // TODO: fix with proper trait mapping

  // TODO: fix with updating avataria
  const avatar = avataria.generate({
    DNA: Object.assign(DNA, {
      race: race.uuid,
    }),
  });
  fs.writeFileSync(filename.replace(".per", ".svg"), avatar);

  const skin = `${skinGeneral.trait} ${skinColor.trait}`;
  const eyes = `${eyeColor.trait} ${eyeShape.trait}`;
  const hair = `${hairColor.trait} ${hairGeneral.trait}`;
  const personalityTraitsTxt = personalityTraits.join(" ");
  const alliesTxt = allies.join(" ");

  svg = svg
    .replace(/{character-name}/gi, name)
    .replace(/{gender}/gi, gender)
    .replace(/{age}/gi, age)
    .replace(/{size}/gi, size)
    .replace(/{height}/gi, height)
    .replace(/{weight}/gi, weight)
    .replace(/{faith}/gi, faith)
    .replace(/{alignment}/gi, alignment)
    .replace(/{skin}/gi, skin)
    .replace(/{eyes}/gi, eyes)
    .replace(/{hair}/gi, hair)
    .replace(/{ideals}/gi, ideals)
    .replace(/{bonds}/gi, bonds)
    .replace(/{flaws}/gi, flaws)
    .replace(/{allies}/gi, alliesTxt)
    .replace(/{notes}/gi, "")
    .replace(/{backstory}/gi, "")
    .replace(/{appearance}/gi, "")
    // .replace(/{avatar}/gi, avatar)
    .replace(/{personality-traits}/gi, personalityTraitsTxt);

  return svg;
};

const renderSpells = (svg) => {
  const {
    spellcasting,
  } = person;
  const {
    ability: spellcastingAbility = "",
    saveDC: spellSaveDC = "",
    attackModifier: spellAttackBonus = "",
  } = spellcasting;
  const spellcastingClass = "";

  svg = svg
    .replace(/{spellcasting-class}/gi, spellcastingClass)
    .replace(/{spellcasting-ability}/gi, spellcastingAbility)
    .replace(/{spell-save-dc}/gi, spellSaveDC)
    .replace(/{spell-attack-bonus}/gi, spellAttackBonus);

  // spells
  [...Array(40).keys()].forEach((i) => {
    const n = i + 1;
    svg = svg.replace(`{spell-${n}}`, "");
  });

  return svg;
};

const renderGenetics = (svg) => {
  const {
    name,
    DNA,
    spouse = {} as ILinkPerson,
    mother = {} as ILinkPerson,
    father = {} as ILinkPerson,
    children = [] as ILinkPerson[],
    liege = {} as ILinkPerson,
    family = {} as ILinkPerson,
    siblings = [] as ILinkPerson[],
    birth,
  } = person;
  const {
    gender,
    traits,
    chromosomes,
  } = DNA;
  const {
    general: resultGeneral = {},
    "eye-color": resultEyeColor = {},
    "hair-general": resultHairGeneral = {},
    "hair-color": resultHairColor = {},
    "skin-general": resultSkinGeneral = {},
    "skin-color": resultSkinColor = {},
    "eye-shape": resultEyeShape = {},
    "face-shape": resultFaceShape = {},
    "face-nose": resultFaceNose = {},
    "hair-facial": resultHairFacial = {},
    "face-mouth": resultFaceMouth = {},
    "eye-brows": resultEyeBrows = {},
    "skin-aging": resultSkinAging = {},
    sex: resultSex = {},
  } = traits as any;
  const {
    name: motherName = "",
  } = mother;
  const {
    name: fatherName = "",
  } = father;
  const {
    name: spouseName = "",
  } = spouse;
  const {
    uuid: familyName = "",
  } = family;
  const {
    name: liegeName = "",
  } = liege;
  const {
    rank: birthRank,
    domain: birthDomain,
  } = birth;
  const {
    uuid: homeland,
  } = birthDomain;
  const childrenCount = children.length;
  const siblingsCount = siblings.length;
  const notes = "";

  svg = svg
    .replace(/{character-name}/gi, name)
    .replace(/{gender}/gi, gender)
    .replace(/{mother}/gi, motherName)
    .replace(/{father}/gi, fatherName)
    .replace(/{spouse}/gi, spouseName)
    .replace(/{children}/gi, childrenCount)
    .replace(/{family}/gi, familyName)
    .replace(/{liege}/gi, liegeName)
    .replace(/{siblings}/gi, siblingsCount)
    .replace(/{birth-rank}/gi, birthRank)
    .replace(/{homeland}/gi, homeland)
    .replace(/{notes}/gi, notes);

  // chromosomes
  [...Array(32).keys()].forEach((i) => {
    const n = i + 1;
    const chromosome = chromosomes[n];

    if (chromosome) {
      const parts = chromosome.split("=");
      svg = svg
        .replace(`{chromosome-${n}-mother}`, parts[0])
        .replace(`{chromosome-${n}-father}`, parts[1]);
    } else {
      svg = svg
        .replace(`{chromosome-${n}-mother}`, "")
        .replace(`{chromosome-${n}-father}`, "");
    }
  });

  // results
  const results = {
    "{general-result}": resultGeneral,
    "{eye-shape-result}": resultEyeShape,
    "{eye-color-result}": resultEyeColor,
    "{eye-brows-result}": resultEyeBrows,
    "{skin-result}": resultSkinGeneral,
    "{skin-color-result}": resultSkinColor,
    "{skin-aging-result}": resultSkinAging,
    "{face-result}": resultFaceShape,
    "{nose-result}": resultFaceNose,
    "{mouth-result}": resultFaceMouth,
    "{hair-result}": resultHairGeneral,
    "{hair-color-result}": resultHairColor,
    "{facial-hair-result}": resultHairFacial,
    "{sex-result}": resultSex,
  };

  // display results
  Object.keys(results).forEach((resultKey) => {
    const resultValue = results[resultKey];
    const {
      gene = "",
      trait = "",
    } = resultValue;
    const parts = gene.split(":");
    if (parts.length >= 2) {
      const chromosome = parts[1].replace(/c/gi, "");
      const result = parts[2];
      svg = svg
        .replace(resultKey, `${chromosome} ${result} ${trait}`);
    }
  });

  return svg;
};

doc.addSVG(renderMain(sheet1), 0, 0, PDFOptions);
doc.addPage().addSVG(renderFeatures(sheet2), 0, 0, PDFOptions);
doc.addPage().addSVG(renderAppearance(sheet3), 0, 0, PDFOptions);
doc.addPage().addSVG(renderSpells(sheet4), 0, 0, PDFOptions);
doc.addPage().addSVG(renderGenetics(sheet5), 0, 0, PDFOptions);

doc.end();
