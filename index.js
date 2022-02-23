const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const PORT = 8080
const fs = require("fs")
const methodOverride = require("method-override")


//middleware
app.set("view engine", "ejs")
app.use(ejsLayouts)
app.use(methodOverride("_method"))//put above body parser
app.use(express.urlencoded({extended: false})) //tells express how to handle incoming payload data, parse it, and allows us to access
//data via req.body(body parser)

//note: controller middlewares should always be at the bottom

app.use("/dinosaurs", require("./controllers/dinosaurs"))
app.use("/prehistoric", require("./controllers/prehistoric"))



//main
app.get("/", (req,res) => {
    res.send("Hello Dinos")
})






//prehistoric



app.listen(PORT, () => {
    console.log(`Hello from ${PORT}`)
})

