////
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb"); // Make sure you import ObjectId

// Middleware to parse JSON requests
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5010;
app.listen(port, (err) => {
  if (err) throw err;
  else console.log(`Server is running on port ${port}`);
});

/// connection to database
const connect = require("./DBConnection/dbconnection");
connect();

// API endpoint to retrieve data

//app.get("./", (req, res) => {
//res.send(" wellcome server ");
//});

/////import object Personne

const Personne = require("./models/Personne");

/////Instanciation object Personne
const user = new Personne({
  name: "John Doe",
  email: "john.doe@example.com",
  age: 20,
  favorites_foods: ["salade", "soupe"],
  password: "allowpass",
});

const Createpersonne = async (user) => {
  try {
    const savedPerson = await user.save();
    console.log("person saved successfully", savedPerson);
  } catch (error) {
    console.error(error);
  }
};

//Createpersonnes(arrayusers) //////////////////

const arrayusers = [
  {
    name: "John Doe",
    email: "john.doe99@example.com",
    age: 20,
    favorites_foods: ["00", "00"],
    password: "allowpass",
  },
  {
    name: "John Doe1",
    email: "john.doe199@example.com",
    age: 21,
    favorites_foods: ["111", "111"],
    password: "allowpass1",
  },
  {
    name: "John Doe2",
    email: "john.doe2999@example.com",
    age: 22,
    favorites_foods: ["222", "222"],
    password: "allowpass2",
  },
  {
    name: "John Doe3",
    email: "john.doe3999@example.com",
    age: 23,
    favorites_foods: ["333", "33"],
    password: "allowpass3",
  },
  {
    name: "John Doe4",
    email: "john.doe499@example.com",
    age: 20,
    favorites_foods: ["444", "444"],
    password: "allowpass4",
  },
];

const Createpersonnes = async (arrayusers) => {
  try {
    const savedPerson = await Personne.insertMany(arrayusers);
    console.log("person saved successfully", savedPerson);
  } catch (error) {
    console.error(error);
  }
};

//Createpersonnes(arrayusers);

/////// find()///////////////////////by name
//app.get('/persons', async (req, res) =>{

//try {
// const persons = await Personne.find({name:name})
//  res.send(persons)
// console.log("persons fetched successfully", persons)
// } catch (error) {
//    res.status(500).send(error)
//   }
//})

// findOne() //////////////////////
//app.get("/person", async (req, res) => {
// try {
//   const person = await Personne.findOne();
//   res.send(person);
//     console.log("person fetched successfully", person);
//   } catch (error) {
//  res.status(500).send(error);
//}
//});

// findbyid()//////////////////////

// app.get("/person", async (req, res) => {
//  try {
//    const person = await Personne.findById("6691a6d70eb044b413e53c35");
//   res.send(person);
//   console.log(person);
//  } catch (error) {
//    res.status(500).send(error);
//   }
// })

const FindPersonByName = async (name) => {
  try {
    const persons = await Personne.find({ name: name });
    if (persons.length > 0)
      console.log("persons fetched successfully", persons);
    else console.log("No persons found");
  } catch (error) {
    res.status(500).send(error);
  }
};

const FindByFavouriteFood = async (favfood) => {
  try {
    const allpersons = await Personne.find({ favorites_foods: favfood });

    if (allpersons.length > 0)
      console.log("persons fetched successfully", allpersons);
    else console.log("No persons found");
  } catch (error) {
    res.status(500).send(error);
  }
};

//FindByFavouriteFood('333')

const FindByIdandDelet = async (id) => {
  try {
    await Personne.findByIdAndDelete(id);
    console.log("person deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

//FindByIdUpdate( )

const FindOneandUpdate = async (id, update) => {
  try {
    await Personne.findOneAndUpdate(id, update);
    console.log("person updated successfully");
  } catch (error) {
    console.log(error);
  }
};

//////// delemany(name)////////////////////

const DeleteMany = async (name) => {
  try {
    await Personne.deleteMany({ name: name });
    console.log("person deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

//Function findPeopleWhoLikeBurritos  
const findPeopleWhoLikeBurritos = async () => {
  const allpersons = await Personne.find({ favorites_foods: "burritos" }) // Find people who like burritos
    .sort({ name: 1 }) // Sort by name (1 for ascending)
    .limit(2) // Limit to 2 results
    .select("-age") // Hide the age field
    .exec()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
};
console.log(" hello world")
console.log(findPeopleWhoLikeBurritos())




//Function findPeopleWhoLikeBurritos  with promises

//  const  findPeopleWhoLikeBurritos =  ( ) =>{
//   return new Promise(async (resolve) => {
//     const allpersons = await Personne.find({ favorites_foods: "burritos"}) // Find people who like burritos
//     console.log("allpersons",allpersons)
//     resolve(allpersons)

//   })
//   .then ((allpersons) => { 
//    return new Promise((resolve) =>{
//    const sorted=  allpersons.sort({ name: 1 }) // Sort by name
//    console.log("sorted", sorted)
//    resolve(sorted)
//    })
  

//   })
//   .then((data)=>{
//    return new Promise((resolve) =>{
//       const done =  data.limit(2) // Limit to 2 results
//        .select("-age") // Hide the age field
//        resolve(done)
//    })
//   }).then((result) =>{
   
//     result.exec() .then(data => {
  //   console.log(data);
  // })
  // .catch(err => {
  //   console.error(err);
  // });



// }

