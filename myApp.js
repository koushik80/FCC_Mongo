require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log("Connected to MongoDB", err);
  }
);

/** 2) Create a 'Person' Model */
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

/** 3) Create and Save a Person */
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const rajon = new Person({name: "Rajon", age: 42, favoriteFoods: ["rice", "fish", "burger"]});

  rajon.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};
/** 4) Create many People with `Model.create()` */
const arrayOfPeople = [
  {name: "Riina", age: 36, favoriteFoods: ["pizza"]},
  {name: "Rosa", age: 9, favoriteFoods: ["burger"]},
  {name: "Lari", age: 12, favoriteFoods: ["chicken"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

/** 5) Use `Model.find()` */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

/** 6) Use `Model.findOne()` */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

/** 7) Use `Model.findById()` */
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 8) Use Perform Classic Updates by Running Find, Edit, then Save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
/** 9) Perform New Updates on a Document Using `model.findOneAndUpdate()` */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};
/** 10) Delete One Document Using `model.findByIdAndRemove` */
const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.personSchema = personSchema;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.arrayOfPeople = arrayOfPeople;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
