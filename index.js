const express = require("express");
const app = express();
const port = 5000;

app.use(express.urlencoded({extended: false}));

const sonicCharacters = require("./sonic/characters/app");
app.use("/sonic/api/characters/", sonicCharacters);

app.listen(port, () => {
    console.log(`Listening to server ${port}`);
});