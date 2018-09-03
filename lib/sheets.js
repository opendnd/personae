const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');
const libDir = path.join(rootDir, 'lib');
const Saver = require(path.join(libDir, 'saver'));
const doc = new PDFDocument();

const person = Saver.load(path.join(rootDir, 'test.per'));

console.log(person);

const sheet1 = fs.readFileSync(path.join(assetsDir, 'sheet1.svg'), 'utf-8');
const sheet2 = fs.readFileSync(path.join(assetsDir, 'sheet2.svg'), 'utf-8');
const sheet3 = fs.readFileSync(path.join(assetsDir, 'sheet3.svg'), 'utf-8');
const sheet4 = fs.readFileSync(path.join(assetsDir, 'sheet4.svg'), 'utf-8');
const sheet5 = fs.readFileSync(path.join(assetsDir, 'sheet5.svg'), 'utf-8');

// add svg to doc
PDFDocument.prototype.addSVG = function (svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this; // eslint-disable-line no-sequences
};

doc.pipe(fs.createWriteStream('test.pdf'));

const PDFOptions = {
  preserveAspectRatio: 'xMaxYMax',
};

const renderBonus = (n) => {
  if (n >= 0) return `+${n}`;
  return n;
};

const renderMain = (svg) => {
  const {
    name = '',
    klass = '',
    xp = 0,
    level = 1,
    background = '',
    playerName = '',
    DNA = {},
    abilities = {},
    stats = {},
    skills = {},
    senses = {},
    saving = {},
    defenses = {},
    proficiencies = {},
  } = person;
  const {
    race = '',
  } = DNA;
  const {
    resistances = '',
  } = defenses;
  const {
    weapons: weaponsProf = '',
    tools: toolsProf = '',
    languages: languagesProf = '',
  } = proficiencies;
  const {
    STR = {},
    DEX = {},
    CON = {},
    INT = {},
    WIS = {},
    CHA = {},
  } = abilities;
  const {
    STR: savingStr = 0,
    DEX: savingDex = 0,
    CON: savingCon = 0,
    INT: savingInt = 0,
    WIS: savingWis = 0,
    CHA: savingCha = 0,
  } = saving;
  const {
    score: strength = 10,
    mod: strengthMod = 0,
  } = STR;
  const {
    score: dexterity = 10,
    mod: dexterityMod = 0,
  } = DEX;
  const {
    score: constitution = 10,
    mod: constitutionMod = 0,
  } = CON;
  const {
    score: intelligence = 10,
    mod: intelligenceMod = 0,
  } = INT;
  const {
    score: wisdom = 10,
    mod: wisdomMod = 0,
  } = WIS;
  const {
    score: charisma = 10,
    mod: charismaMod = 0,
  } = CHA;
  const {
    initiative = 0,
    HP = {},
    AC = 10,
    'proficiency-bonus': profBonus = 0,
    speed = 30,
  } = stats;
  const {
    dice: hitDice = '1d6',
    max: maxHP = 0,
    current: currentHP = '',
    temp: tempHP = '',
  } = HP;
  const {
    survival = 0,
    stealth = 0,
    'sleight-of-hand': sleightOfHand = 0,
    religion = 0,
    persuasion = 0,
    performance = 0,
    perception = 0,
    nature = 0,
    medicine = 0,
    investigation = 0,
    intimidation = 0,
    insight = 0,
    history = 0,
    deception = 0,
    athletics = 0,
    arcana = 0,
    'animal-handling': animalHandling = 0,
    acrobatics = 0,
  } = skills;
  const {
    perception: passivePerception = 10,
    insight: passiveInsight = 10,
    intelligence: passiveIntelligence = 10,
  } = senses;

  const speedTxt = `${speed} ft. (Walking)`;
  const defensesTxt = `Resistances: ${resistances}`;
  const proficienciesTxt = `Weapons: ${weaponsProf}\nTools: ${toolsProf}\nLanguages: ${languagesProf}`;

  return svg
    .replace(/{character-name}/gi, name)
    .replace(/{class-level}/gi, `${klass} Level ${level}`)
    .replace(/{xp}/gi, xp)
    .replace(/{race}/gi, race)
    .replace(/{background}/gi, background)
    .replace(/{player-name}/gi, playerName)
    .replace(/{str}/gi, strength)
    .replace(/{str-mod}/gi, renderBonus(strengthMod))
    .replace(/{dex}/gi, dexterity)
    .replace(/{dex-mod}/gi, renderBonus(dexterityMod))
    .replace(/{con}/gi, constitution)
    .replace(/{con-mod}/gi, renderBonus(constitutionMod))
    .replace(/{int}/gi, intelligence)
    .replace(/{int-mod}/gi, renderBonus(intelligenceMod))
    .replace(/{wis}/gi, wisdom)
    .replace(/{wis-mod}/gi, renderBonus(wisdomMod))
    .replace(/{cha}/gi, charisma)
    .replace(/{cha-mod}/gi, renderBonus(charismaMod))
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
    .replace(/{current-hp}/gi, currentHP)
    .replace(/{temp-hp}/gi, tempHP)
    .replace(/{hit-dice}/gi, hitDice)
    .replace(/{saving-str}/gi, renderBonus(savingStr))
    .replace(/{saving-dex}/gi, renderBonus(savingDex))
    .replace(/{saving-con}/gi, renderBonus(savingCon))
    .replace(/{saving-int}/gi, renderBonus(savingInt))
    .replace(/{saving-wis}/gi, renderBonus(savingWis))
    .replace(/{saving-cha}/gi, renderBonus(savingCha))
    .replace(/{ac}/gi, AC)
    .replace(/{prof-bonus}/gi, renderBonus(profBonus))
    .replace(/{speed}/gi, speedTxt)
    .replace(/{proficiencies}/gi, proficienciesTxt)
    .replace(/{defenses}/gi, defensesTxt)
    .replace(/{initiative}/gi, initiative);
};

doc.addSVG(renderMain(sheet1), 0, 0, PDFOptions);
doc.addPage().addSVG(sheet2, 0, 0, PDFOptions);
doc.addPage().addSVG(sheet3, 0, 0, PDFOptions);
doc.addPage().addSVG(sheet4, 0, 0, PDFOptions);
doc.addPage().addSVG(sheet5, 0, 0, PDFOptions);

doc.end();
