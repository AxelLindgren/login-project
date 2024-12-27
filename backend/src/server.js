const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running and listening to ${PORT}`)
});