/* eslint-disable */

// factory to create a background detail
const createBgDetail = (specialties, personalityTraits, ideals, bonds, flaws) => {
  return {
    specialties, 
    personalityTraits, 
    ideals, 
    bonds, 
    flaws,
  };
}

// background details
const Acolyte = createBgDetail(
  ['God', 'Goddess', 'Pantheon of Gods', 'Quasi-divine Being'],
  ["I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.", "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.", "I see omens in every event and action. The gods try to speak to us, we just need to listen.", "Nothing can shake my optimistic attitude.", "I quote (or misquote) sacred texts and proverbs in almost every situation.", "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.", "I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.", "I've spent so long in the temple that I have little practical experience dealing with people in the outside world."],
  {
    any: ["Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings."],
    good: ["Charity. I always try to help those in need, no matter what the personal cost."],
    evil: [],
    lawful: ["Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld.", "Power. I hope to one day rise to the top of my faith's religious hierarchy.", "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well."],
    neutral: [],
    chaotic: ["Change. We must help bring about the changes the gods are constantly working in the world."],
  },
  ["I would die to recover an ancient relic of my faith that was lost long ago.", "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.", "I owe my life to the priest who took me in when my parents died.", "Everything I do is for the common people.", "I will do anything to protect the temple where I served.", "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."],
  ["I judge others harshly, and myself even more severely.", "I put too much trust in those who wield power within my temple's hierarchy.", "My piety sometimes leads me to blindly trust those that profess faith in my god.", "I am inflexible in my thinking.", "I am suspicious of strangers and expect the worst of them.", "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."],
);
const Criminal = createBgDetail(
  ['Blackmailer', 'Burglar', 'Enforcer', 'Fence', 'Highway robber', 'Hired killer', 'Pickpocket', 'Smuggler'],
  ["I always have a plan for what to do when things go wrong.", "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.", "The first thing I do in a new place is note the locations of everything valuable -- or where such things could be hidden.", "I would rather make a new friend than a new enemy.", "I am incredibly slow to trust. Those who seem the fairest often have the most to hide.", "I don't pay attention to the risks in a situation. Never tell me the odds.", "The best way to get me to do something is to tell me I can't do it.", "I blow up at the slightest insult."],
  {
    any: [],
    good: ["Charity. I steal from the wealthy so that I can help people in need.", "Redemption. There's a spark of good in everyone."],
    evil: ["Greed. I will do whatever it takes to become wealthy."],
    lawful: ["Honor. I don't steal from others in the trade."],
    neutral: ["People. I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care."],
    chaotic: ["Freedom. Chains are meant to be broken, as are those who would forge them."],
  },
  ["I'm trying to pay off an old debt I owe to a generous benefactor.", "My ill-gotten gains go to support my family.", "Something important was taken from me, and I aim to steal it back.", "I will become the greatest thief that ever lived.", "I'm guilty of a terrible crime. I hope I can redeem myself for it.", "Someone I loved died because of I mistake I made. That will never happen again."],
  ["When I see something valuable, I can't think about anything but how to steal it.", "When faced with a choice between money and my friends, I usually choose the money.", "If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.", "I have a “tell” that reveals when I'm lying.", "I turn tail and run when things look bad.", "An innocent person is in prison for a crime that I committed. I'm okay with that."],
);
const FolkHero = createBgDetail(
  ["I stood up to a tyrant's agents.", "I saved people during a natural disaster.", "I stood alone against a terrible monster.", "I stole from a corrupt merchant to help the poor.", "I led a militia to fight off an invading army.", "I broke into a tyrant's castle and stole weapons to arm the people.", "I trained the peasantry to use farm implements as weapons against a tyrant's soldiers.", "A lord rescinded an unpopular decree after I led a symbolic act of protest against it.", "A celestial, fey, or similar creature gave me a blessing or revealed my secret origin.", "Recruited into a lord's army, I rose to leadership and was commended for my heroism."],
  ["I judge people by their actions, not their words.", "If someone is in trouble, I'm always ready to lend help.", "When I set my mind to something, I follow through no matter what gets in my way.", "I have a strong sense of fair play and always try to find the most equitable solution to arguments.", "I'm confident in my own abilities and do what I can to instill confidence in others.", "Thinking is for other people. I prefer action.", "I misuse long words in an attempt to sound smarter.", "I get bored easily. When am I going to get on with my destiny?"],
  {
    any: ["Destiny. Nothing and no one can steer me away from my higher calling."],
    good: ["Respect. People deserve to be treated with dignity and respect."],
    evil: ["Might. If I become strong, I can take what I want -- what I deserve."],
    lawful: ["Fairness. No one should get preferential treatment before the law, and no one is above the law."],
    neutral: ["Sincerity. There's no good in pretending to be something I'm not."],
    chaotic: ["Freedom. Tyrants must not be allowed to oppress the people."],
  },
  ["I have a family, but I have no idea where they are. One day, I hope to see them again.", "I worked the land, I love the land, and I will protect the land.", "A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.", "My tools are symbols of my past life, and I carry them so that I will never forget my roots.", "I protect those who cannot protect themselves.", "I wish my childhood sweetheart had come with me to pursue my destiny."],
  ["The tyrant who rules my land will stop at nothing to see me killed.", "I'm convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.", "The people who knew me when I was young know my shameful secret, so I can never go home again.", "I have a weakness for the vices of the city, especially hard drink.", "Secretly, I believe that things would be better if I were a tyrant lording over the land.", "I have trouble trusting in my allies."],
);
const Noble = createBgDetail(
  ['Prince/Princess', 'Marquess/Marquise', 'Count/Countess', 'Viscount/Viscountess', 'Baron/Baroness', 'Baronet', 'Knight'],
  ["My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.", "The common folk love me for my kindness and generosity.", "No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.", "I take great pains to always look my best and follow the latest fashions.", "I don't like to get my hands dirty, and I won't be caught dead in unsuitable accommodations.", "Despite my noble birth, I do not place myself above other folk. We all have the same blood.", "My favor, once lost, is lost forever.", "If you do me an injury, I will crush you, ruin your name, and salt your fields."],
  {
    any: ["Family. Blood runs thicker than water."],
    good: ["Respect. Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity.", "Noble Obligation. It is my duty to protect and care for the people beneath me."],
    evil: ["Power. If I can attain more power, no one will tell me what to do."],
    lawful: ["Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine."],
    neutral: [],
    chaotic: ["Independence. I must prove that I can handle myself without the coddling of my family."],
  },
  ["I will face any challenge to win the approval of my family.", "My house's alliance with another noble family must be sustained at all costs.", "Nothing is more important than the other members of my family.", "I am in love with the heir of a family that my family despises.", "My loyalty to my sovereign is unwavering.", "The common folk must see me as a hero of the people."],
  ["I secretly believe that everyone is beneath me.", "I hide a truly scandalous secret that could ruin my family forever.", "I too often hear veiled insults and threats in every word addressed to me, and I'm quick to anger.", "I have an insatiable desire for carnal pleasures.", "In fact, the world does revolve around me.", "By my words and actions, I often bring shame to my family."],
);
const Sage = createBgDetail(
  ["Alchemist", "Astronomer", "Discredited academic", "Librarian", "Professor", "Researcher", "Wizard's apprentice", "Scribe"],
  ["I use polysyllabic words that convey the impression of great erudition.", "I've read every book in the world's greatest libraries -- or I like to boast that I have.", "I'm used to helping out those who aren't as smart as I am, and I patiently explain anything and everything to others.", "There's nothing I like more than a good mystery.", "I'm willing to listen to every side of an argument before I make my own judgment.", "I...speak...slowly...when talking...to idiots,...which...almost...everyone...is...compared...to me.", "I am horribly, horribly awkward in social situations.", "I'm convinced that people are always trying to steal my secrets."],
  {
    any: ["Self-Improvement. The goal of a life of study is the betterment of oneself."],
    good: ["Beauty. What is beautiful points us beyond itself toward what is true."],
    evil: ["Power. Knowledge is the path to power and domination."],
    lawful: ["Logic. Emotions must not cloud our logical thinking."],
    neutral: ["Knowledge. The path to power and self-improvement is through knowledge."],
    chaotic: ["No Limits. Nothing should fetter the infinite possibility inherent in all existence."],
  },
  ["It is my duty to protect my students.", "I have an ancient text that holds terrible secrets that must not fall into the wrong hands.", "I work to preserve a library, university, scriptorium, or monastery.", "My life's work is a series of tomes related to a specific field of lore.", "I've been searching my whole life for the answer to a certain question.", "I sold my soul for knowledge. I hope to do great deeds and win it back."],
  ["I am easily distracted by the promise of information.", "Most people scream and run when they see a demon. I stop and take notes on its anatomy.", "Unlocking an ancient mystery is worth the price of a civilization.", "I overlook obvious solutions in favor of complicated ones.", "I speak without really thinking through my words, invariably insulting others.", "I can't keep a secret to save my life, or anyone else's."],
);
const Soldier = createBgDetail(
  ['Officer', 'Scout', 'Infantry', 'Cavalry', 'Healer', 'Quartermaster', 'Standard bearer', 'Support staff (cook, blacksmith, or the like)'],
  ["I'm always polite and respectful.", "I'm haunted by memories of war. I can't get the images of violence out of my mind.", "I've lost too many friends, and I'm slow to make new ones.", "I'm full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.", "I can stare down a hell hound without flinching.", "I enjoy being strong and like breaking things.", "I have a crude sense of humor.", "I face problems head-on. A simple, direct solution is the best path to success."],
  {
    any: ["Nation. My city, nation, or people are all that matter."],
    good: ["Greater Good. Our lot is to lay down our lives in defense of others."], 
    evil: ["Might. In life as in war, the stronger force wins."], 
    lawful: ["Responsibility. I do what I must and obey just authority."], 
    neutral: ["Live and Let Live. Ideals aren't worth killing over or going to war for."], 
    chaotic: ["Independence. When people follow orders blindly, they embrace a kind of tyranny."], 
  },
  ["I would still lay down my life for the people I served with.", "Someone saved my life on the battlefield. To this day, I will never leave a friend behind.", "My honor is my life.", "I'll never forget the crushing defeat my company suffered or the enemies who dealt it.", "Those who fight beside me are those worth dying for.", "I fight for those who cannot fight for themselves."],
  ["The monstrous enemy we faced in battle still leaves me quivering with fear.", "I have little respect for anyone who is not a proven warrior.", "I made a terrible mistake in battle that cost many lives -- and I would do anything to keep that mistake secret.", "My hatred of my enemies is blind and unreasoning.", "I obey the law, even if the law causes misery.", "I'd rather eat my armor than admit when I'm wrong."]
);

