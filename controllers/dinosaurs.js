const express = require("express")
const router = express.Router()
const fs = require("fs")


router.get("/", (req,res) => {
    //pull dinos from dinosaurs.json
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // console.log(req.query)
    let nameFilter = req.query.nameFilter
    // console.log(dinoData)
    if(nameFilter) {
      dinoData = dinoData.filter(dino => {
        //   console.log(dino.name)
          return dino.name.toLowerCase()  === nameFilter.toLowerCase()
      })
    }
    // console.log(nameFilter)
    res.render("./dinosaurs/index.ejs", {myDinos: dinoData})
})


//route that gets the new dinosaur form
router.get("/new", (req,res) => {
    res.render("./dinosaurs/new.ejs")
})

//get all info for single dino
router.get("/edit/:idx", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]

    res.render("./dinosaurs/edit.ejs", {dino: targetDino, dinoId: dinoIndex})
})
//: means the following is a url parameter, and is accessible via req.params
router.get("/:idx", (req,res) => {
    //read json file
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    //extract dino corresponding to the index in the params
    let dinoIndex = req.params.idx
    // console.log(":idx" + req.params.idx)
    let targetDino = dinoData[dinoIndex]
    // console.log(targetDino)
    res.render("./dinosaurs/show.ejs", {dino: targetDino})
})


//PUT REQ
router.put("/:idx", (req,res) => {
    // console.log(`You have hit the put route for editing for ${req.params.idx}`)
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)

    //replaces the dino details with the edited version
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    //write the updated array back to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect("/dinosaurs")

})

router.post("/", (req, res) => {
    //read json data for dino
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs) //un-jsons it
    dinoData.push(req.body)
    // console.log(req.body)
    //save the dinos to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData)) //stringify turns it into a json file
    //
    res.redirect("/dinosaurs")
})

router.delete('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  
    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)
  
    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');
  });

  module.exports = router;