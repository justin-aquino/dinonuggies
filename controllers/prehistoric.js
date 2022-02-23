const express = require("express")
const router = express.Router()
const fs = require("fs")

let prehistoricCreatures = fs.readFileSync("./prehistoric.json")
let creaturesData = JSON.parse(prehistoricCreatures)



//Get the forms page
router.get("/addcreature", (req,res) => {
    res.render("./prehistoric/addCreature.ejs")
})

//Display creatures list and filter input
router.get("/", (req,res) => {
    //pull dinos from dinosaurs.json
    // let dinosaurs = fs.readFileSync("./dinosaurs.json")
    // let dinoData = JSON.parse(dinosaurs)
    // console.log(req.query)
    let nameFilter = req.query.nameFilter
    // console.log(dinoData)
    if(nameFilter) {
      creaturesData = creaturesData.filter(creature => {
        //   console.log(dino.name)
          return creature.type.toLowerCase()  === nameFilter.toLowerCase()
      })
    }
    // console.log(nameFilter)
    res.render("./prehistoric/prehistoricCreatures.ejs", {creatures: creaturesData})
})



//this is the get with the put req
// router.get("/edit/:idx", (req, res) => {
//     // let prehistoricCreatures = fs.readFileSync("./prehistoric.json")
//     // let creaturesData = JSON.parse(prehistoricCreatures)
//     let creatureIndex = req.params.idx
//     let targetCreature = creaturesData[creatureIndex]

//     res.render("./prehistoric/edit.ejs", {creatures: targetCreature, creatureId: creatureIndex})
// })

router.get("/edit/:idx", (req, res) => {
    let creatureIndex = req.params.idx
    let targetCreature = creaturesData[creatureIndex]

    res.render("./prehistoric/edit.ejs", {targetCreature: targetCreature, creatureId: creatureIndex})
})

//This is to display the creature one by one
router.get("/:idx", (req,res) => {
    // let prehistoricCreatures = fs.readFileSync("./prehistoric.json")
    // let creaturesData = JSON.parse(prehistoricCreatures)
    let creatureIdx = req.params.idx
    let targetCreature = creaturesData[creatureIdx]
    res.render("./prehistoric/showCreature.ejs", {targetCreature: targetCreature})
})


//This posts to the creatures lists with filter bar
router.post("/", (req, res) => {
    //read json data for dino
    // let prehistoricCreatures = fs.readFileSync("./prehistoric.json")
    // let creaturesData = JSON.parse(prehistoricCreatures) //un-jsons it
    creaturesData.push(req.body)
    console.log(req.body)
    //save the dinos to the json file
    fs.writeFileSync('./prehistoric.json', JSON.stringify(creaturesData)) //stringify turns it into a json file
    //
    res.redirect("/prehistoric")
})



//this edits the target creature
router.put("/:idx", (req,res) => {
    // console.log(`You have hit the put route for editing for ${req.params.idx}`)
    // let prehistoricCreatures = fs.readFileSync("./prehistoric.json")
    // let creaturesData = JSON.parse(prehistoricCreatures)

    //replaces the dino details with the edited version
    creaturesData[req.params.idx].img_url = req.body.img_url
    creaturesData[req.params.idx].type = req.body.type

    //write the updated array back to the json file
    fs.writeFileSync('./prehistoric.json', JSON.stringify(creaturesData))

    res.redirect("/prehistoric")

})


//This deletes target creature.
router.delete('/:idx', (req, res) => {
    // remove the deleted dinosaur from the dinosaurs array
    creaturesData.splice(req.params.idx, 1)
  
    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric.json', JSON.stringify(creaturesData));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/prehistoric');
  });


module.exports = router;