// default info
const defaults = {

  // types
  types: ['PC', 'NPC'],
  type: 'NPC',

  // info
  classes: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],
  alignments: ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'],

  // points
  standardArray: [15, 14, 13, 12, 10, 8],
  abilities: { 
    'STR': { score: 0, mod: 0 },
    'DEX': { score: 0, mod: 0 },
    'CON': { score: 0, mod: 0 },
    'INT': { score: 0, mod: 0 },
    'WIS': { score: 0, mod: 0 },
    'CHA': { score: 0, mod: 0 },
  },
  racialMod: {
    'Dragonborn': [
      { ability: 'STR', amount: 2 },
      { ability: 'CHA', amount: 1 },
    ],
    'Dwarf': [
      { ability: 'CON', amount: 2 },
    ],
    'Elf': [
      { ability: 'DEX', amount: 2 },
    ],
    'Gnome': [
      { ability: 'INT', amount: 2 },
    ],
    'Half-Elf': [
      { ability: 'CHA', amount: 2 },
      { ability: 'RND', amount: 1 },
      { ability: 'RND', amount: 1 },
    ],
    'Halfling': [
      { ability: 'DEX', amount: 2 },
    ],
    'Half-Orc': [
      { ability: 'STR', amount: 2 },
      { ability: 'CON', amount: 1 },
    ],
    'Human': [
      { ability: 'ALL', amount: 1 },
    ],
    'Tiefling': [
      { ability: 'INT', amount: 1 },
      { ability: 'CHA', amount: 2 },
    ],
  },
  // TODO: work on list of physical traits that add or subtract to certain abilities, like obese does -1 to DEX
  physicalMod: {},

  // race age ranges
  ageRanges: {
    'Dragonborn' : '15-80',
    'Dwarf'      : '20-350',
    'Elf'        : '100-750',
    'Gnome'      : '20-500',
    'Half-Elf'   : '20-180',
    'Halfling'   : '20-150',
    'Half-Orc'   : '14-75',
    'Human'      : '15-95',
    'Tiefling'   : '15-105',
  },

  // how to weight the ages into young / middle and old
  ageWeights: [0.3, 0.5, 0.2],

  // alignment details
  alignmentDetails: {
    'Lawful Good'     : { x: 0, y: 2 },
    'Neutral Good'    : { x: 1, y: 2 },
    'Chaotic Good'    : { x: 2, y: 2 },
    'Lawful Neutral'  : { x: 0, y: 1 },
    'True Neutral'    : { x: 1, y: 1 },
    'Chaotic Neutral' : { x: 2, y: 1 },
    'Lawful Evil'     : { x: 0, y: 0 },
    'Neutral Evil'    : { x: 1, y: 0 },
    'Chaotic Evil'    : { x: 2, y: 0 },
  },

  // alignment x and y
  alignmentX: ['Lawful', 'Neutral', 'Chaotic'],
  alignmentY: ['Evil', 'Neutral', 'Good'],

  // background details
  backgroundDetails: {
    Acolyte,
    Criminal,
    'Folk Hero': FolkHero,
    Noble,
    Sage,
    Soldier,
  },

  personalityTraits: [],
  ideals: {
    any: [],
    good: [],
    evil: [],
    lawful: [],
    neutral: [],
    chaotic: [],
  },
  bonds: [],
  flaws: [],
  mannerisms: ["I slur my words.", "I bite my fingernails.", "I bounce on my heels when excited.", "I constantly chew on things.", "I clear my throat before speaking.", "I click my tongue.", "I drum my fingers on tables.", "I eat abnormally large amounts of food.", "I eat like a bird.", "I enunciate overly clearly.", "I'm extravagant and harsh.", "I fidget.", "I frequently use the wrong word.", "I have a funny accent.", "I have a lisp.", "I hug everyone.", "I hum to myself when idle.", "I laugh far too loud.", "I laugh far too much.", "I lie compulsively.", "I flaunt my coin.", "I wear too much perfume.", "I make constant jokes.", "I make constant puns.", "I mispronounce common words.", "I mumble quietly when alone.", "I never sit with my back to the door.", "I offer advice, needed or not.", "I pace.", "I have a particularly low voice.", "I have a particularly high voice.", "I'm prone to singing quietly.", "I'm prone to humming quietly.", "I refer to everyone I introduce as, “My good friend”.", "I sigh heavily.", "I slouch.", "I have beautiful smile.", "I sneeze frequently.", "I speak an uncommon language.", "I speak in rhyme.", "I speak infrequently.", "I speak loudly.", "I squint.", "I stand when making a point.", "I stare into the distance.", "I stutter.", "I talk to animals like they're people.", "I talk quickly.", "I talk slowly.", "I talk to myself when thinking.", "I often tap my fingers.", "I tell terrible jokes.", "I'm tone deaf.", "I twirl a coin between my fingers.", "I twirl my hair.", "I use flowery speech.", "I use long words.", "I use colorful words.", "I use loud exclamations.", "My voice cracks.", "I walk quickly.", "I walk with a limp.", "I wear flashy clothing.", "I wear ill-fitting clothing.", "I often whispers.", "I frequently whistle.", "I frequently whittle.", "I frequently wink.", "I yell when happy."],
  talents: ["I'm a natural at making people laugh.", "I'm a natural with problem solving.", "I can read lips.", "I can uncannily predict the weather.", "I draw beautifully.", "I drink everyone under the table.", "I'm an expert dart thrower.", "I'm an expert rock skipper.", "I'm an expert at sewing.", "I'm an expert whittler.", "I'm an expert cook.", "I'm an expert juggler.", "I'm great at baking.", "I have a great bedside manner.", "I'm great at gardening.", "I'm great at impersonations.", "I'm great at one game.", "I'm great at reading people.", "I'm great at solving puzzles.", "I'm great at wrestling.", "I'm great with animals.", "I'm great with children.", "I have a high pain tolerance.", "I have a knack for languages.", "I have incredible survival skills.", "I'm mechanically-minded.", "I paint beautifully.", "I have perfect memory.", "I play a musical instrument.", "I sing beautifully.", "I'm a master of disguise.", "I'm a skilled at fishing.", "I'm a skilled at lying.", "I'm a skilled at sleight-of-hand.", "I'm a skilled dancer.", "I'm a skilled forager.", "I'm great at getting my point across.", "I speak with a silver tongue.", "I'm unbelievably lucky.", "I'm very swift-footed."],
  traits: ["Active", "Adventurous", "Affectionate", "Affectionate", "Ambitious", "Angry", "Apathetic", "Argumentative", "Arrogant", "Blustering", "Boorish", "Bossy", "Brave", "Caustic", "Charismatic", "Charming", "Cheerful", "Cold-hearted", "Conceited", "Considerate", "Cooperative", "Courageous", "Cunning", "Curious", "Daring", "Dauntless", "Deceptive", "Determined", "Devoted", "Dishonest", "Disloyal", "Disparaging", "Disrespectful", "Domineering", "Educated", "Faithful", "Fearless", "Fidgety", "Friendly", "Funny", "Funny", "Greedy", "Groveling", "Grumpy", "Happy", "Honest", "Hot tempered", "Impatient", "Informed", "Irritable", "Kind", "Lively", "Lovestruck", "Loving", "Loyal", "Malicious", "Mean", "Obnoxious", "Optimistic", "Patient", "Persistent", "Persuasive", "Pessimistic", "Picky", "Playful", "Ponderous", "Quarrelsome", "Quiet", "Reliable", "Repugnant", "Rough", "Rowdy", "Rude", "Satisfied", "Self-centered", "Selfish", "Shy", "Silly", "Sincere", "Sly", "Smart", "Stern", "Strong", "Stubborn", "Submissive", "Suspicious", "Talkative", "Tough", "Ugly", "Unforgiving", "Unkind", "Unmerciful", "Wicked", "Wild", "Zany"],
  characteristics: ["all thumbs", "anemic", "attractive", "bad smelling", "battle scarred", "birthmarked", "big footed", "big handed", "tiny handed", "burn scarred", "chaos-tainted", "cheap, gaudy ring wearing", "clean", "club footed", "clumsy", "colorful", "crippled", "crooked toothed", "decoratively clothed", "deep voiced", "demure", "diseased", "distinctively jeweled", "distinctively ringed", "raggedly dressed", "poorly dressed", "flamboyantly dressed", "outlandishly dressed", "formally dressed", "very cleanly dressed", "earring wearing", "elegant", "exceptionally beautiful", "exceptionally ugly", "eye-patch wearing", "face tattooed", "facial scarred", "feline", "filthy", "foul-smelling", "gap-toothed", "gap-toothed", "gold toothed", "good looking", "greasy haired", "grizzled", "haggard", "hard of hearing", "harelipped", "healthy-looking", "heavily pierced", "heavily tattooed", "high-pitched", "hook handed", "hunchbacked", "injured", "lame", "lanky", "maimed", "masked", "missing fingered", "missing toothed", "mute", "neat", "nimble", "one armed", "one eyed", "one legged", "perfumed", "pierced", "pointy toothed", "rosy-cheeked", "rough", "ruddy", "sallow", "scarred", "six fingered", "slobbish", "slouching", "squinting", "sweaty", "twisted lipped", "twitching eyed", "ugly", "unhealthy looking", "veiled", "very attractive", "wart covered", "wolfish"],
};

module.exports = defaults;
