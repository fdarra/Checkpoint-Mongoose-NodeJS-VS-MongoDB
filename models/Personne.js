const mongoose = require('mongoose');
const Schema=mongoose.Schema;

// Define schema
const PersonneSchema=new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    favorites_foods: [{ type: String }],
    password: String,
    

},
{
    timestamps: true,
  });

//Define Model
const Personne = mongoose.model('Personne',PersonneSchema);

module.exports=Personne;
