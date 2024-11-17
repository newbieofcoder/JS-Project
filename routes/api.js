var express = require("express");
var router = express.Router();
const Pets = require("../models/pets");

router.get("/test", async (req, res, next) => {
  res.send("This is the test route");
});

router.get("/pet_list", async (req, res, next) => {
  try {
    const pets = await Pets.find();
    res.json(pets);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add_pet", async (req, res, next) => {
  try {
    let pet = req.body;
    let kq = await Pets.create(pet);
    let pets = await Pets.find();
    res.json(pets);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update_pet/", async (req, res, next) => {
  try {
    const id = req.body._id;
    let pet = req.body;
    let result = await Pets.findByIdAndUpdate(id, pet, { new: true });
    if (result) {
      let pets = await Pets.find();
      res.json(pets);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete_pet/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let result = await Pets.findByIdAndDelete(id);
    if (result) {
      let pets = await Pets.find();
      res.json(pets);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
