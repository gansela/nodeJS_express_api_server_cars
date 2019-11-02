const cars = require("./cars.json")
const express = require("express")
const logger = require("jbapp-logger");

const api = express()

const port = 1711

api.listen(port, (err) => {
    if (err) console.log("no good")
    console.log("server running")
})

api.get("/cars", (req, res, next) => {
    const date = new Date();
    const timeNow = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const logTxt = `url: ${req.get("host")}${req.originalUrl} time: ${timeNow} `
    logger.writeToFileSync("./log.txt", logTxt)

    const { model } = req.query;
    if (!model) return res.send(cars)
    const searchedCars = cars.filter((car) => {
        return car.Name.includes(model.toLowerCase())
    })
    if (!searchedCars[0]) return res.send(null)
    else res.send(searchedCars)
})

api.get("/logs", (req, res, next) => {
    const { mode } = req.query;
    if (!mode) return res.send("error! no log request method")
    if (mode === "file") return res.download("C:\\Users\\gan.sela\\Desktop\\web dev course\\gan sela\\nodeJS\\leasson2_hw\\log.txt")
    else if (mode === "content") res.sendFile("C:\\Users\\gan.sela\\Desktop\\web dev course\\gan sela\\nodeJS\\leasson2_hw\\log.txt")
    else return res.send("error! invalid log request method")
})