const characters = require("./data");
const express = require("express");
const router = express.Router();

router.use(express.static("public"));

router.post("/", (req, res) => {
    const url = `${req.protocol}://${req.get("host")}${req.originalUrl}${req.body.name}`;
    res.redirect(url);
});

router.get("/:name", (req, res) => {
    const searchedName = req.params.name.toLowerCase();
    const foundName = characters.some((character) => character.name === searchedName);
    // this is specifically to find characters who are more well-known for their nickname. i.e Tails.
    for (let i = 0; i < characters.length; i++) {
        if (searchedName === characters[i].nickname) {
            return res.send(characters.filter((character) => character.nickname === searchedName));
        } 
    }
    if (!foundName) return res.status(400).json({message: "Character not found"});
    if (foundName) return res.json(characters.filter((character) => character.name === searchedName));
});

module.exports = router;
