import express from "express";

const api = express.Router();

api.get("/", (req, res) => {
    console.log("Works in here")
    throw Error("There is a problem");
    
    res.json({
        message: "Welcome to Oniko Learning platform"
    });
});

export default api;