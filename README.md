# personae
Personae is a tool used to generate a person-- either NPC or playable.

## Installation
You will need [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed. Then run the command:

`npm install -g personae`

## Generate a Person from CLI

```shell
personae
``` 

Follow the prompts, choosing: PC, NPC, culture, name, etc (all optional), and personae will generate a description of the person as well as abilities. You can save the person, or start over.

## Module Usage

Require personae into your file and create a new Personae class. 

```javascript
const Personae = require('personae')

const person = new Personae()

const options = {
  name: "Dan",
  alignment: "Chaotic Neutral",
  klass: "Ranger",
  age: "300",
  race: "Dwarf",
  theme: "classical"
}

const brotherOpts = {
  name: "Li",
  gender: "male"
}


const dan = person.generate(options)

const parentsOfDan = person.generateParents(dan)
const brotherOfDan = person.generateChild(brotherOpts, parentsOfDan.mother, parentsOfDan.father)
```

While configuring your character's options please note that in JavaScript 'class' is a special keyword, so personae uses 'klass'.

## Features

Personae can create a NPC or PC for Dungeons and Dragons, as well as abilities, children and parents for your character.

## Developing

To develop personae,

```shell
git clone https://github.com/opendnd/personae.git
cd personae/
npm install
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are welcome!

Personae use the [Airbnb](https://github.com/airbnb/javascript) javascript style.

## Licensing

[MIT](https://github.com/opendnd/personae/blob/master/LICENSE)